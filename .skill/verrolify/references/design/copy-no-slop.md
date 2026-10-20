# Copy without slop

Adapted from Peter Yang's no-ai-slop skill (MIT) and the owner's copy gate, for website copy. Long generation drifts
toward corporate stock language even with a rule against it, so instruction alone is not enough: write the copy as a
designed deliverable in the brief, then gate it with `scripts/slop_lint.py` and a manual sweep.

Contents: 1 Two jobs, 2 Principles, 3 Words to cut, 4 Patterns to cut, 5 Web copy specifics, 6 Hindi and Marathi,
7 Claims and truth, 8 The gate.

## 1. Two jobs

**Write or edit.** Draft site copy in the brief, in the buyers' words (from research) and the business's register. When
editing the client's existing copy, make the minimum effective edit and preserve the owner's real voice.

**Detect.** When asked to audit existing client copy, or asked "does this read as AI", name each pattern from this file
that appears, quote the line, give the fix in a few words. Do not rewrite, score, or guess whether AI wrote it. Detectors
guess. Named patterns are evidence the owner can check. Offer to edit afterwards.

## 2. Principles

- **Portability test.** If a sentence could move unchanged to another business, city or product, it is filler. Replace it
  with a fact, an example, a mechanism, a consequence or a judgment specific to this business. "We provide quality
  dental care" fails. "Dr. Mehta has practised in Nalasopara for twelve years" passes, if the ledger says so.
- **Concrete over abstract.** Names, numbers, dates, timings, mechanisms. "Scaling and polishing, 30 minutes, same-day
  appointments on weekdays" beats "comprehensive oral care solutions".
- **Show, do not tell the reader what to think.** Cut labels that call a point important, innovative or unique. Let facts
  carry the emphasis.
- **Active voice, direct verbs.** "We reply on WhatsApp within an hour" beats "Prompt responses are provided".
- **Size to a flick.** Hero lines are short enough to read in one flick of scroll. Section headings carry the point, the
  paragraph supports it.
- **Brand register.** A luxury house and a street-food stall both stay plain, but they sound nothing alike. Name the
  register in the brief (one line) and hold it.
- **Never invent.** No stats, quotes, credentials, examples or sources the ledger does not hold. If the owner has no
  proof, write the honest version.

## 3. Words to cut (lint ERROR, zero tolerance)

delve, foster, leverage, utilize, facilitate, empower, streamline, robust, cutting-edge, paradigm shift, game changer,
tapestry, realm, beacon, multifaceted, meticulous, intricate, paramount, transformative, elevate, embark, supercharge,
harness, ever-evolving, seamless, unlock, actionable, data-driven, testament, landscape, unleash, next-gen, revolutionize,
solutions, "this is huge", "this changes everything".

Lint WARN (review in context, keep only if it earns its place): holistic, world-class, state-of-the-art, one-stop shop,
second to none, passionate, tailored, bespoke, premier, curated, crafted, journey, "look no further", "we pride
ourselves", "committed to excellence", "your satisfaction is our priority", "welcome to".
Often-empty adverbs (cut when they add nothing): just, literally, honestly, simply, actually, truly, fundamentally,
importantly, crucially, inherently. Often-empty phrases: it's worth noting, at the end of the day, when it comes to, at
its core, in today's world, in the age of, in order to, going forward, let's dive in.

## 4. Patterns to cut

- **Binary contrast:** "It's not just X, it's Y." "Not a X. Not a Y. A Z." State Y directly.
- **Throat-clearing openers:** "Here's the thing", "Let me be clear". Start with the point.
- **Colon reveals:** "The detail that makes it work: ..." Write the plain sentence.
- **Superficial -ing tails:** "highlighting our commitment to...", "showcasing...". Replace with the consequence.
- **Importance puffery:** "stands as a testament", "plays a vital role", "pivotal moment". State the fact.
- **Weasel attribution:** "experts agree", "studies show", "widely regarded". Name the source or cut it.
- **Fake-strong verbs:** "serves as a hub". Use "is" or "has".
- **Synonym cycling:** repeat the clear word.
- **Dramatic fragmentation:** "X. And Y. And Z." and stacked punchy fragments, except a deliberate designed device.
- **Rhetorical setups:** "What if I told you", "Think about it".
- **Fake-profound kickers and summary-recap endings:** end on the concrete next action.
- **Formatting slop:** emoji in headings, bold sprinkled mid-sentence, bullets where two sentences read better, a header
  over two sentences.
- **False ranges:** "from X to Y" that is really a list. **Generic big finishes:** "the future looks bright."
- **Em dashes:** none in site copy. Use a period, comma, colon or parentheses.
Carve-out that matters: a deliberate brand device written in the brief (a designed triplet like "Listen. Build. Keep.", a
planned staccato punch) is craft. The difference is intent: the brief chose it for this brand, a tell is what drifts in
uninvited.

## 5. Web copy specifics

- **Headline:** the outcome in the customer's words, with a specific detail. Not "City's premier X".
- **CTA:** says exactly what happens. "Chat on WhatsApp", "Book a 20-minute first visit", not "Submit" or "Learn more".
  The same action keeps the same name through the whole flow. One CTA label used everywhere on the page.
- **Microcopy:** labels name things by what the visitor understands, not how the system works. Sentence case. Placeholder
  text is an example, never the only label.
- **Errors and empty states:** say what went wrong and how to fix it, plainly, without apology. An empty state is an
  invitation to act.
- **FAQ:** answer the real objections found in research, in the buyers' words, including price, pain, time, trust.
- **Testimonials:** real, verbatim, with permission. Initial and area is enough. No composites.
- **About page:** the owner's confident voice, specific history, the real reason they do this work.
- **Prices:** if shown, exact and current. If hidden, say how to get one ("send a photo of your teeth on WhatsApp for an
  estimate").
- **Imagery disclosure:** if visuals are generated, follow the brief's decision. A footer line such as "Imagery is
  AI-generated" is honest and cheap.

## 6. Hindi and Marathi

- Write natively. Do not translate English marketing slogans word for word. Ask a native reader (the owner or a family
  member) to read the final text aloud.
- Use the register customers use: polite second person (आप in Hindi, तुम्ही in Marathi), plain words, and the English
  words customers already say (appointment, booking, clinic) rather than stiff Sanskritised alternatives.
- Script: Devanagari for Hindi and Marathi unless the owner's audience writes Roman Hindi. Keep numerals as customers
  write them (usually Western digits). Keep phone numbers and prices in Western digits.
- Bilingual pages: one language per page or a clear toggle, `lang` attribute on the `<html>` or the element
  (`en-IN`, `hi`, `mr`), `hreflang` links between versions, and prefill the WhatsApp message in the language of the page.
- Typography: test the face with real Marathi conjuncts at the real sizes. See T2 in `design-techniques.md`.
- The banned-word list is English. Apply the same intent in the other language: no empty superlatives, no template slogans.

## 7. Claims and truth

- Superlatives ("best", "No. 1", "most trusted") need a source or they go.
- Guarantees and permanence ("100% success", "permanent results", "pain-free") are not written on behalf of a health
  practice. See `references/market/healthcare-vertical.md`.
- Comparisons with named competitors are not written.
- Quantities (years, customers served, reviews, rating) are copied from the ledger exactly.
- If the owner insists on a claim you cannot support, say plainly that it protects them to leave it out, and record the
  decision in the brief.

## 8. The gate

```bash
python3 <skill-dir>/scripts/slop_lint.py <project-dir>
```
Re-run until zero errors. Then sweep every visible string by hand: hero captions AND every lower section (proof, process,
FAQ, testimonials, CTA, form microcopy, footer, alt text, meta descriptions), because drift lands in the lower sections.
Then the coherence read: one brand name, no orphaned copy from a template or reference.
