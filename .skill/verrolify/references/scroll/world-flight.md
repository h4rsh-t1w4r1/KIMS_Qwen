# Tier W: world flight (Verro wrapper)

Flagship only. A continuous camera dives into a scene, flies out and into the next, with no visible cuts. Two upstream
procedures exist. This file decides between them and overrides them where Verro's rules differ.

## When Tier W is justified

The brand is a world worth flying (a township launch, a campus, a product universe), the owner has approved the cost after the
money gate, the audience is desktop-capable, and the result will be verified on real hardware. Otherwise use Tier L or S in
`references/modes/mode-2-scroll-animated.md`.

## Choosing the procedure

| Procedure | Shape | Read |
|---|---|---|
| **lets-scroll** | N generated diorama stills and 2N minus 1 frame-locked clips, static HTML engine, scrubbed by scroll | `kits/lets-scroll/LETS-SCROLL.md`, then `references/scroll/world-pipeline.md` and `references/scroll/world-prompts.md`. Engine and template in `kits/lets-scroll/` |
| **scrollcraft worldflight** | One fixed stage with every leg mounted, engine-driven, no pinned blocks | `kits/scrollcraft/references/worldflight.md`, `worlds.md` |
Use lets-scroll when the concept is "dive into a generated scene, fly out, next scene". Use scrollcraft worldflight when the
concept is one unbroken move and you are already on the scrollcraft asset path. Do not mix the two engines in one page.

## Verro overrides

1. **Look.** lets-scroll defaults to a diorama look. Anti-slop treats clay and low-poly diorama as an AI default
   (`anti-slop-design.md`). For real estate and premium products choose a photographic style preamble
   (`kits/scrollcraft/references/worlds.md`), test with two stills first, and choose the diorama only when the brand is
   genuinely playful or illustrated.
2. **Backend.** Tool-agnostic. The owner's accounts and the pinned model decide. State every cost before spending and
   re-measure: the lets-scroll author's measured six-stop 1080p chain was about 27 USD on one backend. Offer 720p first.
3. **Manual path.** If no generation tool is reachable, use the manual asset path (prompts plus a spec table with a status
   column). Never fake a clip.
4. **Phones.** Default is the static hero for phones, as everywhere (`scrub-pipeline.md`). A mobile chain doubles cost and is
   offered only if the owner pays and it is verified on a real phone.
5. **Safety filters.** Interiors with bedrooms or pools can trip image-model filters. Follow the seed advice in the upstream
   gotchas. Do not rephrase around a block in ways that change the truth of the scene.
6. **Truth.** Generated worlds are labelled (artist's impression for real estate), carry no real brand marks, and never
   present a generated place as the real one.
7. **Gates.** Upstream self-checks plus `scrub-pipeline.md` self-testing checklist plus the scrollcraft shoot harness plus
   `qa-gates.md`. The owner watches every clip before the page is built around it.
8. **Delivery.** Static `index.html` and `assets/`, Path C in the Mode 2 file. Deploy per `deploy-handover.md`.
