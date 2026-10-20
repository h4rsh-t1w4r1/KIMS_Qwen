# Mode 1: Trust landing for service businesses

For clinics, dentists, physios, salons and spas, classes and tuition, schools, repair and home services, accountants.
The buyer is reducing risk. Clarity and trust beat drama. The site should make the business look as competent as it is,
make one action obvious, and work flawlessly on a mid-range phone. This is the bread-and-butter build, so it must be
excellent, not basic.

Contents: 1 Success definition, 2 Workflow, 3 Information architecture, 4 Hero, 5 Design decisions, 6 Motion,
7 Conversion furniture, 8 Local SEO, 9 Performance, 10 Build order, 11 Gates, 12 Upsell paths.

## 1. Success definition

Measured by the brief's outcome metric (calls, WhatsApp chats, booked first visits, walk-ins). A visitor must answer three
questions in five seconds: what is this, is it for me, what do I do next. Polish is a trust signal for anxious categories.

## 2. Workflow

1. Route and brief (SKILL.md steps 1 and 2). Vertical playbook: `references/market/verticals.md`. Health: also
   `references/market/healthcare-vertical.md`.
2. Direction (step 3): light mode by default. T2, T4, T5 on. T3 on, compact only where dense. Reference triage for hero,
   trust block, services and booking. Fingerprint check.
3. Build in chunks (SKILL.md step 4). Mobile-first: design at 375px, then scale up.
4. Gates, deploy, handover.

## 3. Information architecture (the trust ladder)

Default one-page structure, reordered by the buyer's biggest objection (from research). Each section has one job.
1. **Hero:** outcome headline, specific subheadline, one CTA, real visual, one trust signal.
2. **Proof strip:** practitioner or owner with real photo, qualification, years, registration numbers where required.
3. **Services in plain language:** what it is, who it is for, what to expect, time, cost if public. Group, do not list 20.
4. **How it works:** three to four steps from first contact to result. Reduces fear.
5. **Real reviews:** Google reviews with permission. Honest count.
6. **Before you come:** FAQ answering real objections (pain, price, time, trust).
7. **Visit us:** map, hours, parking, phone, WhatsApp, address in text.
8. **Closing CTA:** the same one action.
Multi-page only when search demand justifies it: one page per major service, each with unique content (Mode 3 pSEO rules
apply to anything generated at scale). Sticky mobile bar: Call and WhatsApp.

## 4. Hero (T4 for this mode)

Composition: Split-Screen or Storytelling. Visual: a real photo of the real place or practitioner. Generated imagery is
for atmosphere only, never for people. If no usable photos exist, plan a one-hour phone shoot with the owner (shot list
in the brief) rather than stock. Motion: whisper. A composed still plus `Reveal` on the secondary elements. No scrub film.

## 5. Design decisions

- **Mood:** from the business's real material world (daylight, ceramic, steel, linen, brass). Not "clean and modern".
- **Colour:** light canvas tinted toward the subject, never pure white. 60-30-10 with exact hex and contrast checked. The
  accent comes from the client's logo or signage if it exists.
- **Type:** a display face with warmth or authority, a quiet readable body. Devanagari companion if bilingual.
  Body 17 to 18px on mobile for older audiences.
- **Spacing:** Generous for hero and proof, Balanced for services, Compact for timetables and price lists.
- **Layout variety:** adjacent sections never share a skeleton. Cards only when content is genuinely parallel.
- **Imagery:** real. Compress to WebP or AVIF with explicit dimensions. Hero image preloaded.

## 6. Motion (Whisper)

`Reveal` on below-fold blocks, `Stagger` on service grids (at most six), hover and press feedback, one designed moment
(for example a class timetable that fills as it enters, or a before-you-come checklist that ticks). Healthcare: reveals and
hovers only. Nothing on the LCP element. Reduced motion honoured. See `references/design/motion-framer.md`.

## 7. Conversion furniture (pick four to six)

Defaults: smart-default booking field, authority block, real reviews, a reciprocity artifact (first-visit guide), peak-end
confirmation, contrast ordering in any price list. See `references/design/design-psychology.md`. No loss framing or fear in
health or wellbeing. No fake scarcity anywhere.

## 8. Local SEO (the part that actually gets customers)

- `LocalBusiness` (specific subtype) JSON-LD via `assets/components/schema.tsx`, NAP identical to the Google Business Profile.
- Title: "[Service] in [Area] | [Business]". Unique description per page. One H1. Canonical. OG with absolute URLs.
- Google Business Profile claimed, categories correct, website linked, photos, services. Reviews link given to the owner.
- Sitemap and robots (`app/sitemap.ts`, `app/robots.ts` in Next). Submit in Search Console.
- Content answers the searches people actually make, in the language they make them (Hindi, Marathi, English). Local
  landmarks, station names, neighbourhood names, honestly.
- Do not create doorway pages for areas not actually served.

## 9. Performance

Targets (verify with `scripts/perf_budget.py` and a real phone): first-view image preloaded, under about 200 KB gz of
JavaScript for the home page, fonts limited to used weights, no layout shift, LCP under 2.5 s on mid-range Android over a real
connection. Static export. No third-party scripts besides analytics that the owner asked for.
Measured baseline (October 2026): an empty Next 16 static page ships about 132 KB gz of JavaScript, and the full Verrolify
component set adds about 50 KB (a Reveal-only page adds less). If the audience is very phone-bound and the page needs no React
interactivity beyond reveals, Astro with Motion's vanilla API ships far less framework JavaScript. It is not the default because
the reference ecosystem (21st.dev, shadcn) is React, but it is a legitimate owner decision. Say it in the brief if you choose it.

## 10. Build order

1. Next.js static project, Tailwind, tokens, fonts, `MotionProvider`, `noscript` safeguard.
2. Layout shell, nav (five items at most), footer with NAP, sticky contact bar.
3. Hero. Screenshot at 375 and 1280.
4. Proof, services, process, reviews, FAQ, visit, closing CTA, one section at a time.
5. Forms: WhatsApp deep link and a form that tells the truth about where it goes. A static export has no server, so use
   the WhatsApp link, `tel:`, and `mailto:` or a hosted form endpoint the owner approves. For stored submissions move to
   Mode 3.
6. Motion pass, copy gate, SEO pass, performance pass.
7. `slop_lint.py`, `verify_assets.py`, `perf_budget.py --mode 1`, screenshots, fresh-eyes read.

## 11. Gates

All of `references/core/qa-gates.md`, with G10 skipped. Pay special attention to G1 truth (practitioner credentials, claims),
G6 accessibility (older audiences, large text, contrast) and G9 function (does the WhatsApp message arrive?).

## 12. Upsell paths (offer only if a metric justifies it)

- No-show pain: Mode 3 reminders (and a confirmation flow).
- Recurring visits: Mode 3 member area.
- Wants cinema: Mode 2 hero tier L on the home page only, with the rest of the site staying Mode 1.
- Search demand exists for specific services: Mode 3 programmatic pages, human-reviewed.
