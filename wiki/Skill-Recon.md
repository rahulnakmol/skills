# Skill: Recon

**Group:** developer · **Invocation:** model-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/recon/SKILL.md)

Read-only brownfield reconnaissance. Produces a codebase brief — architecture, conventions, debt hot spots, integration points — without editing a single file, so `impact` and `architect` ground their work in what the estate actually looks like rather than what the PRD assumes it looks like.

## When to invoke

- A brownfield `impact` run, or an architecture decision, needs estate context before scoping starts
- The user asks for codebase orientation or wants modernization seams identified

## How it fits

`recon` is the brownfield pre-step in the Inception stage of the [role journey](Architecture-Role-Journey) — it runs before [impact](Skill-Impact) so the grill loop and the resulting PRD are grounded in real file ownership and real architectural boundaries, not guesses.

## Key references

- [TRIAGE.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/recon/TRIAGE.md) — signal-first archetype matching
- [references/signals/MARKERS.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/recon/references/signals/MARKERS.md) — the marker set used to match an estate to an archetype
- [PATTERNS.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/recon/PATTERNS.md) and `references/patterns/` — pattern cards (monolith, microservices, mainframe, AS400, monorepo, strangler, and more), loaded only on signal match, capped at three per run
- [BRIEF-FORMAT.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/recon/BRIEF-FORMAT.md) — the output shape `impact` and `architect` consume

## Sibling skills

Feeds [Impact](Skill-Impact) for brownfield PRDs and [Architect](Skill-Architect) for design grounded in the estate.
