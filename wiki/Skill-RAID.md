# Skill: RAID

**Group:** pm · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/pm/raid/SKILL.md)

RAID maintains the four registers that keep an initiative's derailment risks visible and owned — Risks, Assumptions, Issues, Dependencies — and generates the two-minute sponsor status narrative directly from them, never hand-assembled twice.

## When to invoke

- A new risk, assumption, issue, or dependency surfaces during delivery.
- The user asks for a status update or a sponsor narrative.

## How it fits

RAID's dependency register is what `roadmap` reads directly for sequencing, and its Risks and Issues feed `report`'s Problems section. It is the single source of truth the status narrative is generated from — if the narrative and the register disagree, the register is right.

## Key references

- [RAID-METHOD.md](https://github.com/tqnonline/skills/blob/main/skills/pm/raid/RAID-METHOD.md) covers all four registers and how the status narrative is generated from them.

## How to use

Log entries as they surface — every risk needs a likelihood, impact, owner, and mitigation; every dependency needs the external party it depends on. When a status update is due, generate the narrative directly from the current register state rather than writing one from memory.

## Best practices

- Never log a risk with no owner — an unowned risk is not actually managed.
- Escalate an issue that has shown no movement across several reporting cycles.
- Generate the narrative from the register every time, not from what you remember changed.

## Sibling skills

Feeds `roadmap`'s dependency board and `report`'s Problems and Priorities sections.
