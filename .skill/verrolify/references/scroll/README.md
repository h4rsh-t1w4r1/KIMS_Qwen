# Scroll references (carried from 10k-websites, lets-scroll and scroll-craft)

Engineering standard and generation laws for scroll-scrubbed pages (Mode 2). Verro's decision rules are in
`references/modes/mode-2-scroll-animated.md`, which wins on conflict.

| File | What it holds |
|---|---|
| `scrub-pipeline.md` | The engineering standard: hero structure, Blob fetch, lerp, seek gating, delta writes, caption bands, legibility, static-hero gate, quality floor, self-testing checklist |
| `prompt-laws.md` | The twelve hero laws, chaining, cost preflight |
| `design-package.md` | The single document that holds every creative decision before generation |
| `ffmpeg-recipes.md` | Encoding for scrubbing, posters, static endings |
| `troubleshooting.md` | Symptom to cause to fix tables, including a headless Chrome route |
| `world-flight.md` | Verro wrapper for Tier W |
| `world-pipeline.md`, `world-prompts.md` | lets-scroll pipeline and prompt scaffolds |

Phase map. These files were written for the 10k-websites pipeline, whose phase numbers appear in the text. In Verrolify:
Phase 1 setup wizard = SKILL.md boot sequence. Phases 2 and 3 design conversation and research = steps 1 to 2 and the brief.
Phase 4 depth tier = the Mode 2 tier ladder. Phase 5 design package = step 3 plus `design-package.md`. Phase 6 generate and
gates = Mode 2 assets and gates, money gate. Phase 7 process assets = `ffmpeg-recipes.md`. Phase 8 build = SKILL.md step 4 and the
mode file (form handling options on a static site: WhatsApp link, `tel:`, mailto, a hosted form endpoint, or none). Phase 9
self-test = `references/core/qa-gates.md`. Phase 10 put it online = `references/core/deploy-handover.md`. Phase 11 polish loop =
deploy-handover section 10. Where a file says "Hostinger connector", that is one hosting option among several.
