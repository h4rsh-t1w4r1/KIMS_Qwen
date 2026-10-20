# Verro design techniques (T1 to T5): selection, exclusions, prompt formats

Five techniques the owner proved on real builds. Each turns a vague prompt ("make it modern, dark, professional") into a
specific one. Selection matters more than application: every technique has a stop condition. Use the matrix, state in
the brief which techniques are on and at what intensity, and say why when one is off.

Contents: 1 Selection logic, 2 T1 Mood, 3 T2 Typography, 4 T3 Whitespace, 5 T4 Hero, 6 T5 Colour, 7 Layout structures,
8 Assembling the build prompt, 9 Appendix A (owner's worked examples), 10 Appendix B (final demo prompt).

## 1. Selection logic

T2 (typography) and T5 (60-30-10 colour) are foundations. They apply to every public page in every mode.
T4 (five-part hero) applies to every public page that has a hero. T1 (mood and dark mode) and T3 (whitespace) are
conditional. Apply the exclusions as hard rules, not preferences.

| Technique | Use when | Do NOT use when |
|---|---|---|
| T1 Mood, dark mode | Product and brand worlds that are genuinely dark or dramatic: perfume, nightlife, premium showrooms, cinematic launches | **Healthcare, education, government.** Clarity and trust beat drama, so light mode. Also any anxious-buyer service (clinic, dentist, physio, therapist, school) and any category where the buyer is reducing risk. Dark is never a default because it photographs well |
| T2 Typography | Always | Never off. A page with default fonts reads as unfinished |
| T3 Whitespace | Marketing pages, portfolios, premium landing pages, editorial brands, product pages that must feel expensive | **Dense information pages and SaaS finance or dashboard-style pages** (member dashboard, admin tables, timetables, price lists, spec comparisons). Spacing must balance with usability there |
| T4 Five-part hero | Every public page with a hero | Working surfaces such as dashboards and admin screens need no invented marketing hero |
| T5 60-30-10 colour | Always | Never off. Accent colour on headings or body copy is decoration and the amateur tell |

Intensity dials (write the chosen level into the brief, D4 to D6):

| Dial | Level | Section padding (desktop) | Gap between blocks | Used for |
|---|---|---|---|---|
| Whitespace | Generous | 120px top and bottom | 80px | Hero, story, premium editorial sections |
| Whitespace | Balanced | 80px | 56px | Catalogues, services grids, pricing |
| Whitespace | Compact | 48px | 32px | Dashboards, timetables, spec tables |
On screens under 640px scale these to roughly 60 percent but keep the ratios. 120px on a phone wastes the fold.

Layout structure (named in the owner's prompts): Storytelling, Split-Screen, Bento Grid. See section 7.

## 2. T1: control the mood with real-world references

The failure it fixes: "make it modern and professional with a dark design and a nice colour scheme". Adjectives are not
buildable. A real-world reference is. Describe the aesthetic as a place or object ("the inside of a high-end
watchmaker's workshop at night"), name the colour roles and where the accent is allowed, and state the layout structure.
Commit to one direction per site. The accent is strictly for CTAs, active nav states and hover interactions, not
headings or body copy.

Pro Format (use this, keep the structure, swap the content for the client):
```
Create a portfolio website for [your name], a freelance [your craft, e.g. motion designer, illustrator, photographer]
who works with [your target clients, e.g. tech startups and creative agencies] on [your work type, e.g. brand films and
UI animations]. Use a Storytelling layout structure. Apply a Dark Academia aesthetic - think the inside of a high-end
watchmaker's workshop at night, almost black walls, cool electric blue as the only accent color (like a neon sign
through a dark window), crisp white text. The accent is strictly for CTAs, active nav states, and hover interactions
only - not headings or body copy. Sections: hero with your name and a single-line positioning statement, selected work
grid ([number of projects] cards with title, client, and category), about, and contact. Every section should feel like
it belongs in a high-end creative studio portfolio, not a template.
```
Note from the owner: dark mode is not universal. Healthcare, education and government usually work better in light
mode because clarity and trust matter more than drama.

How to choose the reference for a local client: sample from the business's own material world, not from the
"Dark Academia / Aurora / Solarpunk" examples. A dental clinic's world is daylight, ceramic, clean steel, pharmacy glass.
A perfume shop's world is amber glass, mist, brass, a dim counter. A gym's world is chalk, rubber, steel, a single
spotlight. See `references/market/verticals.md` for starting references per vertical. The named aesthetics in the
owner's examples are demonstrations of the format, not a menu to reuse.

## 3. T2: typography as the quality signal

Typography carries personality and the perception of professionalism. A childish, outdated or hard-to-read face makes a
site feel cheap. The right faces make it feel more sophisticated than the business may be.

Pro Format:
```
Create a website for [YOUR BUSINESS NAME], a [YOUR SERVICE TYPE] working with [YOUR TARGET CLIENTS]. Use a Split-Screen
layout structure. Apply a Neo-Brutalism aesthetic. Typography is the entire design system: use Clash Display for all
headings at bold weight with wide tracking and a minimum H1 size of 72px, and IBM Plex Mono for all body text and UI
elements, nothing else. Heading hierarchy must create strong visual contrast, H1 should feel three times heavier than
body text. Body line height 1.7, max line length 70 characters. Keep layout clean and minimal so the type carries the
page. Sections: hero with a single bold statement headline, [YOUR CORE SERVICES] as individual cards, selected work, and
contact. Do not add decorative elements, gradients or illustrations. The typography is doing all the work.
```
Combined with T1 (the owner's bonus prompt, Verdant Labs) it reads: layout structure, aesthetic with palette roles,
then "Typography: use Fraunces for all headings at heavy weight and Source Sans 3 for all body text and UI elements,
nothing else. H1 minimum size 64px. Body line height 1.8, max line length 65 characters." Full text in Appendix A.

Rules (hold in every aesthetic):
- Display face with real character from the brand's world, a quiet body face, optional mono for small labels. Never
  Inter, Roboto, Arial or system fonts as display. One family at three weights is not a system.
- H1 minimum 64 to 72px on desktop (use `clamp()` so phones scale down), weight extremes (800 to 900 for display where
  the face allows), size jumps of at least 3x between heading and body, heading letter spacing about 0.02em.
- Body 16px minimum, line height 1.6 to 1.8, measure 65 to 70 characters. Size text blocks in `ch` on the text element
  itself, not on a container.
- **Do not reuse the owner's example faces on every client.** Clash Display plus IBM Plex Mono on twenty sites is a
  template. Pick per brief. The pairing must be defensible from the business's world.
- Licence: only Google Fonts (OFL) or Fontshare (free for commercial use under the ITF Free Font Licence) or fonts the
  client or Verro has licensed. Record the licence in the brief. Do not use fonts of unknown origin.
- Use `next/font` (self-hosts, trims, avoids layout shift). Load only the weights in use.
- Bilingual sites: pick a Devanagari companion and test real Marathi text (conjuncts, the letter ळ, matras) in the
  actual headline and body sizes. Options with Devanagari support include Noto Sans Devanagari, Noto Serif Devanagari,
  Hind, Mukta, Poppins, Baloo 2, Yatra One, Rozha One, Tiro Devanagari Marathi, Martel, Khand, Anek Devanagari. Confirm
  availability and licence on fonts.google.com. Devanagari needs more line height than Latin (about 1.8 to 2.0 for body).
- Pair-finder resource from the owner: https://www.figma.com/resource-library/font-pairings/ . The ui-ux-pro-max kit has
  `--domain typography` for candidates.

Mood to face starting points (verify availability and licence; these are candidates, not answers):

| Mood | Display candidates | Body candidates |
|---|---|---|
| Calm clinical, trustworthy | Fraunces (soft), Instrument Serif, Young Serif, DM Serif Display | Source Sans 3, Figtree, Hanken Grotesk, Atkinson Hyperlegible |
| Warm artisan, hospitality | Gloock, Bodoni Moda, Playfair Display, Recoleta-like serifs | Lora, Literata, Albert Sans |
| Athletic, high contrast | Archivo (expanded), Bricolage Grotesque, Syne, Familjen Grotesk | Manrope, Geist, IBM Plex Sans |
| Luxury, perfumery, jewellery | Cormorant Garamond, Italiana, Marcellus, Bodoni Moda | Jost, Montserrat light weights, Hanken Grotesk |
| Modern product, showroom | Sora, Outfit, Plus Jakarta Sans, Unbounded (sparingly) | DM Sans, Inter is banned as display only |
| Editorial, books | Newsreader, Source Serif 4, Spectral | Source Sans 3, Libre Franklin |
Fontshare options (free commercial): Clash Display, Satoshi, General Sans, Cabinet Grotesk, Switzer, Gambetta, Boska.

## 4. T3: white space for elegance and maturity

The brain reads easy-to-process as trustworthy. Crowding is the fastest way to look cheap. When in doubt add space, not
less. Whitespace must be balanced with usability: it is a primary directive for portfolios, premium landing pages,
editorial brands and product pages, and a secondary one for catalogue, timetable, pricing and dashboard pages.

Pro Format:
```
Create a product landing page for [YOUR BUSINESS NAME], a [WHAT YOUR BUSINESS DOES] for [YOUR TARGET CLIENTS]. Use a Bento
Grid layout structure. Apply a minimal editorial aesthetic: off-white background like heavyweight uncoated paper,
charcoal typography, no color accents except a single [YOUR ACCENT COLOR DESCRIBED AS A REAL-WORLD REFERENCE: e.g., warm
stone, aged brass, slate blue] tone for subtle UI details. Whitespace is the primary design directive: give every
element room to breathe, never crowd two content blocks together, and when in doubt add more space rather than less.
Sections: hero with a single statement headline and one CTA, [YOUR THREE CORE SERVICES] as individual cards, one client
testimonial displayed in large editorial type, and a simple contact section. NO dense layouts, no stacked elements
fighting for attention, no stock imagery, no icons.
```
Mechanics: use the dial table in section 1. Keep a spacing scale (4, 8, 16, 24, 32, 48, 64, 96, 128, 192) and never
invent off-scale values. Go up one step rather than down when unsure. Content blocks inside a section keep at least the
"gap between blocks" value. Never crowd two content blocks. Cramped spacing makes a premium claim look false in the first
50 ms.

Where T3 yields: a clinic's timetable, a gym's class grid, a bookstore's catalogue, a showroom's spec table and any
member dashboard use Balanced or Compact. Say so in the brief so nobody "fixes" it later.

## 5. T4: engineer a high-conversion hero

The hero is the entire focus. It carries the halo effect: a visitor forms an opinion in about 50 ms and the rest of the
page is judged through it.

Pro Format:
```
Create a website for [your business name], a [your business type] in [your city], built for [your target customer] who
want [their desired outcome]. Pages: Home, [your page 2], [your page 3], Pricing, and Contact. Use a Split-Screen layout
structure. Apply a dark, high-contrast aesthetic with deep charcoal backgrounds and a sharp amber accent color - think
a luxury whiskey bar at closing time, warm but serious. The hero section is the entire focus of this build and needs all
five of the following: a value-proposition headline written from the customer outcome, not your features (for example
"Get Strong Enough to Surprise Yourself," not "[City]'s Premier [Business Type]"), a subheadline that adds one specific
detail about the experience or the result customers see in the first [timeframe, e.g. 90 days], a single CTA button
reading "[your offer, e.g. Claim Your First Week Free]" with no secondary CTA competing with it in the hero, a
background image slot labeled [describe the photo you will drop in], and one trust signal showing either your customer
count or a short real customer quote. Write all copy as if the business has been open for [X] years and has [X] active
customers. Do not use placeholder copy or generic industry cliches anywhere on the page.
```
**Verro correction for real clients.** "Write all copy as if the business has been open for X years and has X active
customers" is for demo or invented brands only, and the page must then say it is a demo. For a real client, replace it
with the truth ledger values. If the client has no countable proof, the trust signal is honest and specific instead:
the practitioner's name and qualification, years in practice, a real review quote, or location and hours. Never a
fabricated number.

The five parts, and what each must be:
1. **Outcome headline** in the customer's words. Not "City's premier X". Two lines maximum.
2. **Subheadline** with one specific detail and a timeframe. Twenty words maximum.
3. **One CTA** with a verb and a channel, no secondary CTA competing in the hero. For local businesses the default is
   WhatsApp chat, with call and map elsewhere on the page and in the sticky mobile bar.
4. **A designed visual slot,** labelled in the brief with exactly what image or footage goes there. Real beats generated
   in trust-first verticals.
5. **One trust signal.** From the truth ledger only.
Taste limits from scroll-craft: no more than four text elements in the hero, CTA visible without scrolling, no "scroll"
cue or animated mouse icon, no stat-strip decoration, no eyebrow unless it carries information.

Hero by mode: Mode 1 a composed still with whisper motion. Mode 2 the medium depends on tier (layered planes, a single
scrub shot, a chain). Mode 3 public pages as Mode 1; dashboards get no marketing hero.

## 6. T5: intentional 60-30-10 colour systems

Pro Format (colour clause):
```
Use the following color system exactly and do not add to it: Primary covers 60 percent of the page - think [real-world
reference], used for all backgrounds and primary surfaces. Secondary covers 30 percent - [real-world reference], used for
cards, nav background, and dividers only. Accent covers 10 percent - [describe your accent color with a real-world
reference], used only for CTAs, active states, and key data callouts, nowhere else. All text must be clearly legible
against its background with strong contrast.
```
Rules:
- Three roles, exact hex, no additions. Canvas is never pure `#000` or `#fff`: tint it toward the subject's world.
- Sample from physical references and from the client's logo or signage if it exists. Do not reuse a palette across
  clients. Two competing clients in one locality must not get the same direction.
- Contrast is computed, not guessed: `python3 <skill-dir>/scripts/contrast.py "#111111" "#F6F1E9"` prints the ratio.
  4.5:1 body text, 3:1 large text and interface borders. Hairline borders usually fail for interactive elements.
- The accent appears in rare doses: CTA, focus ring, active nav, one or two emphasis moments. If a screenshot shows the
  accent in more than three places, pull some out.
- Banned as default reaches (allowed only when the client's own world is that): cream plus high-contrast serif plus
  terracotta; near-black plus acid green; near-black plus warm amber plus serif; violet-to-blue "AI" gradients;
  cream-and-brass "artisan". See `anti-slop-design.md`.

## 7. Layout structures

| Structure | Strengths | Use for | Trap |
|---|---|---|---|
| Storytelling | Linear narrative, one idea per scroll, trust built in order | Practitioner-led trust sites, Mode 2 product stories | Every section the same text-image zigzag |
| Split-Screen | Strong image beside a strong message, clear CTA | Gyms, studios, salons, classes, any visual-led service | Two halves with equal weight and no hierarchy |
| Bento Grid | Scannable overview of services or product features | Service menus, feature summaries, catalogue overviews | Identical rounded cards with identical shadows. Vary tile size to match importance |
No two adjacent sections share a layout skeleton. State the skeleton name per section in the brief.

## 8. Assembling the build prompt

After the brief is approved, write `BUILD_PROMPT.md` in the owner's Pro Format so any model can execute it in chunks.
Template (fill every slot from the brief, delete slots that do not apply):
```
ROLE: You are a senior product designer and engineer building a real website for a real business. No lorem ipsum, no
placeholder text, no template look, no invented statistics, reviews or credentials. Every visible word must be true to
the brief.
BUSINESS: [name], a [what it does] in [area] for [target customer] who want [outcome in their words].
MODE: [1 | 2 | 3], intensity: motion [whisper | choreographed | functional], whitespace [generous | balanced | compact].
LAYOUT STRUCTURE: [Storytelling | Split-Screen | Bento Grid]. Sections in order, each with one job and a different
skeleton from its neighbours: [list].
AESTHETIC: [direction with a real-world reference]. Mode: [light | dark] because [reason].
COLOUR (60-30-10, exact, no additions): primary [hex + reference], secondary [hex + reference], accent [hex + reference].
TYPOGRAPHY: [display face] for headings at [weight], min H1 [size], [body face] for body and UI, [mono if any]. Body line
height [x], max line length [n] characters. Never Inter, Roboto, Arial or system fonts as display. Devanagari: [face].
HERO (all five): outcome headline "[verbatim]"; subheadline "[verbatim]"; single CTA "[label]" to [channel]; visual slot
[exact description or file]; trust signal "[verbatim from truth ledger]".
STRUCTURAL REFERENCES (principles only, never copy): hero from [ref A: principle]; trust section from [ref B: principle];
booking block from [ref C: principle]; motion pattern from [ref D: principle]. See REFERENCE_LOG.md for what changes.
CONVERSION FURNITURE (4 to 6, with placement): [list].
MOTION: Motion library (motion/react). Whisper reveals, hover feedback, one designed moment: [signature]. Reduced motion
honoured. Never fade in the LCP element.
SIGNATURE ELEMENT: [one].
COPY: written in the brief, ship verbatim. Banned: em dashes, leverage, seamless, empower, unlock, robust, actionable,
data-driven, solutions, testament, landscape, delve, elevate, "it's not just X, it's Y".
GUARDS: one brand name end to end. Every image, logo, review belongs to this business. Read all visible words before done.
```
Execute in the chunk order in SKILL.md Step 4. Weaker models never receive the whole prompt at once.

## 9. Appendix A: the owner's worked examples (format exemplars, do not reuse content)

T1 example:
```
Create a portfolio website for Jake Morales, a freelance motion designer who works with tech startups and independent
music labels on brand films, title sequences, and UI animations. Use a Storytelling layout structure. Apply a Dark
Academia aesthetic, think the inside of a high-end watchmaker's workshop at night, almost black walls, cool electric blue
as the only accent color like a neon sign through a dark window, crisp white text. The accent is strictly for CTAs,
active nav states, and hover interactions only, not headings or body copy. Sections: hero with your name and a
single-line positioning statement, selected work grid with 6 cards each showing title, client, and category, about, and
contact. Every section should feel like it belongs in a high-end creative studio portfolio, not a template.
```
T2 example (Groundwork Studio, Split-Screen, Neo-Brutalism, Clash Display plus IBM Plex Mono, H1 at least 72px, body line
height 1.7, 70 characters) and T3 example (Forma architecture studio, Bento Grid, minimal editorial, off-white like
heavyweight uncoated paper, warm stone accent, one testimonial in large editorial type, no stock imagery, no icons) follow
the same fill-in pattern as the Pro Formats above.

T4 example:
```
Create a website for IRONFORM, a LOCAL STRENGTH TRAINING STUDIO in CHICAGO, built for WORKING ADULTS AGED 25 TO 40 who
want STRUCTURED PROGRAMMING WITHOUT THE INTIMIDATING BIG-BOX GYM ATMOSPHERE. Pages: Home, TRAINING PROGRAMS, COACHES,
Pricing, and Contact. Use a Split-Screen layout structure. Apply a dark, high-contrast aesthetic with deep charcoal
backgrounds and a sharp amber accent color, think a luxury whiskey bar at closing time, warm but serious. The hero
section is the entire focus of this build and needs all five of the following: a value-proposition headline written from
the customer outcome, not your features (for example "Get Strong Enough to Surprise Yourself," not "Chicago's Premier
Strength Studio"), a subheadline that adds one specific detail about the experience or the result customers see in the
first 90 DAYS, a single CTA button reading "CLAIM YOUR FIRST WEEK FREE" with no secondary CTA competing with it in the
hero, a background image slot labeled WIDE SHOT OF A DIMLY LIT GYM FLOOR WITH A SINGLE ATHLETE UNDER A SPOTLIGHT ON A
BARBELL, and one trust signal showing either your customer count or a short real customer quote. Write all copy as if
the business has been open for 6 YEARS and has 340 ACTIVE MEMBERS. Do not use placeholder copy or generic industry
cliches anywhere on the page.
```
(Demo brand. For a real gym use the truth ledger, per the Verro correction in section 5. Note this example is dark; a
gym's own world supports it. A clinic's does not.)

Bonus prompt (T1 plus T2, Solarpunk):
```
Create a website for VERDANT LABS, a RENEWABLE ENERGY CONSULTING FIRM working with MUNICIPAL GOVERNMENTS AND URBAN
DEVELOPERS transitioning neighborhoods to clean infrastructure. Use a Storytelling layout structure. Apply a Solarpunk
aesthetic: warm greens and earth tones as the base, gold as the single accent color, organic shapes mixed with clean
technical elements, bright and hopeful overall atmosphere. Typography use Fraunces for all headings at heavy weight and
Source Sans 3 for all body text and UI elements, nothing else. H1 minimum size 64px. Body line height 1.8, max line length
65 characters. Sections: hero with a bold mission statement, THREE CORE SERVICES as individual cards (NEIGHBORHOOD ENERGY
AUDITS, SOLAR INFRASTRUCTURE PLANNING, and COMMUNITY TRANSITION ROADMAPS), a selected projects section, and contact. Do
not use dark backgrounds, hard borders, or aggressive type contrast. The palette and the typography should make the
visitor feel like the future is already being built.
```
## 10. Appendix B: final demo prompt (all five techniques, B2B SaaS landing, dark)

```
You are a senior product designer who specializes in clean, high-converting SaaS landing pages. You avoid visual clutter,
decorative noise, and anything that delays the visitor from understanding the core value. Build a landing page for
CLARITIQ, a B2B REVENUE ANALYTICS PLATFORM for GROWTH MARKETERS AT DTC BRANDS DOING $1M TO $20M IN REVENUE who are tired of
STITCHING AD SPEND, ATTRIBUTION, AND REVENUE DATA TOGETHER FROM FIVE DIFFERENT TOOLS. Pages: Home only for this build. Use
a Bento Grid layout structure. Apply an Aurora Gradients aesthetic with a dark base. Use the following color system
exactly and do not add to it: Primary covers 60 percent of the page, think the deep black of a Bloomberg terminal, used
for all backgrounds and primary surfaces. Secondary covers 30 percent, a slightly lighter dark slate like the bezel
around a luxury watch face, used for cards, nav background, and dividers only. Accent covers 10 percent, A SHARP MINT
GREEN LIKE THE GLOW ON A HEART RATE MONITOR, used only for CTAs, active states, and key data callouts, nowhere else. All
text must be clearly legible against its background with strong contrast. Typography: use Clash Display for all headings
at heavy weight, and IBM Plex Mono for all body text and UI elements, nothing else. Never use Inter, Roboto, Arial, or
system fonts. H1 minimum size 64px. Use weight extremes: 800 to 900 for headings. Size jumps of 3x minimum between
heading and body. Body line height 1.75. Whitespace is the third design directive: section padding top and bottom at 120px
minimum, 80px minimum gap between any two content blocks within a section, 40px between paragraph blocks, heading letter
spacing 0.02em. If anything looks crowded, add more space, never less. The hero section needs all five of the following:
a value-proposition headline written from the customer outcome not your features, a subheadline that adds one specific
detail about the result customers see in the first 30 DAYS, a single CTA button reading SEE YOUR REVENUE CLEARLY with no
secondary CTA competing with it, a product visual slot labeled DASHBOARD SCREENSHOT SHOWING MULTI-CHANNEL ATTRIBUTION AND
REVENUE TOTALS SIDE BY SIDE, and one trust signal showing OVER 1,200 DTC MARKETING TEAMS HAVE SWITCHED FROM SPREADSHEETS
TO CLARITIQ. Write real copy throughout. A headline focused on outcome, real feature names, and a pricing section with
STARTER, GROWTH, AND ENTERPRISE tiers. Do not use placeholder text or lorem ipsum anywhere. Do not add decorative
elements, gradients outside the defined system, or features not listed above.
```
Read this as the shape, not the content: it is a demo SaaS brand with invented numbers, a dark base and an Aurora
aesthetic. A local clinic would use none of those choices. Copy the structure (role line, business sentence, layout,
aesthetic with reference, exact colour system, exact type, spacing numbers, five-part hero, copy rules, scope fence).
