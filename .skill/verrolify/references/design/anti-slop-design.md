# Anti-slop design

Slop is a default that nobody decided. The cure is a decision, in writing, before anything is built, then evidence
afterwards. Five layers hold the line: (1) the brief and technique selection, (2) reference triage, (3) this file's
floor, (4) the lint and gates, (5) the fresh-eyes pass. Copy slop has its own file: `copy-no-slop.md`.

Contents: 1 Defaults to avoid, 2 The two-pass design plan, 3 The taste floor, 4 Signature element, 5 Structure and
labels, 6 The Verro fingerprint registry, 7 Restraint and critique.

## 1. AI-default looks (avoid unless the brief or the client's own world pins them)

AI-generated design clusters around these. They are defaults, not choices, and they appear whatever the subject.
1. Warm cream background (near #F4F1EA) with a high-contrast serif display and a terracotta or warm-clay accent
   (near #D97757). Note: Verro's own brand is bone, ink and oxblood. That is a deliberate brand, for Verro-owned
   properties only. Never reuse it on a client.
2. Near-black background with a single bright acid-green or vermilion accent.
3. Near-black plus warm amber accent plus high-contrast serif (the next default down whenever someone says dark, rich or
   cinematic).
4. Broadsheet layout: hairline rules, zero radius, dense newspaper columns.
5. The SaaS card kit: content chopped into identical rounded cards, one radius on everything, the same soft grey
   shadow, gradient washes as decoration.
6. Template chrome: a tracked-out all-caps eyebrow above every heading, meta strings joined by middle dots, labels built
   as "WORD, fragment", tinted near-black standing in for black, a monospace face for small data labels, an arrow glyph
   appended to every link, section counters (01 / 06).
7. Violet-to-blue gradients, neon glows, gradient text, glassmorphism as decoration, Aurora washes as decoration.
8. Claymation or low-poly diorama worlds as the default for scroll pages. Photographic unless the brand is genuinely
   illustrated.
Carve-out: these are banned as default reaches, not as subjects. A pottery studio really does live in cream and
terracotta. Earn it: sample the tones from the client's real material world, invent a signature element, avoid the stock
layout, and say the deviation out loud in the brief.

## 2. The two-pass design plan (before any code)

Pass 1, a compact token plan written into the brief:
- Colour: 4 to 6 named hex values (the 60-30-10 roles plus a text and a quiet neutral).
- Type: faces and their roles, H1 size, body size, line height, measure.
- Layout: a concept in one sentence per section plus an ASCII wireframe of the first viewport at 375px and at 1280px.
  Alignment guidance (left, centred, split) per section.
- Principles: what makes this page specific to this business.
Pass 2, review against the brief and against the generic default: work through a similar prompt in your head. If you
arrive at the same place, that part is a default. Revise it, and write what you changed and why. Only then write code.

## 3. The taste floor (holds in every aesthetic)

Condensed from scroll-craft's taste.md and the owner's laws. The floor is what separates a chosen aesthetic from a sloppy
one.
- **Spacing:** one scale (4, 8, 16, 24, 32, 48, 64, 96, 128, 192). Rhythm over randomness. A maximalist page still needs
  a scale, and needs it more.
- **Type:** real hierarchy (size, weight and colour differences you can feel), body at least 16px, measure 65 to 70ch,
  no more than two families plus an optional mono, text blocks sized in `ch` on the text element.
- **Colour:** contrast measured on the composited render, not guessed. No pure black or white canvas. Accent in rare doses.
- **Text over media:** a scrim only where the text sits, never a full-frame dark overlay. The scrim is a sibling of the
  copy, not a parent. Check the worst frame under each line.
- **Depth:** real separation (occlusion, differential movement), not stacked elements moving as one image.
- **Cards:** not identical cards as page structure, no nested cards, no three equal feature columns by default, no more
  than two consecutive image-left text-right zigzags, never the same layout family twice in a row.
- **Motion:** `transform` and `opacity` only, `clip-path` for wipes, no `transition: all`, nothing bounces or overshoots,
  reduced motion keeps meaning.
- **Hero:** headline at most two lines, subtext at most 20 words, CTA visible without scrolling, at most four text
  elements, no scroll cue, no overflow past the viewport.
- **Content:** no div-built fake screenshots, dashboards or terminals. No text baked into generated images (real markup
  only: selectable, translatable, sharp). No emoji standing in for icons: use one icon library. No custom cursors unless
  the brief earns one. No version stamps or locale and weather strips on a marketing page.
- **Squint test:** blur the page until detail is gone. You must still name the primary element, the secondary element and
  the major groups, in that order. If everything greys into one field, hierarchy is the problem and no shadow, gradient or
  motion will fix it.

## 4. The signature element

One bespoke thing that lives on this site alone, coded for it. Spend the boldness budget there and keep everything else
quiet so it reads. Test: remove it. If the page barely changes, it is not a signature.
Counts: a custom interaction tied to the business (a scent-notes scroller, a floor-plan reveal tied to scroll, a booking
slot picker that behaves like a tear-off ticket, a class-timetable that fills as you scroll). Does not count: a recoloured
spotlight, a retuned tilt, a decorative icon, a kit parameter change.

## 5. Structure and labels carry information

Eyebrows, numbering, dividers and labels encode something about the content, they do not decorate. Numbered markers only
when the content is truly a sequence (steps, a timeline). An eyebrow at most once per three sections. A hero metric
template (big number, small label, stats, accent) is the default treatment, so use it only when it is truly best. Never
accent a single word in a headline by colour or italic as a reflex. Sentence case, plain verbs.

## 6. The Verro fingerprint registry (agency sameness is the real risk)

Twenty local sites from one agency will look like one template unless someone tracks it. Keep `FINGERPRINTS.md` in the
Verro workspace (template in `assets/templates/`). Each build adds one row over six dimensions:

| Dimension | Example values |
|---|---|
| Layout structure | Storytelling, Split-Screen, Bento |
| Hero device | still plus whisper, layered planes, scrub shot, chain |
| Nav treatment | top bar, centred logo, side rail, bottom bar on mobile |
| Section sequence shape | proof-first, story-first, services-first, process-first |
| Close pattern | map-led, WhatsApp-led, form-led, booking-led |
| Signature move | the one bespoke interaction |
A new build must differ from each of the last five rows on at least three of six dimensions. Two competing clients in the
same locality must differ on at least five, and must not share a palette. If the plan fails, change the plan, not the log.
Scroll-craft's stricter registry (4 of 6 against every row, in `kits/scrollcraft/`) applies to Mode 2 when you use its
engine.

## 7. Restraint and critique

Spend boldness in one place. Cut any decoration that does not serve the brief. Before delivery, remove one accessory (the
Chanel rule). Build to a quality floor without announcing it: responsive down to 375px, visible keyboard focus, reduced
motion respected, accessible contrast, harmonious palette. Critique your own screenshots as you build. Keep brief notes of
what you tried, so a later pass does not repeat it.
