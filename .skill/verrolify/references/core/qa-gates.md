# QA gates (unified)

Run in order. Save evidence for each gate into `QA_REPORT.md` (template in `assets/templates/`). A gate is passed by
evidence, never by assertion. When a check could not run, write `UNVERIFIED: <why>`. Fix what you find yourself.

Contents: G0 brief, G1 truth, G2 copy, G3 assets, G4 visual, G5 motion, G6 accessibility, G7 performance, G8 SEO and
local, G9 function, G10 retention (Mode 3), G11 references, G12 fresh eyes, then the live gates.

## G0 Brief gate
`VERRO_BRIEF.md` approved, sections 0 to 9 filled, copy verbatim. If the build contradicts the brief, fix one of them
with the owner's approval.

## G1 Truth gate
Every fact on the page appears in the truth ledger. `grep -R "TODO_CLIENT" .` returns nothing outside the brief.
No invented counts, reviews, awards, doctor names, prices. Testimonials are real, with permission. Generated people
are never shown as staff, doctors or customers. Health claims follow `references/market/healthcare-vertical.md`.
Real-estate imagery is labelled as artist's impression where it is generated.

## G2 Copy gate
```bash
python3 <skill-dir>/scripts/slop_lint.py <project-dir>
```
Zero hits: em dashes, banned words, lorem, `TODO_CLIENT`, placeholder strings, "it's not just X, it's Y", scroll cues,
section counters, `transition: all`, gradient text, hotlinked random-image services. Then sweep body copy by hand for
the quieter tells listed in `references/design/copy-no-slop.md`. Deliberate brand devices written in the brief
(a designed triplet, a planned staccato punch) are craft and stay. The test is intent.

## G3 Asset gate
```bash
python3 <skill-dir>/scripts/verify_assets.py <project-dir>
```
Every required asset exists, is non-trivial, decodes, and is referenced by the code. Generated rasters have real alpha
where compositing needs it (inspect the alpha channel; a checkerboard or white box is not transparency). Inspect each
generated image yourself: trademarks, broken anatomy, text artefacts, brand-coherence against the client's signature
details. Raw and review files stay out of the deploy folder.

## G4 Visual gate
Screenshots at 375x812, 768x1024, 1280x800 and 1440x900, first viewport and full page, plus one frame every viewport
height of scroll. Tools: `node <skill-dir>/scripts/shoot_pages.mjs --url <url> --out lab/shots --steps` (generic pages; needs `npm i -D
playwright-core` and an installed Chrome, run it against the built site served locally or the live URL) and
`kits/scrollcraft/scripts/shoot.mjs` (scroll-scrub pages; it uses installed Chrome because bundled Chromium lacks the
h264 decoder and would pass against posters). Look at the images, do not just generate them. Then:
- Halo check on the first viewport alone. Squint test: blur it, you must still name primary, secondary and groups.
- No horizontal scroll at any width. Letter tails (g, y, p) not clipped in masked or clipped text.
- Parallel elements equal: a step without an image, a card styled differently from its siblings, reads as a hole.
- The fresh-eyes pass last (G12).

## G5 Motion gate
- Reduced motion on: final states visible, no pinned dead scroll, scroll-linked effects off, no video request made.
  Flip the preference while the page is open too, not just before load.
- The LCP element (usually the hero headline or image) is never faded in from opacity 0. Animate transform at most.
- Nothing animates `width`, `height`, `top`, `left`, or uses `transition: all`. Transform and opacity only.
- Throttle CPU 4x in DevTools or the harness and scroll: no sustained jank in the hero.
- Scrub pages: flick test, worst-frame legibility, static-hero gates, complete without the video
  (`references/scroll/scrub-pipeline.md` self-testing checklist, items 1 to 12).

## G6 Accessibility gate
Contrast measured, not guessed: 4.5:1 body, 3:1 large text and interface borders. One `<h1>`, real heading order,
landmarks (`nav`, `main`, `footer`) and a skip link. Visible `:focus-visible`. Touch targets at least 44px on coarse
pointers. Every image has meaningful `alt` or `alt=""` when decorative. Form fields have visible labels. The viewport
meta must not disable zoom (`user-scalable=no` and `maximum-scale=1` are failures, even if a reference does it).
Decorative video is `aria-hidden` and out of tab order. Keyboard path through nav, CTA and form works.

## G7 Performance gate
```bash
python3 <skill-dir>/scripts/perf_budget.py <build-dir> --mode 1
```
Budgets and the reasoning are in the script header. Also: images in WebP or AVIF with explicit width and height, hero
image preloaded, fonts limited to used weights with `display=swap`, no layout shift from late fonts or images. If
Lighthouse or equivalent is available, record mobile LCP, CLS and INP. Test on a real mid-range Android over a real
connection before delivery. A headless pass does not cover a real phone's decoder, autoplay policy, Low Power Mode or
touch scrolling.

## G8 SEO and local gate
Unique `<title>` and meta description per page, canonical URL, Open Graph with absolute URLs patched at deploy,
`LocalBusiness` (or the specific subtype) JSON-LD with name, address, phone, hours, geo, sameAs, `sitemap.xml`,
`robots.txt`, one `<h1>`, descriptive link text. NAP (name, address, phone) identical on the site, schema and Google
Business Profile. Google Business Profile claimed and linked, Maps link works. Do not promise rich results from FAQ
markup.

## G9 Function gate
Click every link, button and CTA. The WhatsApp deep link opens a chat with the prefilled message on a phone. The call
link dials. Forms submit and the success state tells the truth about where the message goes. 404 page exists and helps.
Check the browser console at desktop and phone sizes: zero errors.

## G10 Retention gate (Mode 3 only)
- Webhook endpoints verify signatures. A forged request gets 401.
- Idempotency: replay the same webhook and the same cron run twice. No duplicate email, no duplicate record.
- Cron endpoints require a secret. Unauthenticated call gets 401.
- Member A cannot read member B's data (test with two accounts). Admin routes check a server-side role.
- Consent captured at signup. Unsubscribe works with one click. Marketing sends skip unsubscribed members.
- Quotas respected (email provider daily caps). Timezone logic tested in IST.
- Sensitive data minimised. No clinical notes or free-text health data stored on the site.

## G11 Reference gate
`REFERENCE_LOG.md` complete for every reference: URL, what principle was taken, what changed, licence status. Distance
check passed (see `reference-sites.md`). No copied copy, imagery, logos or brand names. No paid template code shipped
without a recorded licence.

## G12 Fresh-eyes pass (last)
Put the checklist down. Look as a first-time visitor with zero context. Does every element have its place? Does any
stretch read as filler? Does it read as made for this one business? Fix what the fresh eye catches before the owner
sees it. If a second agent or reviewer exists, aim them at the finished build too.

## Live gates (after deploy)
HTTPS 200 on every route. Assets serve. Console clean on the live URL. Hard refresh shows the new version. Measured
speed receipts recorded (`scripts/speed_receipts.py <url>`). Owner tests on desktop and on their own phone on a real
network. For a brand-new domain, a security warning in the first minutes is the certificate still issuing. Wait and
re-check before declaring done.
