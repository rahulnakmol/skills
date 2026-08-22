# Skill: Deliver

**Group:** developer · **Invocation:** mixed-invoked specialist · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/deliver/SKILL.md)

Release-engineering charter for the secure-DevOps gate: CI/CD gates, supply-chain checks, and release readiness, producing a checklist with gate evidence and artifact hashes rather than a verbal "looks good to ship."

## When to invoke

- An SDLC gate requires deliver evidence
- A work item's pod charter names this role

## How it fits

`deliver` is part of the Secure DevOps stage of the [role journey](Architecture-Role-Journey), working the release-readiness checklist behind whatever [orchestrate](Skill-Orchestrate) has decided the graph's release gate looks like — including, where the write is high-consequence, the `human` node that has to sign off before the release actually happens.

## Key references

- [tools/opencode-workflows/templates/deliver.json](https://github.com/rahulnakmol/skills/blob/main/tools/opencode-workflows/templates/deliver.json) — the workflow-runner template this charter executes against

## Sibling skills

Runs alongside [Safeguard](Skill-Safeguard) and [Shakedown](Skill-Shakedown) at the Secure DevOps gate.
