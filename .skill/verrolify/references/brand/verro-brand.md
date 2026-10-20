# Verro Studio brand (Verro-owned properties only)

Source: the owner's Brand Mark Sheet (Plate III, MMXXVI). This file records it so Verro's own materials stay consistent.

## Governance (read first)

Applies to: Verro's own website, proposals, decks, invoices, handover documents, outreach artifacts, social posts.
Never applies to a client build. Every client gets a palette, type pairing and signature sampled from their own business.
A client site may carry a small "Built by Verro Studio" credit in the footer, set in the client's own tokens, only if the
owner agrees. Using the Verro look on a client is the fastest way to make twenty sites look like one template.

## Colour

| Token | Hex | Role |
|---|---|---|
| Ink | `#111111` | The darkened study where the work happens. Dark surfaces, text on bone |
| Bone | `#F6F1E9` | Aged paper, candlelight on vellum, never pure white. Light surfaces, text on ink |
| Oxblood | `#6D001A` | The single drop of colour, used like a wax seal: sparing, deliberate, final. CTAs and the mark's short arm |
Derived values used on the sheet: bone at 55 percent (`rgba(246,241,233,0.55)`) for secondary text on ink, 32 percent for
faint text, 12 percent for hairlines. On dark surfaces the oxblood arm glows faintly against ink.
Follow 60-30-10: ink or bone as the 60 percent surface, the other as the 30 percent text and structure, oxblood under 10.
Check contrast with `scripts/contrast.py`: oxblood text on ink is low contrast, so oxblood stays for fills and the mark,
not for small text on dark.

## Type

| Role | Face | Use |
|---|---|---|
| Heading | Dela Gothic One | H1 to H3, display, hero statements |
| Accent | Libre Caslon Condensed, italic only | Taglines, pull quotes, captions |
| Primary text | Lexend | Body copy, paragraphs, long-form reading |
| Secondary text | DM Sans | UI, buttons, meta, labels, footnotes |
| Logotype | Long Shot | The logotype alone, beside the V mark |
**Pairing rule (verbatim in spirit):** one voice per element type, never mixed within it. Headings are always Dela Gothic One.
Body is always Lexend. UI and meta are always DM Sans. Libre Caslon Condensed appears only as an italic accent, the wax seal of
the type system. If a page feels busy, remove accent fonts first, never the body.
Fallback stacks from the sheet: heading `"Dela Gothic One", "Libre Caslon Condensed", Georgia, serif`; primary
`"Lexend", system-ui, sans-serif`; secondary `"DM Sans", system-ui, sans-serif`.

Licence flags (verify before shipping): Dela Gothic One, Libre Caslon Condensed, Lexend and DM Sans are Google Fonts, normally
under the SIL Open Font Licence. Long Shot is referenced on the sheet only as a locally installed face and is not loaded from the
web. Confirm its licence covers commercial and web use before using it, and ship the logotype as outlined artwork rather than
live text.

## The mark

A steep, angular V: two chisels meeting at a point. The short arm is oxblood (the drop, the wax seal, the hand that signs). The
long arm is bone (the built structure, the page, the work that stands), with a small base. Files: `assets/brand/verro-mark-on-dark.svg`
(taken from the sheet) and `assets/brand/verro-mark-on-light.svg` (derived: bone parts replaced by ink for light surfaces; confirm
with the owner). Keep clear space of at least the width of the short arm on all sides. Do not recolour the oxblood arm, outline,
rotate, add effects or place on busy imagery.

## Where Verro's brand shows up in the workflow

- The "Built by Verro Studio" credit, if agreed.
- `HANDOVER.md`, proposals and speed-receipt one-pagers (set in Lexend and DM Sans, headings in Dela Gothic One).
- The cover of `QA_REPORT.md` exports.

## Note on defaults

Bone, a serif accent and a warm tone sit close to the "cream and terracotta" cluster that AI-generated sites default to
(`references/design/anti-slop-design.md`). It works for Verro because the heavy Dela Gothic One voice, the oxblood seal and the
mark make it specific. Do not copy this recipe to clients.
