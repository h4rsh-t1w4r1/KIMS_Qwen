# Verrolify components

Small, dependency-light React components for Motion. Copy the ones you need into the client project (for example
`src/components/verro/`). Do not rebuild them from memory.

| File | Use | Mode |
|---|---|---|
| `motion-provider.tsx` | Wrap the app once. `LazyMotion` plus reduced-motion config | all |
| `reveal.tsx` | Whisper entrance, once. Exports `EASE_OUT` | 1, 2, 3 |
| `stagger.tsx` | Staggered children for grids and lists | 1, 2 |
| `scroll-progress.tsx` | Top reading-progress bar | 2 (optional) |
| `parallax-layer.tsx` | One depth plane for layered heroes | 2 |
| `sticky-scene.tsx` | Tall track with a sticky stage and a `progress` value | 2 |
| `count-up.tsx` | Animated true figures | 1, 2 |
| `scrub-video.tsx` | Scroll-scrubbed hero film with the five static-hero gates, an `overlay` prop for the server-rendered H1 and CTA, a `mime` prop, plus `useBand` | 2 |
| `whatsapp.tsx` | `whatsappLink`, `WhatsAppButton`, `StickyContactBar` | 1, 2, 3 |
| `schema.tsx` | `JsonLd`, `buildLocalBusiness`, `buildFaq`, `buildBreadcrumbs` | all |

Install: `npm i motion` (imports from `motion/react`). The legacy package name `framer-motion` also works.

Verification status (October 2026, Next 16.4.0 with Turbopack static export, React 19.3, motion 14.0.0, headless Chromium 153):
all files type-check under strict TypeScript, build in a real static export, and pass 31 runtime checks in a real browser against
a Range-less static server: Blob fetch and decode, scrub seeking to the right time at 50 percent scroll, rewind, the five
static-hero gates on a phone viewport and under reduced motion, live disarm and re-arm on resize, H1 visible in the first
viewport on phone and desktop, Reveal, CountUp, ParallaxLayer, StickyScene pinning, ScrollProgress, zero console errors and
no hydration mismatch. The browser test found and fixed a real hydration bug (reduced-motion branching in CountUp and
ParallaxLayer). NOT verified: Safari or iOS (including the iPad decoder priming note), real mid-range Android, H.264 decode
(the test used a WebM film because Chromium builds lack H.264), hosts that do support Range, throttled 4G. Run the gates in
`references/core/qa-gates.md` on every real build.

Conventions: client components start with `"use client"`. Use `m.*` (not `motion.*`) inside `MotionProvider`. Colours come
from CSS variables so the client's palette applies. Components never hard-code a brand.
