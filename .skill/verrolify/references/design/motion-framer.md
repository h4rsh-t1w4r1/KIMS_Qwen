# Motion (Framer Motion) in Verrolify

Framer Motion is now called Motion. React package: `npm i motion`, import from `motion/react`. The old `framer-motion`
package name still works. Verified for this skill (October 2026): the components in `assets/components/` type-check,
build in a Next 16.4 static export, and pass a real-browser test (see `assets/components/README.md` for what was and was not
covered) against motion 14.0.0 and React 19.3. Docs: motion.dev.

Contents: 1 Where to use it, 2 Intensity per mode, 3 Verro motion tokens, 4 Setup, 5 Recipes, 6 Scroll-linked rules,
7 Performance, 8 Reduced motion and accessibility, 9 Next.js notes, 10 Plain HTML path, 11 Testing.

## 1. Where Motion earns its place

Rule of thumb: CSS first for simple state changes (a hover colour). Motion when you need sequencing, scroll linkage,
presence (mount and unmount), springs for gestures, or one value driving many things.

Use it for:
- Entrance reveals on below-the-fold content, once (`Reveal`, `Stagger`).
- Hover and press feedback on buttons and cards (`whileHover`, `whileTap`).
- Scroll-linked motion: parallax planes, progress bars, sticky scenes, colour journeys (`useScroll`, `useTransform`).
- Presence: accordions, tabs, mobile menu, toasts (`AnimatePresence`). A user-triggered height animation is fine.
  Scroll-linked height animation is not.
- True counters (`CountUp`).
- Mouse-reactive backgrounds on fine pointers only.

Do not use it for:
- The LCP element. Never fade the hero headline or hero image in from opacity 0.
- Long body copy split line by line. Kinetic text only for headings of about eight words or fewer.
- Endless looping animations, except one deliberate signature, paused off-screen.
- Anything that animates `width`, `height` (scroll-linked), `top`, `left`, or any `transition: all`.
- Everything at once. Three animated groups per viewport at most.
- Carousels and drag unless needed: CSS `scroll-snap` carousels cost zero JavaScript. Drag and `layout` animations need
  `domMax` instead of `domAnimation` (about 10 KB more). Switch only if the interaction justifies it.
- Paid Motion+ features, without the owner's approval.
One animation library per project. Do not add GSAP beside it. If a ui-ux-pro-max GSAP preset appeals, translate it.

## 2. Intensity per mode

| Mode | Name | Allowed |
|---|---|---|
| 1 Trust landing | Whisper | `Reveal` and `Stagger` (0.5 to 0.7 s), hover and press feedback, one tasteful signature moment, sticky contact bar. No parallax. Healthcare: reveals and hovers only |
| 2 Scroll-animated | Choreographed | Layered parallax hero, `StickyScene` beats, colour journeys, counters, scrub film tiers, one signature. Never the same device twice in a row |
| 3 Integrate and retain | Functional | Button and loading states, form feedback, list enter in dashboards, skeleton to content. Public pages follow Mode 1 |

## 3. Verro motion tokens

| Token | Value |
|---|---|
| Micro (hover, press) | 0.15 to 0.25 s, ease `[0.4, 0, 0.2, 1]` |
| Reveal | 0.5 to 0.7 s, ease `[0.16, 1, 0.3, 1]`, rise 12 to 24 px |
| Scene transition | 0.8 to 1.2 s |
| Stagger gap | 0.06 to 0.1 s, total under 0.8 s, at most about 8 items |
| Parallax speed | 0.05 subtle, 0.12 default, 0.2 strong. Above 0.3 looks broken |
| Hover lift | `y: -2` or scale 1.02. Press scale 0.98 |
| Springs | Only for gestures. `{ type: "spring", stiffness: 300, damping: 30 }`. Reveals never bounce or overshoot |
| Reveal trigger | Once, when 10 percent inside the viewport |

## 4. Setup

```bash
npm i motion
cp -r <skill-dir>/assets/components src/components/verro
```
```tsx
// app/layout.tsx (server component)
import { MotionProvider } from "@/components/verro/motion-provider";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <noscript><style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style></noscript>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
```
The `noscript` rule keeps content visible if JavaScript fails, because reveal blocks are server-rendered hidden.
Inside the provider use `m.div` (not `motion.div`), because `LazyMotion strict` throws on the full component.

## 5. Recipes

Hover card and press feedback:
```tsx
<m.a href="/services" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
     transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>Teeth whitening</m.a>
```
Accordion (user-triggered, presence plus height):
```tsx
<AnimatePresence initial={false}>
  {open && (
    <m.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
           exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
           style={{ overflow: "hidden" }}>{answer}</m.div>
  )}
</AnimatePresence>
```
Sticky nav that gains a surface after 24 px of scroll (state toggled once, not per frame):
```tsx
const { scrollY } = useScroll(); const [solid, setSolid] = useState(false);
useMotionValueEvent(scrollY, "change", (y) => setSolid((s) => (y > 24) !== s ? y > 24 : s));
```
Keep blur at 12 px or less, or use a solid translucent surface. Backdrop blur is expensive on mid-range phones.

Scroll-linked colour journey (one `progress`, many consumers):
```tsx
<StickyScene heightVh={400}>
  {(p) => {
    const bg = useTransform(p, [0, 0.33, 0.66, 1], ["#2b1a14", "#1f2a1f", "#1a2230", "#2a1424"]);
    return <m.div style={{ backgroundColor: bg }}>{/* product, label, progress bar read p too */}</m.div>;
  }}
</StickyScene>
```
(Hooks inside a render-prop must live in a component: extract `<Journey progress={p} />` so hook order is stable.)

Text lines that reveal one at a time by progress:
```tsx
const l1 = useTransform(p, [0.05, 0.2], [0, 1]); const l2 = useTransform(p, [0.3, 0.45], [0, 1]);
<m.p style={{ opacity: l1 }}>...</m.p>
```
Floating product (a real cutout with alpha, never a CSS-faked object), looping only while visible:
```tsx
const ref = useRef(null); const seen = useInView(ref); const reduce = useReducedMotion();
<m.img ref={ref} src="/assets/bottle-cutout.webp" alt="" animate={!reduce && seen ? { y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] } : {}}
       transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
```
Mouse-reactive background (fine pointers and no reduced motion only):
```tsx
const x = useMotionValue(50), y = useMotionValue(50);
const bg = useMotionTemplate`radial-gradient(600px at ${x}% ${y}%, var(--glow), transparent 60%)`;
// onPointerMove: x.set(e.clientX / innerWidth * 100); y.set(e.clientY / innerHeight * 100)
```
Components for the rest: `Reveal`, `Stagger`, `ParallaxLayer`, `StickyScene`, `CountUp`, `ScrollProgress`, `ScrubVideo` (see
`assets/components/README.md`).

## 6. Scroll-linked rules

- `useScroll({ target, offset })`: offset pairs read "element edge, viewport edge". `["start end", "end start"]` runs
  from the element entering to leaving. `["start start", "end end"]` runs across a sticky track.
- Derive everything from one `progress` per scene with `useTransform`. Do not create a `useScroll` per child.
- Do not double-smooth. `ScrubVideo` already lerps. Feed it raw scroll and put `useSpring` only on UI meters.
- Pace in scroll distance: about 100 vh per beat. Under-sized tracks make beats flash past.
- `position: sticky` silently fails if any ancestor has `overflow: hidden` or `auto`. Check first when a scene does not pin.
- Use `svh` units for stages so mobile address bars do not break the layout.

## 7. Performance

- Animate `transform` and `opacity` only. `clip-path` for wipes.
- No more than about six simultaneous scroll-linked transforms in a viewport.
- Parallax planes are pre-sized WebP, each about 150 KB or less, never full-bleed 4K. On phones render planes statically.
- `will-change: transform` only on elements that are actively moving.
- Bundle: `LazyMotion` with `domAnimation` and `m` keeps the footprint small. Measured October 2026 in a Next 16 static export:
  an empty page 132 KB gz of JavaScript, and the full component set (ScrubVideo, StickyScene, ParallaxLayer, Reveal, Stagger,
  CountUp, schema, WhatsApp) added about 50 KB gz. Import only the components a page uses. Measure with `scripts/perf_budget.py`.
- Test with a 4x CPU throttle. If the hero janks, remove a layer, not the throttle.

## 8. Reduced motion and accessibility

- `MotionConfig reducedMotion="user"` (in `MotionProvider`) turns transform and layout animations off. Opacity and colour
  still run.
- Scroll-linked effects check `useReducedMotion()` themselves (`ParallaxLayer` does) and show final states.
- Pinned scenes under reduced motion render the final composition instead of a long pinned track.
- Never hide meaning inside motion: every reveal-only content has a static final state.
- Decorative moving elements are `aria-hidden`. Nothing flashes more than three times a second.

## 9. Next.js notes

- All Motion components are client components. Server components import them, they do not import hooks.
- `motion/react-client` exists for tree-shaken use of `motion.*` in server files. With `LazyMotion` stay on `m.*`.
- Static export works (verified with Next 16.4): `next.config.mjs` is `export default { output: "export", images: { unoptimized: true } }`.
  `unoptimized` is needed because the default image optimiser requires a server, so pre-size and compress images yourself.
- Hydration safety: the first client render must equal the server render. Never branch markup or initial state on
  `useReducedMotion()` or `matchMedia`. Apply those preferences in an effect after mount (a browser test caught exactly this bug).
- Do not wire route transitions with `AnimatePresence` in the App Router by default. They are brittle. Animate within pages.
- No `useLayoutEffect` warnings: use the supplied components, they are SSR-safe.

## 10. Plain HTML path (no React, no build step)

For single-folder static sites use the vanilla API from the same package: `import { animate, scroll, inView, stagger } from "motion"`.
Vendor the file into `assets/` rather than loading it from a CDN at runtime (one less third-party dependency and no CSP
surprises).
```js
import { animate, inView, stagger } from "./assets/motion.js";
inView(".reveal", (el) => { animate(el, { opacity: [0, 1], y: [16, 0] }, { duration: 0.6, ease: [0.16, 1, 0.3, 1] }); });
```
For scroll-scrub heroes in plain HTML use the proven engines: `kits/scrollcraft/engine/` or `kits/lets-scroll/scrub-engine.js`.

## 11. Testing motion

Screenshots with reduced motion on and off. Check that nothing is stuck at opacity 0 with JavaScript disabled. Verify the
LCP element has no entrance animation. Throttle CPU 4x and scroll the hero. Count animated elements per viewport against
the budget above. See `references/core/qa-gates.md` G5.
