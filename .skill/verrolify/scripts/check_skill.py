#!/usr/bin/env python3
"""Maintenance check for the Verrolify skill folder itself.
Usage: python3 check_skill.py [skill-dir]
Checks: SKILL.md frontmatter (name, description under 1024 chars), SKILL.md under 500 lines, every skill-relative path
mentioned in backticks inside the owned markdown files exists, and owned reference files not mentioned anywhere (orphans)."""
import os, re, sys

root = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), ".."))
PREFIX = ("references/", "kits/", "assets/", "scripts/", "evals/")
OWNED_DIRS = ("references", "assets", "scripts")
errors, warns = 0, 0

skill = open(os.path.join(root, "SKILL.md"), encoding="utf-8").read()
fm = re.match(r"^---\n(.*?)\n---\n", skill, re.S)
if not fm:
    print("ERROR SKILL.md has no frontmatter"); sys.exit(1)
name = re.search(r"^name:\s*(\S+)", fm.group(1), re.M)
desc = re.search(r"^description:\s*>?\s*\n?(.*)", fm.group(1), re.S | re.M)
dtext = " ".join(x.strip() for x in desc.group(1).splitlines()) if desc else ""
print(f"name: {name.group(1) if name else 'MISSING'}   description: {len(dtext)} chars   SKILL.md: {skill.count(chr(10))} lines")
if not name: errors += 1
if len(dtext) > 1024: print("ERROR description over 1024 chars"); errors += 1
if skill.count("\n") > 500: print("WARN SKILL.md over 500 lines"); warns += 1

md_files = []
for dp, dns, fns in os.walk(root):
    rel = os.path.relpath(dp, root)
    if rel.startswith("kits"):
        continue
    for fn in fns:
        if fn.endswith(".md") and (rel == "." or rel.split(os.sep)[0] in OWNED_DIRS):
            md_files.append(os.path.join(dp, fn))
mentioned = set()
pat = re.compile(r"`([^`\n]+)`")
for f in md_files:
    text = open(f, encoding="utf-8").read()
    for m in pat.finditer(text):
        s = m.group(1).strip().rstrip(".,;:")
        s = re.sub(r"^<skill-dir>/", "", s)
        s = s.split()[0] if s.split() else s
        if not s.startswith(PREFIX):
            continue
        if any(c in s for c in "<>*{}$|") or "..." in s or s.endswith("/") and not os.path.isdir(os.path.join(root, s)):
            continue
        target = os.path.join(root, s.split("#")[0])
        mentioned.add(os.path.normpath(target))
        if not os.path.exists(target):
            print(f"ERROR {os.path.relpath(f, root)} mentions missing path: {s}")
            errors += 1
for dp, dns, fns in os.walk(root):
    rel = os.path.relpath(dp, root)
    if not rel.startswith(tuple(f"{d}" for d in ("references",))):
        continue
    for fn in fns:
        p = os.path.normpath(os.path.join(dp, fn))
        if p not in mentioned and fn not in ("README.md",):
            print(f"WARN orphan reference not linked from any owned file: {os.path.relpath(p, root)}")
            warns += 1
print(f"\n{errors} errors, {warns} warnings")
sys.exit(1 if errors else 0)
