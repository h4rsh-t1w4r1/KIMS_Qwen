# Local market: India (Vasai, Nalasopara, Mumbai, Pune and similar)

Context the skill must carry so builds fit where the customers actually are. All legal and platform items are flags to
verify, not legal advice. Re-check anything dated.

Contents: 1 Customer reality, 2 WhatsApp, 3 Language and script, 4 Performance on real networks, 5 Discovery and Google Business
Profile, 6 Payments, 7 Legal and platform flags, 8 Selling and delivering, 9 Domains and hosting.

## 1. Customer reality

Mobile-first on mid-range Android, variable 4G, small screens, often bright light outdoors. WhatsApp is the default business
channel, calls are common, Google Maps is the discovery layer. People trust the place and the person: real photos, the owner's
face, Google reviews, "since" years. Hindi, Marathi and English mix in one sentence. Older family decision-makers need large,
high-contrast, simple pages. Design at 375px first, test on a real mid-range phone.

## 2. WhatsApp

- CTA is `https://wa.me/<country code + number>?text=<prefilled message>`. Use `assets/components/whatsapp.tsx`.
- Prefill the message in the language of the page and make it say what the visitor wants.
  English: "Hi, I'd like to book a first visit at [Business]."
  Hindi: "नमस्ते, मुझे [Business] में अपॉइंटमेंट बुक करना है।"
  Marathi: "नमस्कार, मला [Business] येथे भेटीची वेळ ठरवायची आहे."
  Have a native reader confirm the final wording.
- Publish the owner's WhatsApp Business number. Suggest quick replies, a catalogue and a greeting message on the app.
- You cannot track delivered messages, so track clicks as an analytics event named for the outcome ("whatsapp_booking_click").
- A sticky mobile bar with Call and WhatsApp on every page. One CTA label throughout the page.

## 3. Language and script

Decide page languages in the brief. Devanagari for Hindi and Marathi. Test the actual typeface with real conjuncts, matras and
the Marathi letter ळ at real sizes, line height 1.8 to 2.0 for body. `lang` on `<html>` or the element (`en-IN`, `hi`, `mr`),
`hreflang` between versions. Keep phone numbers and prices in Western digits. See `design-techniques.md` T2 and
`copy-no-slop.md` section 6.

## 4. Performance on real networks

Assume mid-range Android, a shaky 4G connection and a 4x slower CPU than your laptop. Targets: first view under about 2.5 s
LCP on a throttled run, home page JavaScript under about 200 KB gz, images WebP or AVIF with explicit dimensions, one or two
fonts, no third-party widgets beyond what the owner asked for. Film is desktop-only (Mode 2). Test throttled in DevTools and
once on a real phone. Run `scripts/perf_budget.py`.

## 5. Discovery and Google Business Profile (GBP)

For most local businesses this moves more than a redesign does.
- Claim and verify the profile. Correct primary category and secondary categories. Services and products listed, hours,
  holiday hours, photos (real, recent), a short description, appointment or booking link, WhatsApp number where allowed.
- NAP (name, address, phone) identical across the website, schema, the profile and directories. One format.
- Reviews: give the owner a short link and a printable QR. Ask every happy customer. Reply to every review.
- Website link on the profile with campaign parameters so analytics can tell where visitors came from.
- Embed the Maps location on the site and put the address in text for accessibility and SEO.
- Directory listings (for example Justdial, Sulekha) only with consistent NAP and when the owner already uses them.
- Write local content with real landmarks, stations and neighbourhood names, honestly.

## 6. Payments

If the site takes money, use a hosted gateway (Razorpay and similar) or UPI links and QR. Card data never touches the site or
your database. Confirm settlement, refunds and GST invoicing with the owner's accountant before launch.

## 7. Legal and platform flags (verify, current at the time of writing)

| Area | Flag | Action |
|---|---|---|
| Personal data | India's Digital Personal Data Protection Act, 2023: notice and consent, purpose limits, rights to correction and erasure, special rules for children's data | Check the current rules and timelines. Plain privacy notice, unticked consent, deletion path. Legal advice before collecting minors' data |
| Medical advertising | Practitioners are bound by professional-conduct rules on self-promotion. Claims of superiority, guarantees and outcome testimonials are risky | `healthcare-vertical.md`. Facts only, client sign-off on wording |
| Misleading advertising | Consumer-protection and advertising-standards bodies act on false claims (guaranteed results, fake discounts, unverifiable rankings) | No guarantees, no unverifiable "No. 1", prices and offers true today |
| Real estate | Projects are generally required to display their RERA registration number in advertising | Ask for the registration number, show it, label artist's impressions |
| Food | Food businesses are generally required to show their FSSAI licence number | Ask for it and show it where required |
| Coaching | Success and rank claims are restricted | Verifiable, recent, sourced results only |
| Trademarks | Brand names and logos belong to their owners | No generated media with real brand marks. Retailers use supplied assets |
| Fonts and images | Licences | Only Google Fonts, Fontshare, or licensed fonts. Own or licensed imagery |
| SMS and phone OTP | Commercial SMS in India involves sender and template registration and cost | Prefer email or Google sign-in unless the owner funds OTP |

## 8. Selling and delivering

Outreach in Hindi or Marathi on WhatsApp, one designed artifact (a live demo link or a one-page deck). Meet at the shop when
possible: trust is personal. Proposals in simple language with the recurring costs listed. 50 percent deposit via UPI or
transfer. The owner's real photos and facts are the critical path, so ask on day one. Festival seasons (Diwali, Ganeshotsav, Eid,
weddings, admissions) drive timing: plan launches ahead of them.

## 9. Domains and hosting

Client-owned `.in` or `.com` domain, never a free subdomain on a client delivery. A branded email address on the domain.
Renewals tracked in `HANDOVER.md`. DNS changes with the owner present. Static hosting free tiers are usually enough for Modes
1 and 2, confirm commercial-use terms. Mode 3 needs a server runtime (`deploy-handover.md` section 1).
