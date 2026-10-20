# Mode 3: Integrate and retain

For businesses that already have a site that needs rescuing, or whose revenue depends on people coming back: gyms,
studios, bookstores, therapists, coaching batches, tuition. Two jobs: (1) repair or replace the front end, (2) add a
retention layer (login, automated emails, programmatic SEO) that moves a number the owner counts. If the client has no
site, build it with Mode 1 first, then add the layer here.

Contents: 1 Outcomes, 2 Audit the existing site, 3 Choose the path, 4 Responsive and speed repair, 5 Retention layer
architecture, 6 Feature order and fit, 7 Data and privacy, 8 Operating it, 9 Pitch language, 10 Build order, 11 Gates,
12 Failure modes.

## 1. Outcomes (name the metric before the feature)

| Feature | The outcome it must move | Metric |
|---|---|---|
| Authentication plus dashboard | The owner can see who is active and who is drifting. Members have a reason to return | Active members, members with no visit in 14 days |
| Automated emails | Fewer no-shows, fewer silent drop-offs, no manual WhatsApp chasing | No-show rate, re-engagement bookings |
| Programmatic SEO | Found by people searching for what the business does, without ads | Organic enquiries, Search Console clicks |
| Responsive and speed repair | The site works on the phones customers use | Mobile bounce, enquiries from mobile |
A feature with no metric does not get built. Login with no reason to log in is clutter.

## 2. Audit the existing site

1. **Inventory:** platform (WordPress, Wix, Shopify, Blogger, hand-coded, a hosting builder), host, domain registrar, who
   holds logins, analytics, forms, widgets, who edits content, how people find the business today.
2. **Backup first.** Export everything you can (files, database, theme, media). Wix and similar cannot be fully exported:
   record that. Never change anything before a backup exists.
3. **Baseline:** screenshots at 375, 768 and 1280, a mobile speed run if a tool exists, page weight, console errors,
   broken links, Search Console indexing and top queries, Google Business Profile calls and direction requests, the
   owner's own count of enquiries and no-shows.
4. **Score ten checks, 0 to 2 each:** mobile usability, speed, five-second clarity, one clear CTA, trust content, local
   SEO basics (NAP, schema, profile link), HTTPS and no mixed content, content freshness, accessibility basics, can the
   owner edit it.
5. **URL map:** the URLs that rank or are linked to. Anything that changes gets a 301 redirect.
Score 14 or more of 20: patch. 8 to 13: patch plus targeted rebuild. Under 8: rebuild.

## 3. Choose the path

| Path | When | What it means |
|---|---|---|
| **1. Patch in place** | Platform is editable and mostly sound | Fix responsiveness, speed, meta and schema, add the WhatsApp bar. Retention layer goes on a subdomain |
| **2. Subdomain app beside the old site** (lowest risk, default) | Any platform, especially Wix, Shopify, closed builders | Build the retention layer as its own Next.js app at `members.clientdomain.in` (or `app.`). The old site links to it. No change to the old site's core |
| **3. Rebuild** | Beyond saving, or the owner wants a new face | Mode 1 or 2 front end plus the layer in one Next.js app. Redirect map ships on day one |
Build, buy or configure: check what the platform already does before writing code. Shopify has customer accounts and
email, WordPress has membership and booking plugins. Use the platform's feature when it meets the metric. Build custom only
where it does not (class capacity, attendance, reminders tied to bookings). Say the reason in the brief.

## 4. Responsive and speed repair (Path 1, and any inherited code)

Capture the baseline first, then work through this list, re-testing after each batch:

| Symptom | Usual cause | Fix |
|---|---|---|
| Page looks zoomed out on a phone | Missing viewport meta | `<meta name="viewport" content="width=device-width, initial-scale=1">`. Never disable zoom |
| Sideways scrolling | Fixed-width elements, `100vw` plus scrollbar, wide tables or iframes | `max-width:100%`, `overflow-x:auto` wrappers for tables, responsive embeds |
| Text tiny or huge | Pixel-fixed type | Fluid scale with `clamp()`, 16px minimum body |
| Taps hit the wrong thing | Targets under 44px, tight spacing | 44px minimum, spacing between targets |
| Menu does not open | JavaScript error or desktop-only nav | Fix the error. Replace with an accessible disclosure menu |
| Images slow and blurry | Uncompressed originals | WebP or AVIF, explicit width and height, `loading="lazy"` below the fold, hero preloaded |
| Slow first paint | Render-blocking scripts, unused plugin JS, many fonts | Defer scripts, remove unused plugins, limit fonts, `font-display: swap` |
| Forms awkward on phones | Wrong input types | `type="tel"`, `inputmode`, `autocomplete`, visible labels |
Platform notes: on WordPress use a child theme or the customiser's additional CSS, never edit the parent theme. In page
builders fix the mobile view separately. On closed builders you may only be able to patch via embedded code: if so, move to
Path 2 or 3. Keep a before-and-after sheet (screenshots plus numbers). It is the proof for the pitch.

## 5. Retention layer architecture

```
Visitor -> public site (Mode 1/2 or patched old site) -> /dashboard on members app
                                                            |
 Auth (Clerk) ---- webhook ---> API route ---> Database (members, sessions, bookings, email_log)
                                                   ^                  |
                    Scheduler (cron) --------------+                  +--> Email provider (Resend) --> member inbox
 Owner admin (role-checked) reads the same database: who is active, who is drifting, who was reminded
 Content (topic files) --> static pages + sitemap --> Search Console
```
Authentication alone is not a retention system. The data model is the core: members, plans, sessions or appointments,
bookings, attendance, email log. Spec, schema and hardening: `references/retention/retention-features.md`.

## 6. Feature order and fit

Build in this order. Verify each before the next.
1. Data model and consent.
2. Auth and the member dashboard, plus a role-checked owner view (`/admin`) with the active and drifting lists.
3. Welcome email through the auth webhook.
4. Appointment or class reminder (24 hours before).
5. Re-engagement (14 days quiet, capped).
6. Programmatic pages, human-reviewed.
7. Monthly report to the owner.

| Business | Build | Skip or reshape |
|---|---|---|
| Gym, studio | All of it: dashboard, bookings, reminders, re-engagement, pSEO (training plans, nutrition) | |
| Bookstore | Accounts only if the platform lacks them. Back-in-stock and new-arrival emails. pSEO for genres and school booklists with real value | Class reminders |
| Therapist | Booking confirmation and reminder with minimal detail. Reviewed educational pages | No member dashboard of clinical history. No marketing re-engagement to former clients. No free-text health data |
| Tuition, coaching | Batch schedule, fee reminders (transactional), parent updates | Anything that profiles minors needs parental consent and legal review (see section 7) |
Do not invent a feature because the video had one.

## 7. Data and privacy

- Collect the minimum. Every field has a stated purpose. Consent is captured, unticked by default, at sign-up, with a link
  to a real privacy page. Marketing consent is separate from service messages.
- India's Digital Personal Data Protection Act, 2023 applies to personal data of customers. Check the current rules and
  timelines before launch and write a plain privacy notice. Children's data (tuition, coaching) carries special obligations
  including parental consent: take legal advice before collecting it. This is a flag, not legal advice.
- Health data (therapists, clinics, gyms with medical questions): do not store clinical notes or free-text health details
  on the site. Booking needs a name, a contact and a time.
- Access control on every query: derive the member from the server session, never from a request parameter. Test with two
  accounts. Admin routes check a server-side role.
- Region: pick a database region close to India where the provider offers one. Backups on. No personal data in logs.
- Processors list (who stores what) goes in `HANDOVER.md`. Provide a deletion and export path on request.

## 8. Operating it

A retention layer is a small operation, not a deliverable. Plan: uptime check on the members app and webhook endpoint,
delivery and bounce monitoring in the email provider, an alert path to the owner and to Verro, cost watch against free-tier
ceilings, a runbook (rotate keys, renew domain, handle a bounce wave), a monthly report against the baseline, and the support
window. This is why it is a retainer, not a one-off.

## 9. Pitch language (honest)

"Your members get accounts. They see their bookings and history. You see who is active and who is drifting. When someone
signs up they get a welcome. Before class they get a reminder. If they go quiet, the system reaches out. You stop chasing
people on WhatsApp." For pSEO: "We build pages for what people search for, so you appear when they look. It takes weeks to
months and we measure it." No guarantees of traffic or revenue. Never "free traffic forever".

## 10. Build order

1. Audit, baseline, URL map, path decision, brief (section 2 and 3, `brief-template.md`). Approval gate.
2. Backup and a staging copy. Never edit production first.
3. Front-end work: patch or rebuild (sections 4 or Mode 1).
4. Provision accounts in the client's name: auth, database, email, scheduler. DNS records with the owner present.
5. Build features in the order of section 6, with the tests in `qa-gates.md` G10 after each.
6. Content and pSEO with the owner's review of anything health or money related.
7. Gates, deploy, redirects, Search Console, handover, first monthly report scheduled.

## 11. Gates

`references/core/qa-gates.md` in full, with G10 mandatory. Plus: redirect map verified (old URLs return 301 to the right
new URL), nothing from the old site lost without the owner's say.

## 12. Failure modes

- Building the three features because the demo had them, with no metric.
- Auth in place but no database model, so the dashboard is a placeholder forever.
- Dev auth keys left in production, shared test email domain in use.
- Reminders sent twice, or on a forged webhook. Cron endpoint left open.
- Daily email cap hit by a morning batch and reminders silently dropped.
- Thousands of near-duplicate pages published at once.
- Old URLs broken, old rankings lost.
- Client domain and email accounts left in Verro's name.
