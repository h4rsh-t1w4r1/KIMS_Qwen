# The six-step scroll build sequence (reusable for any product)

Source: the owner's six prompts for a premium sneaker site ("Nova"), generalised into a framework that works for any
product-led local business. Build one step per chunk. After each step: build passes, screenshot at 375 and 1280, reduced
motion check, then the next step. Motion implementations use the components in `assets/components/`.

Contents: 1 The owner's six prompts (exemplar), 2 The reusable framework, 3 Per-step translation, 4 Conflicts between the
prompts and the taste floor, 5 Local-business examples.

## 1. The owner's six prompts (exemplar, verbatim)

1. Design system and scroll foundation: "Create a premium sneaker brand website called Nova. Use a dark premium design system
   with bold typography throughout. Set up a scroll animation system that animates elements as they enter the viewport. Add
   a sticky navigation bar with the Nova logo and four smooth scroll links with a subtle blur glass effect on scroll."
2. Floating 3D hero: "Add a full viewport height hero section with a large 3D floating sneaker visual that bobs gently and
   rotates slowly. Add a bold two-line headline on the left with an accent colored word, a CTA button, and a pulsing scroll
   indicator at the bottom center."
3. Parallax product features: "Add three full screen sections covering Nova's adaptive sole technology, precision weight
   distribution, and breathable mesh construction. Each section will use a different layout, reveal animation, and
   parallax effect."
4. Scroll-controlled colour journey: "Add a section that stretches across four viewport heights and moves through four
   colorways as the user scrolls. The background, sneaker, color label, and progress bar all need to update together
   throughout the section."
5. Brand story and animated social proof: "Add two connected sections: the first presents the Nova brand story through
   three large lines of text that reveal one at a time as the user scrolls, while the second introduces animated counters
   for pairs sold, countries reached, and customer rating."
6. Final CTA, footer and polish: "Add a full screen CTA with a bold two-line headline, a short tagline, and a large electric
   blue 'Get Yours' button. Include a background that reacts gently to mouse movement, followed by a minimal footer
   containing the Nova logo, three navigation columns, and a copyright notice. Improve the easing and performance of scroll
   effects for 60fps, add hover responses, a subtle cursor trail on desktop, and adjust layouts for 375px and 768px
   breakpoints."

## 2. The reusable framework

| Step | Name | Slots to fill from the brief |
|---|---|---|
| 1 | Scroll foundation and observer | brand, design system sentence, nav links, the nav surface treatment |
| 2 | Floating hero | product visual (real cutout or film), two-line headline, CTA, optional cue |
| 3 | Three parallax feature sections | three true features, three different layouts, reveal types, parallax directions |
| 4 | Scroll-controlled journey | four true variants (colours, scents, unit types), the four things that update together |
| 5 | Brand story and counters | three story lines, up to three TRUE figures |
| 6 | CTA, footer, polish | closing headline, tagline, CTA, footer columns, polish list, breakpoints |

Prompt templates (fill every bracket from the brief, never improvise a value):
```
1. Create [brand], a [category] in [area]. Apply [design system from the brief: palette roles, type pair]. Set up a scroll
   animation system that animates elements as they enter the viewport (once, whisper tokens). Add a sticky nav with the logo
   and [four] smooth-scroll links, gaining a [surface] after the first 24px of scroll.
2. Add a full-viewport hero. Visual slot: [real asset path]. It floats gently and rotates slightly [only if the asset supports it].
   Two-line headline on the left: "[verbatim]". One CTA: "[label]" to [channel]. [Optional: a small scroll cue.]
3. Add three full-screen sections for [feature A], [feature B], [feature C]. Each uses a different layout skeleton, a
   different reveal and a different parallax behaviour. Facts only from the ledger.
4. Add a section [400] viewport heights tall that moves through [four variants] as the user scrolls. Background, product,
   label and progress bar all read one progress value.
5. Add two connected sections: three large story lines that reveal one at a time with scroll, then counters for [true
   figures]. If fewer than three true figures exist, show fewer.
6. Add a full-screen closing CTA with a two-line headline, a tagline and one large button. Background reacts to the pointer
   on fine pointers only. Footer: logo, three columns, copyright, [address, hours, WhatsApp]. Then polish: easing, 60fps,
   hover responses, 375 and 768 breakpoints.
```

## 3. Per-step translation (Motion implementation and gate)

**1 Foundation.** `MotionProvider` in the layout, `Reveal` and `Stagger` as the observer system. Sticky nav: toggle one
`solid` state at 24px of scroll with `useMotionValueEvent`. Anchor links use `scroll-behavior: smooth` guarded by
`prefers-reduced-motion: no-preference`, plus `scroll-margin-top` equal to the nav height. Gate: nav legible over every section.

**2 Hero.** The medium comes from the tier (layered planes, a single scrub shot, a chain). Floating means a gentle bob and
a few degrees of rotation on a real transparent cutout, looping only while in view. A flat photo cannot truly rotate. True
rotation needs a rendered turntable or a model. Do not fake depth with CSS 3D on a flat image. Gate: headline and CTA
visible without scrolling, LCP element not animated.

**3 Features.** Three sections that differ on layout skeleton, reveal and parallax: for example (a) text left, product right,
slow upward parallax; (b) centred statement with a clip-path wipe reveal; (c) full-bleed image with the text card sliding
over it. Use `ParallaxLayer` and `Reveal`. Never the same device twice in a row. Gate: each section passes the squint test alone.

**4 Journey.** `StickyScene heightVh={400}` with one `progress` value. Colour from `useTransform(progress, [0, .33, .66, 1],
[...])`, product swaps by opacity cross-fade (all four images preloaded and declared in the manifest), label and bar read
the same value. Variants are real catalogue items. Gate: all four states legible, and reduced motion shows a static grid of
the variants instead of a pinned track.

**5 Story and counters.** Three lines revealed by progress thresholds inside a `StickyScene`, then `CountUp` for ledger-true
numbers. Gate: every figure traces to the truth ledger.

**6 Closing and polish.** Pointer-reactive background with `useMotionValue` and `useSpring` only on fine pointers. Footer
carries the local essentials. Polish list: easing audit against the tokens, CPU-throttle test, hover and focus states
everywhere, tap targets, 375 and 768 checks. Gate: full `references/core/qa-gates.md` run.

## 4. Where the prompts and the taste floor disagree (resolutions)

| In the prompt | Taste floor says | Resolution |
|---|---|---|
| "accent colored word" in the headline | Never accent a single word by colour or italic as a reflex | Default off. Allowed only if the brief names it as the signature, and the accent stays within T5's 10 percent |
| "pulsing scroll indicator" | No scroll cue in the hero | Default off. Allowed once, tiny, not pulsing, only if the next section is not visible at all |
| "subtle cursor trail on desktop" | No custom cursors unless the brief earns one | Default off. Allowed only on fine pointers, off for reduced motion, and only for a brand that wants it. Never in Mode 1 |
| "3D floating sneaker" | No fake objects | Needs a real generated or supplied asset. See step 2 |
| "blur glass nav" | Avoid decorative glassmorphism | Fine if it is functional and cheap: small blur, solid fallback, never over busy imagery that hurts legibility |
| "Four viewport heights" journey | Pace in scroll distance | Matches the standard: about 100 vh per beat |

## 5. Local-business examples

- Perfume shop: step 4 journey through four scents (bottle, tint, notes label, progress). Step 5 counters are years and shop
  visits only if true.
- Real estate: step 4 journey through unit types (1, 2, 3 BHK) with plan thumbnails. Generated imagery labelled artist's
  impression. Step 6 CTA is a site-visit slot on WhatsApp.
- Mobile showroom: step 3 sections for display, camera, battery with only manufacturer-true specs. Step 4 colourways of the
  featured model. Step 6 with EMI and exchange notes that are true today.
