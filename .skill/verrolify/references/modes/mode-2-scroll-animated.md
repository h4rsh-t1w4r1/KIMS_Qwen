# Mode 2: Scroll-animated product sites

For product-led local businesses: perfume and attar shops, jewellery, real-estate projects, mobile and car showrooms,
furniture, premium food launches. The buyer is buying a desire. The page moves as the visitor scrolls: footage, depth and
type respond to the wheel, in the manner of Apple's product pages. Done well it is the most memorable thing a local
business has ever had. Done carelessly it is a slow, janky page with stolen-looking visuals. This file keeps it honest.

Contents: 1 When Mode 2 fits, 2 Tier ladder and cost honesty, 3 Decide: grammar, tier, medium, 4 Assets, 5 Engines and stacks,
6 The phone truth, 7 Devices with Motion, 8 Page plan, 9 Playbooks, 10 Build order, 11 Gates, 12 Failure modes.

## 1. When Mode 2 fits

Fits: the product is visual and emotional, the owner wants wow, there is something real to show (a product, a project, a
showroom), and there is budget for assets. Does not fit: trust-critical services (clinic, therapist, school). For those,
recommend Mode 1 plus a restrained hero moment. Motion sells attention. It does not fix invisibility or lack of trust, so
pair every Mode 2 site with the WhatsApp CTA and local SEO from Mode 1.

## 2. Tier ladder and cost honesty

| Tier | What | Assets | Cost shape | Pick when |
|---|---|---|---|---|
| **L Layered** | Three to five depth planes with Motion parallax and devices. No film | Stills and cut-outs (client photos, or generated stills) | Image credits only, often none | Tight budgets, phone-heavy audiences, real-estate exteriors, a product on a stage |
| **S Single shot** | One 6 second generated shot scrubbed by scroll, captions in negative space, settles into the real page | 1 image and 1 film | Default when budget allows | A hero moment for one hero product |
| **C Chain** | A 15 to 20 second journey, each segment starts on the previous segment's last frame | Segments times film price | Higher | The concept truly needs rooms, floors or a path |
| **W World flight** | N frame-locked stills and 2N minus 1 clips | N stills plus clips | Highest | Flagship only: a township launch, a campus, a product world |

Preflight the price of every generation and state the total before spending (`agent-discipline.md` section 4). For scale,
the lets-scroll author measured a six-stop 1080p chain at about 27 USD on one backend and about 11 USD at 720p. Re-measure
on your backend. Offer Tier L first to price-sensitive clients and let the owner choose up with eyes open.

## 3. Decide: grammar, tier, medium

1. **Page grammar.** Scroll-craft defines eight: filmic one-shot, chaptered editorial, live surface, continuous world,
   typographic poster, gallery or catalogue, split stage, rhythmic cutlist (`kits/scrollcraft/references/uniqueness.md`,
   section 2). Choose from all eight and write why the other seven lost. Starting points, not rules:
   - Perfume and jewellery: filmic hero, then chaptered editorial for notes and story, gallery for the collection.
   - Real estate: chaptered editorial for most projects, split stage for unit-type comparison, continuous world only for
     flagships.
   - Showroom: split stage (spec beside visual), rhythmic cutlist for fast beats, gallery for models.
2. **Tier** by budget and concept (section 2). **Medium** is the tier's hero.
3. **Signature move** (bespoke, tested by removal) and the **feeling curve** (quiet, build, peak, release, ask), from
   `kits/scrollcraft/references/feel.md`. Name the one moment the visitor will tell someone about.
4. Record grammar, tier, medium, signature and device list in the brief and in `FINGERPRINTS.md`.

## 4. Assets

Source priority: (1) the client's real product photography, (2) generated stills conditioned on real references where the
tool allows, (3) licensed stock. Never hotlink. Never present generated imagery as a real building, product or person.
- **Twelve hero laws, chaining, cost preflight:** `references/scroll/prompt-laws.md`. Read before prompting any model.
- **Design package** (palette, type, scene logic carried into every prompt): `references/scroll/design-package.md`.
- **Style preamble:** pick one art-direction world and paste the same preamble verbatim at the top of every image and film
  prompt (`kits/scrollcraft/references/worlds.md`). Paraphrasing it is what makes eight assets look like eight prompts.
- **Encoding** for scrubbing (dense keyframes), posters and static endings: `references/scroll/ffmpeg-recipes.md`.
- **Alpha cut-outs:** for stills generated on a flat background colour, `kits/lets-scroll/knockout.py` removes the
  border-connected background (pure PIL, read its header for the tolerance variable). For real product photos with busy
  backgrounds use a proper background-removal tool, then inspect the alpha channel (a checkerboard pasted into pixels is not
  transparency).
- **Trademarks:** generated media can sneak in logos and brand marks. Inspect every frame. A perfume shop's photographs of
  the brands it legitimately retails are the client's to use, a generated bottle is not allowed to carry a real brand.
- **Disclosure:** decide AI-imagery disclosure with the owner (footer line). Real estate: label generated visuals "artist's
  impression" and match approved plans.
- **Declare everything** in `assets.manifest.json`. Run `scripts/verify_assets.py` before every preview.
- **Gates:** inspect each generated image before it feeds a film; the owner watches each film before the page is built
  around it (video gate).

## 5. Engines and stacks

| Path | Use when | How |
|---|---|---|
| **A. Next.js plus Motion plus components** (default) | Tiers L, S, C, and any site that also needs Mode 1 or 3 features | `assets/components/` (`ScrubVideo`, `StickyScene`, `ParallaxLayer`, `Reveal`...). Put the H1 and CTA in `ScrubVideo`'s `overlay` prop so they are in server HTML. Static export unless a server feature is needed |
| **B. Single-folder static HTML** | Host has no Node, one-page launch, owner wants zero build | `kits/scrollcraft/engine/` (data-attribute driven) or the vanilla patterns in `references/scroll/scrub-pipeline.md`. Motion's vanilla API for reveals |
| **C. World flight template** | Tier W | `kits/lets-scroll/index-template.html` and `scrub-engine.js`, procedure in `kits/lets-scroll/LETS-SCROLL.md`, wrapper rules in `references/scroll/world-flight.md` |
One engine per page. Do not stack scrollcraft's engine on top of a React build.

The engineering floor is non-negotiable on every path: `references/scroll/scrub-pipeline.md` (blob fetch for hosts without
Range, lerp that rests, seek gating, delta-gated writes, text legibility over live footage, static-hero gate, complete
without the video, reduced motion, self-testing checklist).

## 6. The phone truth (say it once at proposal time)

Most of the owner's customers are on mid-range phones. Phones, portrait tablets and reduced-motion visitors get a composed
still hero. The scrubbed film plays on laptops and desktops. This is a design decision, not an apology: the static hero is a
designed layout, with the ending frame composed and the captions visible. Below the hero, light Motion (reveals, a short
sticky scene with no film) still works on phones. Consider a portrait scrub on phones only if the encoded film is under about 8 MB,
the composition survives a portrait crop, and it is verified on a real phone. Tier L parallax planes render statically on
phones unless tested.

Budget (verify with `scripts/perf_budget.py --mode 2`): phone path, excluding any film, about 3 MB; desktop path including
the film, about 15 MB. Poster paints first, the film streams behind it.

## 7. Devices with Motion

Scroll-craft's device vocabulary (`kits/scrollcraft/references/devices.md`) in Motion terms:

| Device | Motion implementation |
|---|---|
| scrub | `ScrubVideo` |
| pin | `StickyScene` with cue thresholds on `progress` |
| pan (vertical scroll, lateral travel) | Inside a sticky stage: `useTransform(progress, [0, 1], ["0%", "-66%"])` on a flex track |
| reveal (a wipe is a change of state) | `clip-path` via `useTransform(progress, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"])` |
| kinetic type | Word-by-word stagger for headings of about eight words or fewer |
| parallax and layered scenes | `ParallaxLayer`, foreground faster than background |
| count | `CountUp`, true figures only |
| flow and in | `Reveal`, `Stagger` |
| pointer devices | Pointer-reactive background or card tilt, fine pointers only |
| drift | A slow `ParallaxLayer` on the ground plane |
Composition rule: one thing is the reason each act exists and everything else in it is support. If you cannot say in one
sentence what an act's moment is, it has none. Never the same device twice in a row. Each section differs in layout skeleton.

## 8. Page plan (starting template, reorder by the feeling curve)

1. Hero: tier medium, outcome headline, one CTA, one trust signal.
2. Statement: one large kinetic or editorial sentence in the brand voice.
3. Product or project in three beats (pin or pan), only true facts.
4. Variants journey (colours, scents, unit types): `StickyScene` at about 400 vh.
5. Collection or units: gallery, split stage or pan.
6. Proof: real reviews, counters of true figures.
7. Visit and enquire: map, hours, WhatsApp, enquiry. Local essentials are never optional.
8. Closing CTA.
Sequence of the six build steps: `references/design/scroll-site-sequence.md`.

## 9. Playbooks (details in `references/market/verticals.md`)

- **Perfume shop:** amber glass, mist, brass, a dim counter. Notes pyramid as a pin sequence, scent journey as the variants
  section, WhatsApp order and store visit CTAs. Never claim authenticity guarantees you cannot back.
- **Real estate:** exterior and amenity story, unit types, location advantage, site-visit WhatsApp slot. Show the RERA
  registration number where required and verify with the client. Label generated visuals as artist's impression. Generated
  bedroom and pool scenes can trip image-model safety filters: seed them carefully (see the lets-scroll gotchas).
- **Mobile showroom:** hero product with manufacturer-true specs, colourways journey, EMI and exchange as true-today notes.
  Prices and stock change: put them on the retainer or in an editable data file.

## 10. Build order

1. Brief, direction, references (SKILL.md steps 1 to 3). Fingerprint check. Asset spec table.
2. Money gate: total cost stated, owner says yes. Generate or collect stills. Inspect every one.
3. Films (Tiers S, C, W): generate, owner watches each (video gate), encode for scrubbing, make poster and static ending.
4. Page shell and hero with the poster only. Reserve hero scroll space. Screenshot.
5. Wire the film. Tune caption bands in scroll distance. Static-hero gate. Complete-without-video check.
6. Sections with devices. Each chunk ends with screenshots at 375 and 1280 and a reduced-motion check.
7. Local essentials, SEO, copy gate, performance.
8. All gates, deploy, speed receipts, real-device test.

## 11. Gates

`references/core/qa-gates.md` plus: the self-testing checklist in `references/scroll/scrub-pipeline.md`, the scrollcraft
contact-sheet harness (`kits/scrollcraft/scripts/shoot.mjs`, uses installed Chrome because bundled Chromium lacks the h264
decoder), and the device-diagnostic page (`kits/scrollcraft/references/device-diag.html`) for any phone-only defect.
`references/scroll/troubleshooting.md` has symptom to cause to fix tables.

## 12. Failure modes seen in the wild

- CSS or canvas faking an asset that a tool failed to generate. Blocked by the manifest gate.
- A 15 MB film on a 4G phone with no static path. Blocked by the phone truth.
- Hero goes blank after a rotation because the gate was decided once. Use the live-gate pattern.
- Text unreadable over live footage in the worst frame. Scrims are siblings of the copy, checked per frame.
- `sticky` not pinning because an ancestor has `overflow` set.
- The same layout repeated per section, so the page reads as a template despite the film.
- Brand marks or real people's likeness inside generated media.
- Presenting a generated render as the real project or product.
