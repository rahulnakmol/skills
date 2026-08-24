# The Product Constitution

The constitution is what keeps a PM's decisions coherent across a hundred agent-assisted sessions — the DNA of how a practice builds, ported from the source `philosophy` skill and reframed around a hierarchy that spans one practice and many initiatives.

## Two tiers of detail

Every constitution has a compact summary and a set of detailed section files, so downstream skills never pay the full context cost to stay aligned. Tier 1 is the compact summary — one to two sentences per section, under roughly a thousand tokens, read by every pm skill before it starts work. Tier 2 is the detailed section files, one per section, loaded only by the skill that needs that specific section: `discover` reads `principles.md`, `prd-draft` reads `positioning.md` and `cx-philosophy.md`, `prd-review` reads `cx-philosophy.md` to calibrate its 11-Star scoring, `carve` reads `prioritization-framework.md`, `tom-architect` reads `value-propositions.md`.

## The constitution hierarchy

Groundedness runs at two levels. The **overall constitution**, at the repository root's `specs/product-constitution.md` plus its seven detail files under `specs/constitution/`, states what the whole practice stands for. Each **initiative** carries its own constitution in its own `specs/` tree — per `INITIATIVE-REPO.md` — that inherits the overall constitution and records only what it overrides or adds: an initiative operating in a regulated market might tighten the CX philosophy's star target; one running under a fixed SOW might override the prioritization framework entirely. Every pm skill that reads a constitution reads the applicable chain, most-specific last, so an initiative override always wins over the practice default, and the practice default always wins over silence.

## The seven sections

Principles are three to five opinionated, conflict-resolving non-negotiables — not "be user-focused" but the specific trade-off the team actually makes when two good things compete. Value propositions map what value is delivered, to whom, against the jobs the customer hires the product to do. Positioning states the market category and names the competitive alternatives, because positioning that names no alternative differentiates nothing. CX philosophy sets the experience quality bar — the star level the practice aims for, in the terms `ELEVEN-STAR.md` uses. Building approach states the methodology, the craft standard, and what never gets skipped. The prioritization framework is the scoring model and its tiebreakers, the thing `carve` actually applies when two epics compete for the same slot. Research bets record current hypotheses with a conviction level and a validation status, so a bet nobody is tracking does not quietly become a belief.

## Review cadence

Every constitution file, overall or per-initiative, carries a `Last reviewed:` date and a next-review date no more than a quarter out — the cadence is at least quarterly, and it is enforced by discipline, not by a clock. Any pm skill that would load a constitution past its review date says so plainly to the user and offers Review mode instead of silently reasoning from a stale document — the same freshness discipline the model registry already applies to itself, applied here to product judgment. Review mode is a grill session run directly over the constitution's own claims: what held over the quarter, what the quarter's evidence refuted, what the research bets actually returned. The resulting changes never land as a silent edit; they land as a reviewable pull request, exactly as any other artifact change does per `INITIATIVE-REPO.md`.
