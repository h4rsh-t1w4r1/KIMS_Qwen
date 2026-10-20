# VERRO_BRIEF — KIMS Hospital (Fictional Build)

**Mode:** 1 — Trust Landing · **Vertical:** Healthcare (India market rules applied) · **Stack:** Next.js App Router, TypeScript, Tailwind CSS, Motion (`motion/react`), `next/font`, static export.

## 1. Objectives
- Demonstrate Verro Studio's ability to ship a credible, polished, trust-first healthcare landing page.
- Establish a fictional institutional identity (KIMS Hospital — Kshitijya Institute of Medical Sciences, Dr. Kaushik Kshitijya) that parodies naming conventions **without** impersonating AIIMS or any real institution.
- Showcase the supplied Unsplash facility imagery in an art-directed way.
- Ship an illustrative appointment/inquiry journey that is honest about being a demo.
- This site offers no medical service and solicits no genuine patients.

## 2. Audience
- Primary: agency/design-evaluation viewers assessing Verro Studio craft.
- Secondary persona: an Indian patient-family visitor evaluating a hospital — used to drive information hierarchy (credibility → departments → facilities → how care works → inquiry).

## 3. Conversion Goal
Single visible action: **"Try the sample inquiry"** → `#inquire` validated client-side form. Because the build is fictional, success feedback truthfully states nothing is sent; the CTA microcopy ("No calls, no bookings, no patients") keeps the goal demonstrable without deception.

## 4. Truth Ledger (all claims on the page)
| Claim | Status | Evidence / label |
|---|---|---|
| KIMS Hospital / Kshitijya Institute of Medical Sciences | Fictional | Stated in hero, About, footer |
| Dr. Kaushik Kshitijya | Invented person | Labelled "an invented practitioner" in About |
| Departments (General medicine, Cardiology, Orthopaedics, Paediatrics) | Illustrative | Section heading "Illustrative departments" + per-row "Illustrative" tag |
| Facility photographs | Real stock photos | Each figure captioned "atmosphere only"; Unsplash licence noted in footer |
| Address / phone / hours / map pin | Not provided | Visit section explicitly refuses to invent them |
| Accreditations, stats, testimonials, outcomes, registrations | Absent by design | None appear anywhere (page, metadata, JSON-LD) |
| Form submission | Client-side only | Success state says "Nothing was sent" |

**Never stated:** qualifications, NMC registration, bed counts, success rates, government affiliation, AIIMS connection.

## 5. Information Architecture (trust ladder)
1. Sticky nav (anchor links, gold underline on active hover)
2. Hero — split editorial layout, T4 five-part stack, facility image with atmosphere caption
3. About — "What this project is": fiction disclosure up front, project-type table
4. Departments — two-column list rows (deliberately not cards), labelled illustrative
5. Facilities — dark band, asymmetric mosaic of 7 inspected images with captions
6. How it would work — 3-step process band (sample inquiry → [fictional] triage → [fictional] visit)
7. Inquiry — validated sample form + reception context image
8. Finding KIMS — honest NAP block (no invented operational data)
9. Closing CTA — returns to sample inquiry + real Verro Studio link
10. Footer — mandatory disclosures (see §8)

## 6. Design Direction
- Light-first per Mode 1 + healthcare vertical rule (dark mode banned); one dark band used as rhythm, not identity.
- Palette (60–30–10): canvas `#F4F1EA` / surface `#FBFAF6` / ink `#1C2320` / gold `#7A5C1E` accent, goldsoft `#B08A2E` for small labels on dark. Verified: ink/canvas 14.2:1, gold/canvas 5.51:1, white/gold 6.22:1, quiet/canvas 5.49:1.
- Typography: Fraunces (display), Source Serif 4 (body), IBM Plex Mono (labels/CTAs) via `next/font`.
- Editorial register: fine 1px borders, generous whitespace, uppercase mono kickers, asymmetric grids — no glassmorphism, no gradient washes, no generic medical-blue.

## 7. Prescribed Techniques (selected, not stacked)
- **T4** hero composition (five-part stack) — Mode 1 default.
- **T11** asymmetric image mosaic for facilities.
- Whisper reveals: ≤16px translate, 0.6s ease-out-expo, once-only; stagger limited to ≤6 children.
- `LazyMotion` strict + `MotionConfig reducedMotion="user"`; CSS scroll-behavior gated behind reduced-motion query.
- Excluded: scrub video, parallax layers, count-ups, confetti, marquee — all off-limits or unnecessary for Mode 1 healthcare.

## 8. Mandatory Footer (exact wording shipped)
> This is a <u>[Verro Studio](https://verro-canvas.lovable.app/)</u> fictional build. Any resemblance to living or dead is purely coincidental...

Link opens in new tab with `rel="noopener noreferrer"`; plus "Not a medical provider" line.

## 9. Assumptions (explicit)
- Supplied images are Unsplash stock; credited generically as "Unsplash licence" since uploader did not provide per-photo credits.
- No real endpoint exists for the form (static export) → client-side validation + honest confirmation screen.
- Department names are common, non-specific labels chosen to demonstrate directory layout, not clinical claims.
- India-market rules applied where compatible: INR-free copy, no WhatsApp widget (no fabricated destination), English-only (single-language demo assumption).

## 10. Acceptance Criteria
- [x] `next build` static export succeeds (verified this session).
- [x] slop_lint: 0 errors / 0 warnings over `app/` (verified this session).
- [x] Every manifest path matches a file in `public/assets/` (verified against `ls`).
- [x] Required footer sentence + underlined live link present (verified in source & rendered `out/index.html`).
- [x] Contrast gate passed (values above).
- [ ] Visual QA screenshots at 375/1280 px — pending environment run.
- [ ] perf_budget receipt — pending run against served export.
