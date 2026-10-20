# The Verro Brief: intake, diagnosis, decisions, approval

The brief is the build's first input and its shared memory. It forces every design decision into writing before
generation starts, which is what prevents slop. File to fill: `assets/templates/VERRO_BRIEF.md` (copy it into the
project root). An empty field is a decision delayed, not avoided.

Contents: 1 Diagnosis, 2 Intake, 3 Buyer research, 4 The eight decisions, 5 Thinking checks, 6 Approval, 7 Hygiene.

## 1. Diagnosis: find the bottleneck first

Separate three things and never blur them: diagnosis (what is actually wrong), choice (what we will do about it),
execution (how). A redesign cannot fix a business nobody can find, and SEO cannot fix a site that scares people off.

Ask the owner these, in plain words, one at a time:
- How do customers find you today, and which source brings the best customers?
- What happens to an enquiry that arrives after closing time?
- How many booked people do not show up in a normal week?
- Of your last ten customers, how many came back, and how often?
- Search "[service] [area]" on Google Maps on a phone. Where are you? What do the top three show that you do not?

Then map the symptom to the bottleneck:

| Symptom | Likely bottleneck | Response |
|---|---|---|
| Calls come but people do not turn up | No confirmation or reminder loop | Mode 3 reminders (email, optionally WhatsApp), confirmations |
| Website gets visits but no enquiries | Trust, clarity or CTA failure | Mode 1 rebuild or Mode 3 patch, one CTA, proof above the fold |
| Website gets no visits, competitors rank above | Local visibility, not design | Google Business Profile, reviews, local pSEO first. Site is second |
| Customers do not return | No retention system | Mode 3 member layer and email sequences |
| Site breaks on phones, loads slowly | Technical debt | Mode 3 responsive and speed fix, or rebuild if beyond saving |
| Owner wants a more premium customer | Positioning and perceived quality | Mode 1 polish, or Mode 2 if the product sells on desire |
| Same questions on WhatsApp all day | Information gap | FAQ, service pages, pSEO, WhatsApp quick replies |

Record: the one critical bottleneck, the evidence (what the owner said or you observed), and the assumptions you are
making, each labelled `ASSUMPTION`. Capture a **baseline** before building: current monthly enquiries, calls, Google
Business Profile calls and direction requests if visible, no-show count, repeat rate. Baselines make the later retainer
pitch honest. Targets are hypotheses, never promises to the client.

## 2. Intake: minimum facts

| Field | Needed for | If missing |
|---|---|---|
| Business name, what it does, area, languages used with customers | Everything | Ask. Do not guess the name |
| Existing site URL, hosting, domain registrar, who holds the logins | Mode choice, deploy | Ask first. This decides Mode 3 |
| Owner or practitioner full name, qualification, years in practice | Trust section | `TODO_CLIENT`. Never invent |
| Phone, WhatsApp number, address, hours, Maps link | CTAs, schema | Ask. Required for any local site |
| Services and whether prices may be shown | Services section | Default: describe services, hide prices |
| Photos and logo: who owns them, usable quality | Visual plan | If none: plan real shoot, or generated visuals with a disclosure decision (Mode 2) |
| Real reviews (text, permission) | Proof | Use Google reviews with permission. Never fabricate |
| The one action the owner wants most | Single CTA | Default for local: WhatsApp chat, with call and map as secondary |
| Registration or licence numbers (practice, RERA, FSSAI, etc.) | Compliance | Ask. Show where required |
| Competitors the owner admires or fears | Reference triage | Optional |
| Budget band and deadline | Tier choice | Ask once, quietly |

Four branches decide the visual plan (from 10k-websites): a real thing with its own photos (use them), a real business
with no usable photos (generate or shoot, and decide the AI-imagery disclosure out loud with the owner), an invented
brand (footer discloses it is fictional), or software with screenshots (screenshots ship as-is).

## 3. Buyer research

Use web search on real reviews, Google Maps reviews of competitors, forums and the owner's WhatsApp chats (with
permission). Collect the exact recurring phrases for: the pain, the outcome wanted, the objection that stops a
booking. Include Hindi and Marathi phrasing the way people write it on WhatsApp. If web access is unavailable, ask the
owner to paste five real reviews or list the questions customers ask most.

Use the findings three ways: write copy in the buyers' words; funnel the whole page to one action; include the trust
furniture that answers the real objections. Placement rule earned in a real build: when the subject is a person (owner,
doctor, chef), the hero speaks in their confident voice and the pain language lives below the fold. A complaint over
someone's face reads as someone else's complaint.

## 4. The eight decisions (each has a slop trap)

**D1 Category and trust mode.** Output: light or dark, and the buyer's anxiety level. Clinics, education, government:
light, clarity over drama. Anxious buyers get more polish budget, because polish reads as competence. Trap: defaulting
everything to near-black cinematic because it photographs well in portfolios.

**D2 One pain, one outcome, in the buyer's words.** Output: two quoted phrases and the single promise the site makes.
Trap: opening with someone else's complaint over the owner's face.

**D3 One CTA and the funnel order.** Output: the CTA verb plus channel, and the ordered sections that earn the next
scroll toward it. Trap: three competing CTAs in the hero, and a footer burying the real one.

**D4 Visual world, 60-30-10.** Output: primary 60 percent (backgrounds and surfaces), secondary 30 percent (cards, nav,
dividers), accent 10 percent (CTAs, active states, one or two emphasis moments, nowhere else). Each with a real-world
reference and exact hex. Canvas is never pure black or pure white. Sample the palette from the subject's material
world and the client's existing logo. Trap: five colours that fight, or an accent sprayed everywhere.

**D5 Type system.** Output: display face with real character (never Inter, Roboto or Arial as display), a quiet body
face, optional mono for small labels, exact weights, H1 minimum size, body line height 1.6 to 1.8, measure 65 to 70
characters. Bilingual sites: confirm Devanagari glyph coverage with real Marathi text. Trap: one family at three
weights pretending to be a system.

**D6 Motion mode and five-part hero.** Output: motion intensity for the mode, and the hero spec: outcome headline,
subheadline with one specific detail and a timeframe, one CTA with nothing competing, a labelled visual slot, one
trust signal. Trap: "City's premier X" headlines and a hero with two buttons.

**D7 Conversion furniture.** Output: four to six items from `references/design/design-psychology.md`, each with its
placement and the principle it serves. Trap: furniture stacked everywhere reads as desperate, not premium.

**D8 Signature and bans.** Output: one signature element (test: remove it, does the page change?) plus the ban list:
the AI-default looks, no two adjacent sections sharing a layout skeleton, no lorem, no em dashes, no stock words.
Trap: a signature that is just a decorative icon.

## 5. Thinking checks (run at every gate, write one line each in QA_REPORT.md)

1. **Halo check (first 50 ms).** Screenshot only the first viewport. Would a stranger trust this business in two
   seconds? If the screenshot could belong to any business, it fails.
2. **Load check (cognitive fluency).** Five seconds of fresh eyes, then answer: what does this business do, who is it
   for, what do I do next. Any hesitation means remove something. One primary goal per section.
3. **Delight check (peak-end).** Name three micro-moments a visitor would remember (a hover, a load transition, a
   reveal). Zero means add one per section at whisper level. Check the ending: the last screen resolves into an action.
4. **Truth check.** Every number, review and claim traces to the truth ledger. Untraceable means off the page.
5. **Coherence check.** Read every visible word end to end. One brand name throughout. No orphaned copy, logo, testimonial
   or phone number from a reference or template. A real build shipped with three companies' copy stitched into one clean
   page, because layout hides what reading catches.

## 6. Approval

Present the finished brief once, in plain words: the bottleneck, the mode and why, the one CTA, the direction in one
paragraph with a real-world reference, the page plan, the references used, what you need from the client, and what each
recurring cost is. Get one approval. After approval, changes to D1 to D8 go through the owner again.

If the owner says "use your judgment", write the brief anyway and mark the top `Self-authored under delegation`,
distinguishing evidence from assumptions. Do not invent client quotes. If the owner is unreachable and the run is
autonomous, mark `Self-authored, not interviewed` and say so in the final report.

## 7. Hygiene

- Copy written into the brief ships verbatim. The build wires it in and never paraphrases it.
- Keep the brief under about 250 lines. A brief nobody reads is not a gate.
- When a build contradicts the brief, fix the build, or update the brief with the owner's approval. Never leave them
  disagreeing.
