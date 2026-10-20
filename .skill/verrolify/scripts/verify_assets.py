#!/usr/bin/env python3
"""Verrolify asset gate: every declared asset exists, is real, and is used.

Usage:  python3 verify_assets.py <project-dir> [--manifest path]
Reads assets.manifest.json in the project root. For each asset with required=true (default true):
  - status must be "ready"            (pending and rejected block delivery)
  - file must exist and be at least min_bytes (defaults: image 8 KB, video 200 KB, font 4 KB)
  - images: width >= min_width when PIL is installed; alpha=true requires a real alpha channel with transparency
  - video: ffprobe (when installed) must report a video stream with duration > 0; otherwise an MP4/WebM header sniff
  - the file name must be referenced somewhere in the project's code or content (unused assets are suspicious)
  - generated rasters may not be SVG (an SVG is not a generated image)
Also warns about large undeclared files under public/ or assets/ and about CSS-only hero suspicion.
Exit code 1 on any ERROR. Purpose: stop a weak model from faking generated visuals with CSS or canvas.
"""
import argparse, json, os, re, shutil, subprocess, sys

MIN_DEFAULT = {"image": 8_000, "video": 200_000, "font": 4_000, "audio": 20_000, "other": 1}
TEXT_EXT = {".html", ".htm", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".css", ".scss", ".md", ".mdx", ".json", ".txt", ".svg", ".xml"}
SKIP_DIRS = {"node_modules", ".next", "out", "dist", ".git", "lab", ".vercel", "coverage", "__pycache__"}

def collect_text(root):
    blobs = []
    for dp, dns, fns in os.walk(root):
        dns[:] = [d for d in dns if d not in SKIP_DIRS]
        for fn in fns:
            if fn == "assets.manifest.json":
                continue
            if os.path.splitext(fn)[1].lower() in TEXT_EXT:
                p = os.path.join(dp, fn)
                try:
                    if os.path.getsize(p) < 3_000_000:
                        blobs.append(open(p, encoding="utf-8", errors="ignore").read())
                except OSError:
                    pass
    return "\n".join(blobs)

def image_info(path):
    try:
        from PIL import Image
    except ImportError:
        return None
    try:
        with Image.open(path) as im:
            w, h = im.size
            has_alpha = im.mode in ("RGBA", "LA") or "transparency" in im.info
            transparent = 0.0
            if has_alpha:
                a = im.convert("RGBA").getchannel("A")
                hist = a.histogram()
                total = sum(hist) or 1
                transparent = sum(hist[:250]) / total
            return {"w": w, "h": h, "alpha": has_alpha, "transparent_frac": transparent}
    except Exception as e:
        return {"error": str(e)}

def video_ok(path):
    if shutil.which("ffprobe"):
        try:
            out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                                  "stream=codec_name,width,height:format=duration", "-of", "json", path],
                                 capture_output=True, text=True, timeout=30)
            j = json.loads(out.stdout or "{}")
            streams = j.get("streams", [])
            dur = float(j.get("format", {}).get("duration", 0) or 0)
            if not streams:
                return False, "no video stream"
            if dur <= 0:
                return False, "zero duration"
            s = streams[0]
            return True, f"{s.get('codec_name')} {s.get('width')}x{s.get('height')} {dur:.1f}s"
        except Exception as e:
            return False, f"ffprobe failed: {e}"
    head = open(path, "rb").read(16)
    if b"ftyp" in head or head.startswith(b"\x1a\x45\xdf\xa3"):
        return True, "header sniff only (ffprobe not installed)"
    return False, "not an MP4 or WebM header"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    ap.add_argument("--manifest")
    a = ap.parse_args()
    mpath = a.manifest or os.path.join(a.root, "assets.manifest.json")
    if not os.path.exists(mpath):
        print(f"ERROR  no manifest at {mpath}. Declare every asset in assets.manifest.json (template in assets/templates/).")
        sys.exit(1)
    man = json.load(open(mpath, encoding="utf-8"))
    assets = man.get("assets", [])
    corpus = collect_text(a.root)
    errors = warns = 0
    declared = set()
    print(f"manifest: {mpath}  ({len(assets)} assets)\n")
    for it in assets:
        aid, typ = it.get("id", "?"), it.get("type", "other")
        rel = it.get("path", "")
        path = os.path.join(a.root, rel)
        declared.add(os.path.normpath(path))
        required = it.get("required", True)
        problems = []
        status = it.get("status", "pending")
        if required and status != "ready":
            problems.append(f"status is '{status}' (must be 'ready')")
        if required or os.path.exists(path):
            if not os.path.exists(path):
                problems.append("file missing")
            else:
                size = os.path.getsize(path)
                need = it.get("min_bytes", MIN_DEFAULT.get(typ, 1))
                if size < need:
                    problems.append(f"only {size} bytes (min {need}). Looks like a stub or placeholder")
                ext = os.path.splitext(path)[1].lower()
                if typ == "image" and ext == ".svg" and it.get("source") == "generated":
                    problems.append("an SVG is not a generated raster image. Do not fake generated assets")
                if typ == "image" and ext != ".svg":
                    info = image_info(path)
                    if info is None:
                        pass
                    elif "error" in info:
                        problems.append("image does not decode: " + info["error"])
                    else:
                        if info["w"] < it.get("min_width", 0):
                            problems.append(f"width {info['w']} < min_width {it['min_width']}")
                        if it.get("alpha") and (not info["alpha"] or info["transparent_frac"] < 0.01):
                            problems.append("alpha required but no real transparency found (checkerboard or white box?)")
                if typ == "video":
                    ok, note = video_ok(path)
                    if not ok:
                        problems.append("video check failed: " + note)
                if required and os.path.basename(path) not in corpus:
                    problems.append("file name is not referenced anywhere in the project code or content")
        tag = "OK   " if not problems else "ERROR"
        if problems:
            errors += 1
        print(f"{tag}  {aid:<22} {rel}")
        for p in problems:
            print(f"        - {p}")
    # undeclared heavy files
    for base in ("public", "assets", "src/assets"):
        d = os.path.join(a.root, base)
        if not os.path.isdir(d):
            continue
        for dp, _, fns in os.walk(d):
            for fn in fns:
                p = os.path.join(dp, fn)
                if os.path.normpath(p) not in declared and os.path.getsize(p) > 200_000 and not fn.endswith((".woff2", ".woff", ".ttf", ".otf")):
                    warns += 1
                    print(f"WARN   undeclared asset over 200 KB: {os.path.relpath(p, a.root)}")
    hero_css = re.search(r"hero[^{]{0,40}\{[^}]*(linear-gradient|radial-gradient)", corpus, re.I)
    has_hero_asset = any("hero" in (x.get("id", "") + x.get("path", "")).lower() for x in assets)
    if hero_css and not has_hero_asset:
        warns += 1
        print("WARN   hero styled with a CSS gradient and no hero asset declared. If a generated or client visual was planned, "
              "declare it. Do not fake it.")
    print(f"\n{errors} errors, {warns} warnings")
    sys.exit(1 if errors else 0)

if __name__ == "__main__":
    main()
