# Skill: Recon

**Group:** developer · **Invocation:** model-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/recon/SKILL.md)

Recon carries out read-only reconnaissance on an existing codebase. It produces a brief covering the architecture, the conventions in use, hot spots of technical debt, and integration points, without editing a single file. The goal is to ground the work that follows in what the codebase actually looks like, rather than in what a PRD assumes it looks like.

## When to invoke

- A brownfield run of Impact, or an architecture decision, needs context about the existing estate before scoping begins.
- The user asks for orientation on an unfamiliar codebase, or wants candidate seams for modernization identified.

## How it fits

Recon is the brownfield step that precedes [Impact](Skill-Impact) in the Inception stage of the [role journey](Architecture-Role-Journey). It runs first so that the grill loop, and the PRD that follows it, are grounded in real file ownership and real architectural boundaries rather than in assumptions.

## Key references

- [TRIAGE.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/recon/TRIAGE.md) describes signal-first archetype matching.
- [references/signals/MARKERS.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/recon/references/signals/MARKERS.md) lists the markers used to match a codebase to an archetype.
- [PATTERNS.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/recon/PATTERNS.md) and `references/patterns/` hold pattern cards for architectures including monoliths, microservices, mainframes, AS/400 systems, monorepos, and strangler migrations. No more than three cards are loaded in a single run, and only on a signal match.
- [BRIEF-FORMAT.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/recon/BRIEF-FORMAT.md) defines the output format that Impact and Architect consume.

## Sibling skills

Recon supplies briefs to [Impact](Skill-Impact) for brownfield PRDs and to [Architect](Skill-Architect) for design work grounded in the existing estate.
