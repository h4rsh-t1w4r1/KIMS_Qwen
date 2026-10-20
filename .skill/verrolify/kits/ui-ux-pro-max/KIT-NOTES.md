# ui-ux-pro-max kit (trimmed copy)

Trimmed for Verrolify: removed google-fonts.csv, google-font-licenses.json, phosphor-icons-upstream.json,
native/mobile/desktop stack CSVs and the upstream test suite. Everything else is unchanged.

Works offline. Run from anywhere:

    python3 <skill-dir>/kits/ui-ux-pro-max/scripts/search.py "<2-5 words>" --design-system -p "Client"
    python3 <skill-dir>/kits/ui-ux-pro-max/scripts/search.py "<query>" --domain ux|typography|color|style|product|landing|motion|chart|icons -n 3
    python3 <skill-dir>/kits/ui-ux-pro-max/scripts/search.py "<query>" --stack nextjs|react|shadcn|html-tailwind|astro|threejs

NOT available here: `--domain google-fonts` (file removed). Check font availability and licence on fonts.google.com or
fontshare.com instead.

How Verrolify uses it (see references/design/anti-slop-design.md):
- Output is a set of CANDIDATES (pattern, style, palette, type pair) plus checklists. It is not a decision.
- Verro technique exclusions override it (no dark mode for healthcare, education, government; no whitespace-heavy
  layouts on dense dashboard pages). Its style names (Neumorphism, Liquid Glass, Glassmorphism) are usually the wrong
  answer for a trust-first local business. Ignore them unless the brief asks for one.
- Most useful here: `--domain ux` guidelines for forms, touch targets, accessibility, performance; `--domain typography`
  for pair candidates; `--stack nextjs|react|shadcn` for implementation traps.
