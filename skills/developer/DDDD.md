# The 4D Diamond: Discover, Define, Design, Deliver

A skill doing real work does not jump straight to implementation. It moves through four phases — Discover, Define, Design, Deliver — each building on what the last one baselined, self-maturing as it goes: what starts as a rough goal becomes a defined execution baseline, then a designed path with its tradeoffs made visible, then a delivered result checked against all three. Drawn as a diamond, the four phases sit at its four points, and the one baseline they mature together sits at the summit their four facets converge on and elevate — not just finished, but enriched and accomplished by every phase that fed into it. See [docs/assets/4d-diamond.svg](https://github.com/tqnonline/skills/blob/main/docs/assets/4d-diamond.svg). This is the shape `impact`, `architect`, `sdlc`, `deliver`, `assure`, `operate`, `maintain`, `safeguard`, and `shakedown` each run internally, threaded into their own procedures rather than replacing them.

## Discover

Establish what actually needs to be accomplished, from whoever is asking — an FDE, a PM handing off across the seam, or a user with a raw problem. This is `impact`'s own opening move: intake before anything is drafted, grounding the goal in the person who owns it rather than inventing one from an assumed default. A goal that skips Discover and starts from a guessed scope is the single most common cause of a downstream loop or graph running to completion against the wrong target.

## Define

Arrive at a baseline: what will be implemented, in what steps, and how it will execute — a decision the skill itself makes, or reaches together with the user, but never leaves implicit. This is where the execution shape gets chosen, not by intuition but by applying `orchestrate/RUBRIC.md`: loop when the work fits one artifact and one verifier, graph when there are independent workstreams or a high-consequence write needs its own human node, hybrid when neither cleanly fits. Be smart here — the shape is a routing decision with evidence behind it, not a default reached for out of habit. The baseline this phase produces is what `slice` turns into a work-item contract, and what a headless pod picks up cold.

## Design

Design the optimal delivery path once the baseline exists: break a complex technical problem into composable, bounded-domain components — services with clear boundaries, not a monolith wearing a diagram. Where a design choice trades one property against another — maintainability against delivery speed, reliability against complexity, an acceptable amount of technical debt against a tighter deadline — that tradeoff is shown to the user, not buried in an implementation detail nobody reviewed. `architect` and `safeguard` own this phase for cross-cutting technical and security design; the tradeoff itself surfaces through the same channel the pickup protocol already uses — a comment on the issue or PR, or directly in an interactive session — so the user sees the choice being made, not just its consequence.

## Deliver

Deliver exactly what the Discover-Define-Design baseline described, with completeness — every acceptance criterion met, every coverage floor cleared, nothing quietly descoped along the way. `deliver`, `assure`, `operate`, `maintain`, and `shakedown` each close this phase from their own angle: release readiness, quality assurance, operational readiness, ongoing maintenance, and the pre-merge check. Completeness is checked, not assumed — the same verification-before-completion discipline `shakedown/VERIFICATION.md` already holds every PR to.

## How this relates to the four gates

Discover-Define-Design-Deliver is orthogonal to Framing, Investment, Quality, and Commitment, not a replacement for them. The four gates are where a human signs off; Discover through Deliver is how a skill does its own work in the stretch between one gate and the next. A single gate-to-gate stretch can run this whole cycle once, or a large initiative can run it once per work item inside a single gate's scope — the cycle is the unit of self-maturing work, the gate is the unit of human approval, and neither substitutes for the other.
