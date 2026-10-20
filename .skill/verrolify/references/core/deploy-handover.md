# Deploy, verify, hand over

Order matters: OG tags need the live URL before the final build.

Contents: 1 host choice, 2 domains and DNS, 3 pre-deploy, 4 deploy routes, 5 verify live, 6 speed receipts,
7 real-device test, 8 handover, 9 after launch, 10 polish loop.

## 1. Host choice

| Build | Good hosts | Notes |
|---|---|---|
| Static export (Mode 1, Mode 2 static) | Cloudflare Pages, Netlify, or the client's existing Hostinger shared plan | Next static export: `output: 'export'`, build output in `out/`. Check the free plan's commercial-use terms |
| Single-folder static HTML (no Node) | Same hosts, or any shared hosting | `index.html` at the zip root with `assets/` beside it |
| Server features (Mode 3: auth, webhooks, cron) | Cloudflare Workers via the Cloudflare adapter for OpenNext (`@opennextjs/cloudflare`), Vercel on a paid plan, Netlify, or a Node host or VPS | Cloudflare Pages alone only serves static export for Next.js. Cloudflare's recommended adapter for full-stack Next.js has been changing during 2026, so read their current Next.js guide before choosing. Vercel Hobby is non-commercial per its terms |
| Retention layer beside an existing non-Node site (WordPress, Wix, Shopify, hand-written HTML) | A separate app on a subdomain, for example `members.clientdomain.in` | The old site links to it. Least risky. See Mode 3 |

Decide ownership (client's account) before deploying.

## 2. Domains and DNS

- Domain and DNS live in the client's account. Ask for registrar access in the owner's presence. DNS changes happen
  with the owner present and with a screenshot of the old records saved first.
- A new domain's HTTPS certificate can take minutes to issue. A security warning right after first deploy is that.
- You will need DNS for: the site itself, Google Search Console verification (TXT), and email sending (SPF and DKIM
  records for the provider). Domain verification for email can sit pending for hours, so start it early. Send from the
  client's own verified domain, not a shared test domain.
- Keep old URLs alive. If the new site changes any URL that already ranks or is linked, write a redirect map and ship
  301 redirects at deploy.

## 3. Pre-deploy

- Patch `og:image`, `og:url`, canonical and sitemap URLs with the live address. Do it with the editor tool, not a shell
  one-liner (a scripted replace can read UTF-8 with the wrong default encoding and mangle every special character,
  including Devanagari).
- Environment variables set on the host, not in the repo. `.env.example` committed with names only.
- Dev routes and test pages removed. `next build` clean. `scripts/slop_lint.py`, `verify_assets.py`, `perf_budget.py` pass.
- Raw renders, review folders, source PSDs and zips are outside the deploy folder.
- Hostinger zip: zip the CONTENTS of the output folder, not the folder. Top level must be `index.html` with the assets
  beside it, otherwise the live site shows a directory listing or a 404.

## 4. Deploy routes

1. Git-connected (preferred): push to the client's or Verro's repo, host builds on push. Rollbacks are one click.
2. CLI: for example `npx wrangler pages deploy out` for Cloudflare Pages static output.
3. Zip upload to shared hosting. If the client has Hostinger and the Hostinger MCP is connected (npm package
   `hostinger-api-mcp`), a static deploy can run through it. Only with the owner's consent. The token stays secret.
Large uploads are fine: a few seconds per handful of MB is normal.

## 5. Verify live (before telling the owner it is done)

- Every route returns 200 over HTTPS. Assets serve (fetch the heaviest ones directly).
- Console clean on the live URL. Hard refresh shows the new version (a stale cache can show the old one: check a
  changed string).
- Scrub hero pages: scrub on the live site. Hosts without Range support are why the Blob fetch rule exists.
- Forms and webhooks hit the live endpoints with real requests.
- Search Console: add the property, submit `sitemap.xml`, inspect the home URL.

## 6. Speed receipts: measure, then present

```bash
python3 <skill-dir>/scripts/speed_receipts.py https://the-live-url/ --runs 3
```
Records time to first byte, total time, HTML size, and the weight of every same-origin asset the page references.
Real measurements only. Never present an estimate as a receipt. Present the numbers with the structural argument that
answers "pretty but slow": static sites are plain files with no server code to be slow, video streams in behind a
poster, phones never download the heavy version. For Mode 3, say which parts run on a server and what they cost.
Record the numbers so the owner can quote them to their own customers.

## 7. Real-device test

Hand the owner the live link. Have them test on a desktop and on their own phone on their real network, not
localhost. For scroll pages ask them to check the top and bottom of the hero in Chrome, where choppiness shows first.
Their eyes and hardware catch what audits cannot. If a mobile defect is reported, deploy
`kits/scrollcraft/references/device-diag.html` beside the site and let the device answer, rather than theorising.

## 8. Handover

A site the client cannot touch is a trap. A site they can maintain stays fresh, and fresh feels premium.
- Record a short screen walkthrough: how to ask for a change, where content lives, what each button does.
- Write `HANDOVER.md` from `assets/templates/` (accounts, who owns what, how to renew, how to request changes, support
  window, what the retainer covers).
- Content updates: default is "send Verro one plain sentence". Offer a lightweight editor (a CMS such as Decap, Tina or
  Sanity) only when the client will update weekly and the budget covers it.
- Transfer checklist: domain, hosting, email provider, auth, database, analytics, Search Console, Google Business
  Profile access. Credentials move through the client's password manager, never chat.
- State the support window: 30 days of free email support after launch, then the retainer.

## 9. After launch

- Google Business Profile: website link set, services listed, photos added, reviews link shared with the owner.
- Analytics configured around the outcome metric from the brief (WhatsApp clicks, call taps, form submits, bookings).
- Week-one check: look at real behaviour, fix the two worst friction points.
- First monthly report against the baseline captured in the brief.

## 10. Polish loop

Iterating is cheap: change, redeploy, re-verify. Take feedback in rounds: structure, polish, motion. Treat casual
remarks like "this part feels boring" as valid bug reports and translate them into changes. Apply each round in one
pass. From launch you are the owner's on-call developer, and you say so in one line.
