# Skill: Deliver

**Group:** developer · **Invocation:** mixed-invoked specialist · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/deliver/SKILL.md)

Deliver is the release-engineering charter for the secure-DevOps gate. It covers continuous integration and delivery gates, supply-chain checks, and release readiness, and it produces a checklist backed by gate evidence and artifact hashes, rather than a verbal sign-off.

## When to invoke

- A gate in the SDLC loop requires evidence from the deliver role.
- A work item's pod charter names this role.

## How it fits

Deliver is part of the Secure DevOps stage of the [role journey](Architecture-Role-Journey). It works through the release-readiness checklist behind whatever release gate [Orchestrate](Skill-Orchestrate) has built into the graph, including, for a high-consequence write, the `human` node that must sign off before the release takes place.

## Key references

- [tools/opencode-workflows/templates/deliver.json](https://github.com/rahulnakmol/skills/blob/main/tools/opencode-workflows/templates/deliver.json) is the workflow-runner template this charter runs against.

## Sibling skills

Deliver runs alongside [Safeguard](Skill-Safeguard) and [Shakedown](Skill-Shakedown) at the Secure DevOps gate.
