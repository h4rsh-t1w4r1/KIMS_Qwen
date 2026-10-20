#!/usr/bin/env python3
"""WCAG contrast ratio. Usage: python3 contrast.py "#111111" "#F6F1E9" [more pairs as fg bg fg bg ...]
Accepts #rgb, #rrggbb, rgb(r,g,b). Prints ratio and pass/fail for body text (4.5), large text (3.0) and UI parts (3.0)."""
import re, sys

def parse(c):
    c = c.strip()
    m = re.fullmatch(r"#([0-9a-fA-F]{3})", c)
    if m:
        return tuple(int(ch * 2, 16) for ch in m.group(1))
    m = re.fullmatch(r"#([0-9a-fA-F]{6})", c)
    if m:
        h = m.group(1)
        return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
    m = re.fullmatch(r"rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)", c, re.I)
    if m:
        return tuple(int(x) for x in m.groups())
    raise SystemExit(f"cannot parse colour: {c}")

def lum(rgb):
    def f(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = (f(x) for x in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def ratio(a, b):
    la, lb = lum(parse(a)), lum(parse(b))
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)

if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) < 2 or len(args) % 2:
        raise SystemExit(__doc__)
    bad = False
    for i in range(0, len(args), 2):
        fg, bg = args[i], args[i + 1]
        r = ratio(fg, bg)
        ok = lambda t: "pass" if r >= t else "FAIL"
        print(f"{fg} on {bg}: {r:.2f}:1   body 4.5 {ok(4.5)}   large text 3.0 {ok(3.0)}   UI parts 3.0 {ok(3.0)}")
        bad = bad or r < 3.0
    sys.exit(1 if bad else 0)
