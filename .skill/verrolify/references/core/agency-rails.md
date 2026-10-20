# Agency rails (never waived)

How Verro Studio works with a client, independent of mode. Prices are owner-maintained: if a cell is blank, do not
quote a number. Never improvise a price.

## The three offers map to the three modes

| Offer | Mode | What the client gets | Price (owner fills) | Monthly retainer (owner fills) |
|---|---|---|---|---|
| 1 | Trust landing | A fast, clear, mobile-first site that makes the business look as competent as it is, one CTA, local SEO basics | | |
| 2 | Scroll-animated | Everything in offer 1 plus a scroll-driven hero and story for a product that sells on desire | | |
| 3 | Integrate and retain | Fix or rebuild around the existing site, plus login, automated emails, programmatic SEO where they move a metric | | |

Mode 3's retention features are priced as a separate line from the site work, because they carry recurring third-party
costs and ongoing operation.

## Rails

1. **Deposit.** 50 percent upfront, stated in the first price message, collected before work starts.
2. **Scope is the approved brief.** New requests after approval are a new line item, in writing, in one plain sentence.
3. **Revision rounds in order:** structure (right sections?), then polish (alignment, imagery, copy), then motion
   (making it feel alive). Apply each round in one pass and re-verify live. Number of rounds is set in the proposal.
4. **Clients before content.** Site, demo, outreach, then the channel. No marketing content before a booked call.
5. **Outreach.** WhatsApp in Hindi or Marathi, one designed artifact (a live link or one-page deck), never a wall of text.
6. **Speed receipts are sales assets.** Measured load numbers answer "pretty but slow" before it is asked. For anxious
   categories (clinics) say plainly that polish is the trust signal.
7. **Ownership.** Domain and hosting account in the client's name. Third-party accounts (email provider, auth, database)
   in the client's name wherever possible so they own their data and costs. Code repository lives in Verro's
   organisation and transfers on request after final payment. State this in the proposal.
8. **No guarantees of rankings, traffic or revenue.** Targets are hypotheses. Baselines are captured before the build so
   results can be reported honestly.
9. **Reference and licence hygiene.** Anything from a paid template or library is licensed to the right party and
   recorded in `REFERENCE_LOG.md`. Verro never ships a client site built on a copied template.
10. **The standing line.** After launch, say once: your next change is one plain sentence away.

## Recurring costs to disclose before building

Vendors change plans often. Re-check the vendor page at proposal time and write the date. Figures below are what was
found in October 2026 and are examples to verify, not quotes.

| Item | Needed for | What was found (verify) |
|---|---|---|
| Domain | All | Yearly renewal, client-owned |
| Static hosting | Modes 1, 2 | Cloudflare Pages and Netlify have free plans. Confirm commercial use is allowed on the plan |
| Server hosting | Mode 3 | Vercel Hobby is limited to personal, non-commercial use per its terms, so client work needs a paid plan or another host. Cloudflare Workers via the OpenNext adapter is an option. Check each |
| Auth (Clerk) | Mode 3 | Clerk's own article says the free Hobby plan covers 50,000 monthly retained users since 5 Feb 2026. Older sources still say 10,000 |
| Email (Resend) | Mode 3 | Free plan reported as 3,000 emails a month with a 100 a day cap and one verified domain. Pro reported at 20 USD a month for 50,000. A 24-hour reminder batch can hit the daily cap |
| Database | Mode 3 | Free tiers exist on Supabase, Neon, Cloudflare D1. Check limits and pause rules |
| Generated assets | Mode 2 | One-time credits (images, video). Preflight the price and say the total before spending |
| Analytics | All | Cloudflare Web Analytics, Plausible, Umami. Pick one that avoids a consent banner burden |

## The retainer

Pitch it on the outcome metric the brief named (no-show rate, enquiries per month, repeat visits), not on "SEO" or "hosting".
Typical contents: hosting and monitoring, a set number of hours of changes per month, Google Business Profile upkeep,
a one-page monthly report (enquiries, calls, no-shows, repeat rate against the baseline), and a named channel for
questions. The first 30 days after launch include free email support. Say so in the proposal.

Honest retention pitches (Mode 3): "When someone signs up they get a welcome. Before class they get a reminder. If they
go quiet, the system reaches out." Do not call it a guarantee. Do not claim "free traffic forever".
