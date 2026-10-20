#!/usr/bin/env python3
"""Verrolify weight budget for a static build (Next static export `out/`, or any folder with index.html).

Usage:  python3 perf_budget.py <build-dir> --mode 1|2|3 [--page index.html]
Measures the home page first-load estimate: HTML, the scripts and stylesheets it references (gzip size), images it
references (raw size), all fonts in the folder, all video in the folder. Compares to targets for the mode.
These are TARGETS chosen for mid-range Android over 4G, not laws. A FAIL means: justify it in the brief or cut weight.
They do not replace a real-phone test or a Lighthouse run.

Targets (JS gz, CSS gz, referenced images, fonts, single film, all film):
  mode 1  200 KB, 40 KB, 800 KB, 4 files / 200 KB, no film
  mode 2  250 KB, 50 KB, 3 MB,   4 files / 250 KB, 12 MB single / 15 MB total (film is desktop-only; phones get the still)
  mode 3  220 KB, 40 KB, 1 MB,   4 files / 200 KB, no film  (public marketing pages; app routes are not measured)
Calibration (measured October 2026, Next 16.4 static export, React 19.3, motion 14.0): an EMPTY Next page ships about 132 KB gz
of JavaScript for modern browsers. The full Verrolify component set with Motion adds about 50 KB on top (a Reveal-only page
adds less). Scripts marked nomodule (Next's legacy polyfill chunk, about 38 KB gz) are not downloaded by modern browsers and are
excluded here.
"""
import argparse, gzip, os, re, sys
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote

BUDGET = {
    1: dict(js=200, css=40, img=800, fonts_n=4, fonts_kb=200, film1=0, film_all=0),
    2: dict(js=250, css=50, img=3000, fonts_n=4, fonts_kb=250, film1=12000, film_all=15000),
    3: dict(js=220, css=40, img=1000, fonts_n=4, fonts_kb=200, film1=0, film_all=0),
}

class Refs(HTMLParser):
    def __init__(self):
        super().__init__()
        self.scripts, self.styles, self.images, self.preloads = [], [], [], []
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "script" and d.get("src") and "nomodule" not in d:
            self.scripts.append(d["src"])
        elif tag == "link":
            rel = (d.get("rel") or "").lower()
            if "stylesheet" in rel and d.get("href"):
                self.styles.append(d["href"])
            elif "preload" in rel and d.get("href"):
                self.preloads.append((d.get("as"), d["href"]))
        elif tag == "img":
            for k in ("src",):
                if d.get(k):
                    self.images.append(d[k])
            if d.get("srcset"):
                self.images.append(d["srcset"].split(",")[0].strip().split(" ")[0])
        elif tag == "source" and d.get("srcset"):
            self.images.append(d["srcset"].split(",")[0].strip().split(" ")[0])

def resolve(root, ref):
    u = urlparse(ref)
    if u.scheme in ("http", "https", "data") or ref.startswith("//"):
        return None
    p = unquote(u.path).lstrip("/")
    full = os.path.join(root, p)
    return full if os.path.isfile(full) else None

def gz(path):
    return len(gzip.compress(open(path, "rb").read(), 6))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    ap.add_argument("--mode", type=int, choices=[1, 2, 3], required=True)
    ap.add_argument("--page", default="index.html")
    a = ap.parse_args()
    page = os.path.join(a.root, a.page)
    if not os.path.isfile(page):
        print(f"ERROR  {page} not found. Run the static build first (Next: output 'export' gives out/index.html).")
        sys.exit(2)
    html = open(page, encoding="utf-8", errors="replace").read()
    r = Refs(); r.feed(html)
    js = sum(gz(p) for p in (resolve(a.root, s) for s in r.scripts) if p)
    css = sum(gz(p) for p in (resolve(a.root, s) for s in r.styles) if p)
    img_files = [p for p in (resolve(a.root, s) for s in r.images + [h for t, h in r.preloads if t == "image"]) if p]
    imgs = sum(os.path.getsize(p) for p in set(img_files))
    fonts = [os.path.join(dp, f) for dp, _, fs in os.walk(a.root) for f in fs if f.lower().endswith((".woff2", ".woff", ".ttf", ".otf"))]
    films = [(os.path.join(dp, f), os.path.getsize(os.path.join(dp, f))) for dp, _, fs in os.walk(a.root) for f in fs if f.lower().endswith((".mp4", ".webm"))]
    b = BUDGET[a.mode]
    kb = lambda n: n / 1024
    rows = []
    def row(name, val_kb, limit_kb, unit="KB"):
        status = "PASS" if val_kb <= limit_kb else "FAIL"
        rows.append((name, val_kb, limit_kb, status))
    row("HTML (gz)", kb(len(gzip.compress(html.encode(), 6))), 60)
    row("JavaScript (gz, referenced)", kb(js), b["js"])
    row("CSS (gz, referenced)", kb(css), b["css"])
    row("Images referenced by index", kb(imgs), b["img"])
    fk = kb(sum(os.path.getsize(f) for f in fonts))
    row(f"Fonts total ({len(fonts)} files)", fk, b["fonts_kb"])
    if len(fonts) > b["fonts_n"]:
        rows.append((f"Font file count {len(fonts)}", len(fonts), b["fonts_n"], "FAIL"))
    if a.mode == 2:
        if films:
            row("Largest film", kb(max(s for _, s in films)), b["film1"])
            row("All film", kb(sum(s for _, s in films)), b["film_all"])
    else:
        if films:
            rows.append(("Film present in a non-Mode-2 build", kb(sum(s for _, s in films)), 0, "FAIL"))
    width = max(len(r[0]) for r in rows)
    fail = False
    for name, val, lim, st in rows:
        print(f"{st:4}  {name:<{width}}  {val:8.1f}  / {lim}")
        fail = fail or st == "FAIL"
    heavy = sorted(set(img_files), key=lambda p: -os.path.getsize(p))[:3]
    if heavy:
        print("\nheaviest referenced images:")
        for p in heavy:
            print(f"   {kb(os.path.getsize(p)):7.1f} KB  {os.path.relpath(p, a.root)}")
    print("\nTargets, not laws. Confirm on a real mid-range phone and a throttled run.")
    sys.exit(1 if fail else 0)

if __name__ == "__main__":
    main()
