# Retention features: authentication, automated emails, programmatic SEO

The owner's three premium builds, kept as starter prompts, with the hardening they lacked. Each feature below has:
outcome and metric, the owner's starter prompt (generalised), hardening requirements, implementation notes, tests,
failure modes. Vendor APIs change quickly: read the vendor's current quickstart for the installed version before writing
integration code. Do not code from memory.

Contents: 1 Stack and cost, 2 Data model, 3 Authentication, 4 Automated emails, 5 Programmatic SEO, 6 Admin view and reports,
7 Environment and secrets.

## 1. Stack and cost

| Layer | Default | Alternatives | Notes |
|---|---|---|---|
| Framework | Next.js (App Router, TypeScript) | | Server routes for webhooks and cron |
| Auth | Clerk (`@clerk/nextjs`) | Supabase Auth (if Supabase is the database), Auth.js or Better Auth (no vendor cost) | Clerk's own article says the free Hobby plan covers 50,000 monthly retained users since 5 Feb 2026. Older sources say 10,000. Check clerk.com/pricing at proposal time |
| Database | Postgres (Supabase or Neon) with Drizzle | Cloudflare D1 on Cloudflare hosting | Region near India where offered. Backups on |
| Email | Resend with React Email | Brevo, Amazon SES | Free plan reported as 3,000 emails a month, 100 a day, one verified domain. Reminder batches can exceed 100 a day, so budget Pro or stagger |
| Scheduler | The host's cron | GitHub Actions schedule hitting a secured endpoint, Supabase pg_cron | Match to the host chosen in `deploy-handover.md` |
| Content for pSEO | Files in the repo (JSON or MDX) | A CMS | Human-reviewed |
Accounts live in the client's name wherever possible (`agency-rails.md`). State recurring costs in the proposal.

## 2. Data model (starter, adapt names: sessions can be classes, appointments or slots)

```
members     id, clerk_user_id (unique), name, email (unique), phone, status ('trial'|'active'|'paused'|'expired'),
            plan_id, joined_at, consent_privacy_at, consent_marketing_at, unsubscribed_at,
            welcome_sent_at, last_reengage_at
plans       id, name, price_inr, duration_days
sessions    id, title, starts_at (timestamptz), capacity, location
bookings    id, member_id, session_id, status ('booked'|'cancelled'|'attended'|'no_show'), created_at, reminder_sent_at
email_log   id, member_id, kind, provider_id, status, created_at
```
Store times in UTC, compute windows in Asia/Kolkata. Unique constraints and `*_sent_at` columns make every job idempotent.
Foreign keys. Indexes on `bookings(session_id)`, `sessions(starts_at)`, `members(clerk_user_id)`. Row-level security if
the database offers it.

## 3. Authentication

**Outcome:** members have accounts and a reason to log in. The owner sees who is active and who is drifting.
**Metric:** active members, members quiet for 14 days.

Owner's starter prompt (generalised):
```
Add authentication to this Next.js app using Clerk.
REQUIREMENTS:
Sign up and sign in flow
Protected /dashboard route for logged-in members
Dashboard shows: member name, membership status, and a placeholder for "[training history | appointment history | batch schedule]"
Use Clerk's Next.js SDK
Redirect unauthenticated users to sign-in
Keep the existing design system: [the client's design system from the brief].
```
The original ends "Dark theme, minimal". That was the demo gym's choice. Use the client's own system, and never dark mode for
healthcare, education or government.

Hardening requirements:
1. Read Clerk's current Next.js quickstart for the installed Next.js version. The middleware file name and whether `auth()` is
   async have changed across versions. Follow the quickstart exactly.
2. Protect `/dashboard(.*)` and `/admin(.*)` in middleware, and also check authorisation inside server components and route
   handlers. Middleware is not the only guard.
3. Membership status and role are server-owned: a `members` row keyed by Clerk `userId`, or server-set metadata. Never trust
   client state.
4. Every query filters by the `userId` taken from the server session. Test with two accounts.
5. Owner admin: a role checked server-side (organisation role or server-set metadata). The `/admin` view lists active
   members, drifting members (no booking in 14 days), upcoming sessions and reminder status, with a CSV export.
6. Consent at sign-up: privacy notice link, unticked marketing checkbox. Collect only name, email and phone if truly needed.
7. Development keys show a development banner and are not for production. Create the production instance, add the DNS records
   Clerk asks for on the client's domain, and configure the client's own OAuth credentials for any social sign-in. Check
   Clerk's docs for the current requirements.
8. Phone OTP in India involves SMS costs and regulatory sender registration. Prefer email or Google sign-in unless the owner
   pays for and wants OTP. Verify before promising.
9. The dashboard shows true data and honest empty states ("No bookings yet. Book your first session").
10. Style Clerk's components to the client's tokens, not Clerk's defaults.

Tests: forged or logged-out request to `/dashboard` redirects. Member A cannot load member B's data. A non-admin hitting
`/admin` gets 403. Production keys in production, dev keys nowhere near it.
Failure modes: dashboard that is a placeholder forever (no data model), public admin route, dev keys in prod.

## 4. Automated emails

**Outcome:** fewer no-shows and silent drop-offs, no manual chasing.
**Metric:** no-show rate, bookings from re-engagement.

Owner's starter prompt (generalised):
```
Set up transactional emails using Resend.
EMAILS TO CREATE:
1. Welcome email sent when a new user signs up via Clerk webhook
2. [Class | Appointment] reminder sent 24 hours before a booking (assume we have a bookings table)
3. Re-engagement email sent if the user has not booked in 14 days
Use React Email for templates. Keep them minimal, [client] branding, clear CTA.
Set up a /api/webhooks/clerk route to handle user.created events.
Set up a cron job (or outline how to trigger) for the reminder and re-engagement emails.
```
Hardening requirements:
1. **Domain.** Verify the client's domain with the provider (SPF and DKIM, add DMARC). Send from `hello@clientdomain.in`,
   reply-to the owner. Start DNS early: verification can take hours. Never launch on a shared test sender.
2. **Webhook.** `/api/webhooks/clerk` reads the raw body and verifies the signature with the method Clerk documents (Svix-
   based). Invalid signature returns 401 or 400 and does nothing else. Handle `user.created`, and sync on `user.updated` and
   delete on `user.deleted`. Insert the member with a unique constraint. Send the welcome only if `welcome_sent_at` is null,
   then set it. Respond fast. It must be safe to receive the same event twice.
3. **Cron endpoints** `/api/cron/reminders` (hourly) and `/api/cron/reengage` (daily) require `Authorization: Bearer
   $CRON_SECRET`. Open endpoints get abused. Scheduler by host: Vercel Cron, Cloudflare Cron Triggers, a GitHub Actions
   schedule, or Supabase pg_cron. Check the plan's schedule limits.
4. **Reminder rule.** Bookings with `starts_at` between now plus 23 h and now plus 25 h, status booked, `reminder_sent_at`
   null. Send, then set `reminder_sent_at` and write `email_log`. If sending fails, leave it null and log. Use the provider's
   idempotency key if offered, and always your own column. A cancelled booking never gets a reminder.
5. **Re-engagement rule.** Members with a last booking older than 14 days, no future booking, status active, not unsubscribed,
   and `last_reengage_at` null or older than 30 days. At most two messages in a sequence. Stop when they book.
6. **Transactional versus marketing.** Reminders are service messages. Re-engagement is marketing: needs consent and an
   unsubscribe. Include a visible link and the one-click `List-Unsubscribe` headers. Honour it immediately. Marketing sends
   skip unsubscribed and paused members.
7. **Quotas.** Compute the worst-day volume (every member with a morning class). Compare with the provider's daily cap.
   Stagger or buy the plan. Tell the owner.
8. **Templates.** React Email, plain text alternative, one CTA, the client's tokens (never Verro's), real contact details, copy
   passing the copy gate, honest subject lines, mobile first. Preview with the React Email dev server, then send a test to
   the owner. No images carrying meaning without alt text.
9. **Bounces and complaints.** Subscribe to the provider's webhooks. Suppress bounced addresses, treat complaints as
   unsubscribes. Alert the owner on repeated failures.
10. **Channel judgment.** In this market WhatsApp is often the higher-attention channel. Email sequences are the default
    deliverable because they are cheap and reliable. Offer a WhatsApp click-to-chat link inside every email, and offer
    WhatsApp Business template messaging as a paid upgrade after checking Meta's current policies and pricing.
11. **Log.** `email_log` records every send (kind, provider id, status). It powers the monthly report.

Tests: send the same webhook twice, one welcome. Run the cron twice in a row, zero duplicates. Forged webhook returns 401.
Unauthenticated cron call returns 401. Unsubscribed member receives no marketing. IST boundaries correct around midnight.
Failure modes: duplicates, open cron, daily cap hit and silently dropped, no unsubscribe, sending from an unverified domain.

## 5. Programmatic SEO

**Outcome:** found by people searching for what the business does, without ads.
**Metric:** impressions and clicks per page in Search Console, organic enquiries. Expect weeks to months. No guarantees.

Owner's starter prompt (generalised, with the typo in the route fixed):
```
Create a programmatic SEO system for this [business] website.
GOAL: Generate pages for "[topic area, e.g. Hyrox training: nutrition, plans, race-day guides]" for people to see, read and learn.
REQUIREMENTS:
Dynamic route: /[topic]/[slug]
Each page has: H1 with the topic name, an intro paragraph, a [class schedule | booking] CTA, a testimonials section, FAQ schema
Generate unique meta titles and descriptions per topic
Add JSON-LD schema for LocalBusiness
Create a sitemap.xml that includes all topic pages
Also show me how to submit this sitemap to Google Search Console.
```
Hardening requirements (this is where most pSEO fails):
1. **Quality policy.** Google treats mass-produced pages with little original value (scaled content abuse) and near-identical
   location or keyword swaps (doorway pages) as spam. A page must answer the query better than a stub. Start with 10 to 30
   pages that each have unique, useful substance, not hundreds.
2. **Real value per page:** original explanation from the owner's expertise, a table, a checklist, a local detail (landmarks,
   timings, real prices), real photos, real questions customers ask. If you cannot say what this page offers that the others do
   not, do not publish it.
3. **Expert review for health, money and legal topics.** A named reviewer and a `lastReviewed` date on the page. No cure claims.
   Unreviewed generated medical advice is never published.
4. **Content as data:** `content/topics/<slug>.json` with fields in `assets/templates/topic.example.json` (slug, h1, metaTitle,
   metaDescription, intro, sections, faq, related, cta, reviewer, lastReviewed, sources, localAngle).
5. **Next.js:** `generateStaticParams`, `generateMetadata` (title at most about 60 characters, description about 155), canonical,
   `app/sitemap.ts`, `app/robots.ts`, JSON-LD via `assets/components/schema.tsx`, breadcrumbs, a hub page linking to topics,
   related-topic links. Static pages.
6. **Locations:** only for places the business really serves, each page with its own real content. No templated area pages.
7. **FAQ markup:** Google limited FAQ rich results in 2023, so keep FAQ as useful content and never promise rich results.
8. **Submit to Search Console:** add the property (Domain verification by DNS TXT, or URL-prefix), submit `/sitemap.xml`, use URL
   Inspection on the home page and one topic page, watch the Pages report. The Indexing API is officially for job postings and
   livestream events only, so do not use it for ordinary pages. IndexNow notifies Bing and others, not Google.
9. **Measure and prune:** after a few weeks, pages that never get indexed or get no impressions are rewritten or removed.
10. **Local foundation first:** Google Business Profile, NAP consistency, reviews. For most local businesses that moves more
    than topic pages do.

Tests: view source of three pages for unique title, description, H1, canonical. Sitemap lists every published page and no draft.
Random sample of five pages passes the "would this help a real customer" read. Reviewer fields present on health pages.
Failure modes: thin template pages, duplicates, unreviewed medical advice, a sitemap with drafts, noindex left on.

## 6. Admin view and reports

Minimum owner value, built before polish: counts of active, trial, paused and expired members, a "drifting" list (no booking in
14 days) with last booking date, tomorrow's sessions with who is booked and who was reminded, emails sent this month, bounces.
Monthly report to the owner (one page): members, bookings, reminders sent, no-show rate against the baseline, re-engagement
bookings, top Search Console queries. Generate from the database, not by hand.

## 7. Environment and secrets

`.env.example` (names only, template in `assets/templates/.env.example`): `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`,
`CLERK_WEBHOOK_SIGNING_SECRET`, `DATABASE_URL`, `RESEND_API_KEY`, `EMAIL_FROM`, `CRON_SECRET`, `NEXT_PUBLIC_SITE_URL`. Real values live
in the host's environment settings and the client's password manager, never in chat or the repo. Rotate keys at handover.
