# Skill: Operate

**Group:** developer · **Invocation:** mixed-invoked specialist · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/developer/operate/SKILL.md)

Operate is the reliability-engineering charter. It covers service-level objectives, instrumentation, and incident readiness, and it produces a brief that includes an SLO table, dashboards, and runbooks, rather than a general statement that monitoring should exist.

## When to invoke

- A gate in the SDLC loop requires evidence from the operate role.
- A work item's pod charter names this role.

## How it fits

Operate carries out the Reliability stage of the [role journey](Architecture-Role-Journey). It is also where the operability lane that [Slice](Skill-Slice) requires — observability, service-level objectives, and runbooks — is put into practice in production, rather than only planned at the time of slicing. Findings from live incidents return to the backlog as continuous-improvement items, in the same way that [Assure](Skill-Assure)'s findings do.

## Key references

- [adapters/opencode/agents/operate.md](https://github.com/tqnonline/skills/blob/main/adapters/opencode/agents/operate.md) contains the executable operations protocol.
- [slice/OPERABILITY.md](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/OPERABILITY.md) describes the operability lane this skill's evidence traces back to.

## How to use

Operate engages at the reliability gate and in production afterward. Its brief — an SLO table, dashboards, runbooks — is the operability lane made real: what `slice` planned, this skill proves is running.

## Best practices

- Give every service boundary an SLO with an owner and an alert threshold; instrumentation without a threshold is decoration.
- Carry a correlation identifier on every agent run and automated decision, so one request traces end to end.
- Route incident findings back into the backlog as improvement items — the loop from production to planning is this skill's whole point.

## Sibling skills

Operate feeds continuous-improvement items back into [Slice](Skill-Slice) and works alongside [Maintain](Skill-Maintain) on the post-release side of the journey.
