#!/usr/bin/env python3
"""Verrolify slop lint: copy and code tells that mark a site as machine-made or unfinished.

Usage:  python3 slop_lint.py <project-dir> [--json] [--warn-fail]
Exit code 1 if any ERROR (or any WARN with --warn-fail). A hit is rewritten, not suppressed.
A genuine false positive may be silenced with a comment on the same line:  slop-lint-ignore: <reason>
or on the line above:  slop-lint-ignore-next: <reason>   (a reason is mandatory, ignores are counted in the summary).

Scope: copy rules run on html, tsx, jsx, mdx, md, txt and on json under content/ messages/ data/ copy/ locales/ i18n/,
after stripping imports, comments, class names, style and script blocks. Code rules run on html, tsx, jsx, ts, js, css.
Project documents (VERRO_BRIEF.md and friends) are skipped because they legitimately list the banned words.
"""
import argparse, json, os, re, sys

SKIP_DIRS = {"node_modules", ".next", "out", "dist", "build", ".git", ".vercel", ".turbo", "coverage", "lab", "docs",
             "__pycache__", ".cache", ".wrangler", ".open-next", "kits", "references"}
SKIP_FILES = {"VERRO_BRIEF.md", "REFERENCE_LOG.md", "QA_REPORT.md", "HANDOVER.md", "BUILD_PROMPT.md", "FINGERPRINTS.md",
              "README.md", "CHANGELOG.md", "package-lock.json", "pnpm-lock.yaml", "yarn.lock", "tsconfig.json",
              "package.json", "assets.manifest.json", ".env.example", "SKILL.md"}
COPY_EXT = {".html", ".htm", ".tsx", ".jsx", ".mdx", ".md", ".txt"}
CODE_EXT = {".html", ".htm", ".tsx", ".jsx", ".ts", ".js", ".mjs", ".css", ".scss"}
JSON_COPY_DIRS = {"content", "messages", "data", "copy", "locales", "i18n"}

BANNED = [r"delv(e|es|ed|ing)", r"foster(s|ed|ing)?", r"leverag(e|es|ed|ing)", r"utiliz(e|es|ed|ing|ation)",
          r"facilitat(e|es|ed|ing)", r"empower(s|ed|ing|ment)?", r"streamlin(e|es|ed|ing)", r"robust",
          r"cutting[- ]edge", r"paradigm shift", r"game[- ]?changer", r"tapestry", r"realm", r"beacon",
          r"multifaceted", r"meticulous(ly)?", r"intricate", r"paramount", r"transformative", r"elevat(e|es|ed|ing)",
          r"embark(s|ed|ing)?", r"supercharg(e|es|ed|ing)", r"harness(es|ed|ing)?", r"ever[- ]evolving",
          r"seamless(ly)?", r"unlock(s|ed|ing)?", r"actionable", r"data[- ]driven", r"testament", r"landscape",
          r"unleash(es|ed|ing)?", r"next[- ]gen(eration)?", r"revolutioni[sz](e|es|ed|ing)", r"solutions?"]
WARN_WORDS = [r"holistic", r"world[- ]class", r"state[- ]of[- ]the[- ]art", r"one[- ]stop shop", r"second to none",
              r"passionate (about|team)", r"tailored (to|for)", r"look no further", r"we pride ourselves",
              r"committed to excellence", r"your satisfaction is our priority", r"welcome to", r"at the end of the day",
              r"in today'?s (world|digital)", r"it'?s worth noting", r"let'?s dive in"]

def rx(words):
    return re.compile(r"\b(" + "|".join(words) + r")\b", re.I)

# (id, severity, compiled regex, message, scope)  scope: copy | code
RULES = [
    ("EM_DASH", "ERROR", re.compile("\u2014|\u2015|&mdash;|&#8212;|&#x2014;|\\\\u2014", re.I), "em dash: use a period, comma, colon or parentheses", "copy"),
    ("BANNED_WORD", "ERROR", rx(BANNED), "banned stock word", "copy"),
    ("NOT_JUST_BUT", "ERROR", re.compile(r"\b(it['\u2019]?s|this is|that['\u2019]?s) not (just|only|merely)\b[^.\n]{1,90}[,;] ?(it['\u2019]?s|but|it is)\b", re.I), "binary contrast: state the real point directly", "copy"),
    ("LOREM", "ERROR", re.compile(r"lorem ipsum|dolor sit amet", re.I), "lorem ipsum", "copy"),
    ("TODO_CLIENT", "ERROR", re.compile(r"\bTODO_CLIENT\b"), "missing client fact. Get the real value before delivery", "all"),
    ("PLACEHOLDER", "ERROR", re.compile(r"\[(city|area|business|company|client|name|your)[^\]\n]{0,30}\]|your (business|company|name) here|\b(company|business) name\b|\bjohn doe\b|\bjane doe\b|\+?91[ -]?(98765|12345|00000|99999)[ -]?\d{5}|\b1234567890\b", re.I), "placeholder text or fake contact detail", "copy"),
    ("IMG_NO_ALT", "ERROR", re.compile(r"<(img|Image)\b(?![^>]*\balt\s*=)[^>]*>", re.I), "image without alt (use alt=\"\" only for decoration)", "code"),
    ("ZOOM_DISABLED", "ERROR", re.compile(r"user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?\b", re.I), "viewport disables zoom (accessibility failure)", "code"),
    ("HOTLINK_PLACEHOLDER", "ERROR", re.compile(r"https?://(via\.placeholder\.com|placehold\.co|picsum\.photos|loremflickr\.com|placekitten\.com|dummyimage\.com|source\.unsplash\.com)", re.I), "placeholder image service", "code"),
    ("TRANSITION_ALL", "ERROR", re.compile(r"transition\s*:\s*all\b|transition-property\s*:\s*all\b", re.I), "transition: all animates everything. List the properties", "code"),
    ("WARN_WORD", "WARN", rx(WARN_WORDS), "stock phrase: keep only if it earns its place", "copy"),
    ("WEASEL", "WARN", re.compile(r"\b(studies show|experts (agree|say)|research shows|widely regarded|many believe)\b", re.I), "weasel attribution: name the source or cut it", "copy"),
    ("SCROLL_CUE", "WARN", re.compile(r"\bscroll (down|to (explore|discover|begin|continue))\b", re.I), "scroll cue: usually removable", "copy"),
    ("SECTION_COUNTER", "WARN", re.compile(r"\b0[1-9]\s*/\s*0[1-9]\b"), "section counter (01 / 06): only if the content is truly a sequence", "copy"),
    ("EMOJI_UI", "WARN", re.compile("[\U0001F300-\U0001FAFF\u2600-\u26FF\u2700-\u27BF]"), "emoji in UI text: use one icon set", "copy"),
    ("TAILWIND_TRANSITION_ALL", "WARN", re.compile(r"\btransition-all\b"), "transition-all animates every property", "code"),
    ("GRADIENT_TEXT", "WARN", re.compile(r"bg-clip-text|background-clip\s*:\s*text", re.I), "gradient text is an AI tell", "code"),
    ("VIOLET_BLUE_GRADIENT", "WARN", re.compile(r"from-(purple|violet|indigo)-\d+[^\"'`]*to-(blue|indigo|purple|pink)-\d+|linear-gradient\([^)]*#(8b5cf6|6366f1|7c3aed)", re.I), "violet-to-blue AI gradient", "code"),
    ("DEFAULT_FONT", "WARN", re.compile(r"font-family\s*:[^;}{]*\b(Inter|Roboto|Arial|Helvetica)\b|\bInter\s*\(\s*\{", re.I), "default font as a design choice: confirm it is intentional", "code"),
]

IGNORE_SAME = re.compile(r"slop-lint-ignore:\s*\S")
IGNORE_NEXT = re.compile(r"slop-lint-ignore-next:\s*\S")

def blank(m):
    return re.sub(r"[^\n]", " ", m.group(0))

def strip_noise(text, ext):
    """Blank out non-copy noise while keeping line numbers."""
    t = text
    t = re.sub(r"<!--.*?-->", blank, t, flags=re.S)
    t = re.sub(r"\{/\*.*?\*/\}", blank, t, flags=re.S)
    t = re.sub(r"/\*.*?\*/", blank, t, flags=re.S)
    if ext in {".tsx", ".jsx", ".ts", ".js", ".mjs"}:
        t = re.sub(r"(^|\s)//[^\n]*", lambda m: m.group(1) + re.sub(r"[^\n]", " ", m.group(0)[len(m.group(1)):]), t)
    if ext in {".html", ".htm", ".tsx", ".jsx", ".mdx"}:
        t = re.sub(r"<(style|script)\b[^>]*>.*?</\1>", blank, t, flags=re.S | re.I)
        t = re.sub(r"(className|class)\s*=\s*(\"[^\"]*\"|'[^']*'|\{`[^`]*`\}|\{\"[^\"]*\"\}|\{'[^']*'\})", blank, t)
        t = re.sub(r"^\s*(import|export)\b[^\n]*from[^\n]*$", blank, t, flags=re.M)
        t = re.sub(r"<style\b[^>]*dangerouslySetInnerHTML[^>]*/>", blank, t, flags=re.S)
        t = re.sub(r"@media[^\n]*", blank, t)
        t = re.sub(r"(type=\"application/ld\+json\"[^>]*>)", blank, t)
    return t

def iter_files(root):
    for dp, dns, fns in os.walk(root):
        dns[:] = [d for d in dns if d not in SKIP_DIRS and not d.startswith(".")]
        rel_parts = set(os.path.relpath(dp, root).split(os.sep))
        for fn in fns:
            if fn in SKIP_FILES:
                continue
            ext = os.path.splitext(fn)[1].lower()
            path = os.path.join(dp, fn)
            if ext == ".json":
                if rel_parts & JSON_COPY_DIRS:
                    yield path, ext, True, False
                continue
            if ext in COPY_EXT or ext in CODE_EXT:
                yield path, ext, ext in COPY_EXT, ext in CODE_EXT

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--warn-fail", action="store_true")
    a = ap.parse_args()
    hits, ignored, files = [], 0, 0
    for path, ext, is_copy, is_code in iter_files(a.root):
        try:
            raw = open(path, encoding="utf-8", errors="replace").read()
        except OSError:
            continue
        files += 1
        raw_lines = raw.split("\n")
        copy_text = strip_noise(raw, ext) if is_copy else ""
        copy_lines = copy_text.split("\n")
        rel = os.path.relpath(path, a.root)
        for rid, sev, pat, msg, scope in RULES:
            targets = []
            if scope in ("copy", "all") and is_copy:
                targets.append(copy_lines)
            if scope == "code" and is_code:
                targets.append(raw_lines if ext not in {".html", ".htm", ".tsx", ".jsx"} else raw_lines)
            if scope == "all":
                targets.append(raw_lines)
            if rid in ("IMG_NO_ALT",):
                for m in pat.finditer(raw):
                    ln = raw.count("\n", 0, m.start()) + 1
                    targets_hit = (rid, sev, msg, ln, m.group(0)[:80].replace("\n", " "))
                    hits.append((rel,) + targets_hit)
                continue
            seen = set()
            for lines in targets:
                for i, line in enumerate(lines):
                    if not line.strip():
                        continue
                    m = pat.search(line)
                    if not m:
                        continue
                    if rid == "BANNED_WORD" and re.search(r"orientation|landscape\s*\)", line, re.I) and m.group(0).lower() == "landscape":
                        continue
                    if (i, rid) in seen:
                        continue
                    seen.add((i, rid))
                    orig = raw_lines[i] if i < len(raw_lines) else line
                    if IGNORE_SAME.search(orig) or (i > 0 and IGNORE_NEXT.search(raw_lines[i - 1])):
                        ignored += 1
                        continue
                    hits.append((rel, rid, sev, msg, i + 1, m.group(0)[:80]))
    # de-duplicate identical entries
    uniq = []
    for h in hits:
        if h not in uniq:
            uniq.append(h)
    hits = sorted(uniq, key=lambda h: (h[0], h[4], h[1]))
    errors = [h for h in hits if h[2] == "ERROR"]
    warns = [h for h in hits if h[2] == "WARN"]
    if a.json:
        print(json.dumps({"files": files, "errors": len(errors), "warnings": len(warns), "ignored": ignored,
                          "hits": [dict(file=h[0], rule=h[1], severity=h[2], message=h[3], line=h[4], match=h[5]) for h in hits]}, indent=2))
    else:
        for f, rid, sev, msg, ln, mt in hits:
            print(f"{sev:5}  {f}:{ln}  {rid}  \"{mt}\"  {msg}")
        print(f"\nscanned {files} files: {len(errors)} errors, {len(warns)} warnings, {ignored} ignored with reason")
        if not hits:
            print("CLEAN")
    sys.exit(1 if errors or (a.warn_fail and warns) else 0)

if __name__ == "__main__":
    main()
