# KIMS Hospital — Verro Studio Fictional Build

A Mode 1 (Trust Landing) healthcare demonstration site built with the Verrolify skill framework. **Fictional institution; no medical service offered.**

## Prerequisites
- Node.js ≥ 20 (built and verified on v22)
- npm

## Install
```bash
npm install
```

## Develop
```bash
npm run dev        # http://localhost:3000
```

## Build (static export)
```bash
npm run build      # outputs static site to ./out
npx serve out      # or any static host
```

The site is a pure static export (`output: 'export'` in `next.config.mjs`) — deployable to any static host (Netlify, Vercel, GitHub Pages, S3). No server, env vars, or API keys are required. The inquiry form is client-side only by design and truthfully reports that nothing is sent.

## Project layout
```
app/                 Next.js App Router source
  layout.tsx         fonts (next/font), metadata, JSON-LD, hero preload
  page.tsx           all landing sections (single page)
  components/        motion provider, reveal/stagger, inquiry form
public/assets/       9 supplied images (8 AVIF placed + 1 JPG retained)
assets.manifest.json image → section mapping
VERRO_BRIEF.md       objectives, truth ledger, IA, design direction
REFERENCE_LOG.md     sources actually consulted
```

## Validation scripts used (from .skill/verrolify/scripts/)
```bash
python ../.skill/verrolify/scripts/slop_lint.py app          # anti-slop lint
python ../.skill/verrolify/scripts/verify_assets.py assets.manifest.json public/assets
python ../.skill/verrolify/scripts/perf_budget.py out        # size budget check
```

## Notes / remaining setup
- None required to run. Photography is Unsplash stock included under `public/assets/`; swap for client-owned imagery before any real deployment.
- Footer carries the mandatory disclosure linking to https://verro-canvas.lovable.app/.
