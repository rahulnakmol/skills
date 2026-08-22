# Skill: Operate

**Group:** developer · **Invocation:** mixed-invoked specialist · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/operate/SKILL.md)

Reliability-engineering charter: SLOs, instrumentation, and incident readiness, producing an operate brief with an SLO table, dashboards, and runbooks rather than an aspirational "we should monitor this."

## When to invoke

- An SDLC gate requires operate evidence
- A work item's pod charter names this role

## How it fits

`operate` is the Reliability stage of the [role journey](Architecture-Role-Journey) — it is also where [slice](Skill-Slice)'s mandatory operability lane (observability, SLOs, runbooks) gets exercised in production rather than merely planned at slicing time. Findings from live incidents re-enter the backlog as continuous-improvement items, the same as [Assure](Skill-Assure)'s do.

## Key references

- [adapters/opencode/agents/operate.md](https://github.com/rahulnakmol/skills/blob/main/adapters/opencode/agents/operate.md) — the executable operations protocol
- [slice/OPERABILITY.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/slice/OPERABILITY.md) — the operability lane this skill's evidence traces back to

## Sibling skills

Feeds continuous-improvement items back into [Slice](Skill-Slice); works alongside [Maintain](Skill-Maintain) on the post-release side of the journey.
