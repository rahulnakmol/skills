# Skill: Architect

**Group:** developer · **Invocation:** mixed-invoked specialist · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/architect/SKILL.md)

Architect is the charter for the design gate. It leads cross-cutting technical design and produces decision packs suitable for an architecture decision record, including non-functional requirements and interface contracts. The executable detail behind this charter lives in its adapter, not in the charter document itself.

## When to invoke

- A gate in the SDLC loop requires evidence from the architect role.
- A work item's pod charter names this role.

## How it fits

Architect carries out the Design stage of the [role journey](Architecture-Role-Journey). It consumes the brief that [Recon](Skill-Recon) produces for a brownfield estate, leads the Engineering Constraints, Components, and technical Trade-offs sections of the SPEC-TS ledger, and calls Responsible AI Governance the moment the work touches a regulated context or a consequential decision.

## Key references

- [adapters/opencode/agents/architect.md](https://github.com/rahulnakmol/skills/blob/main/adapters/opencode/agents/architect.md) contains the executable design-review protocol.
- [sdlc/METHOD.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/sdlc/METHOD.md) describes the SPEC-TS ledger that Architect co-owns.

## How to use

Architect engages when an SDLC gate requires design evidence or a work item's pod charter names the role; you can also invoke it directly for a design decision that needs an ADR. Give it the recon brief on brownfield estates — design against the real codebase, not the remembered one.

## Best practices

- Run both design passes: a candidate approach and an adversarial challenge against it. A design that never met an opponent is a first draft.
- Record significant decisions as ADRs with the alternatives and their consequences, not just the winner.
- Escalate to the governance overlay the moment the design touches a regulated context — retrofitting audit and explainability costs more than designing them in.

## Sibling skills

Architect consumes briefs from [Recon](Skill-Recon) and feeds design evidence to [SDLC](Skill-SDLC) and [Slice](Skill-Slice).
