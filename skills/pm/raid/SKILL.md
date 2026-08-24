---
name: raid
description: User-invoked RAID register maintainer — Risks, Assumptions, Issues, Dependencies. Use to keep the four registers current and to generate the two-minute sponsor status narrative directly from them.
---

# RAID (user-invoked)

Maintain the four registers that keep an initiative's derailment risks visible, owned, and mitigated.

## When to invoke

- A new risk, assumption, issue, or dependency surfaces during delivery
- The user asks for a status update or a sponsor narrative

## Procedure

1. Log the entry in the correct register with an owner and, for risks, a mitigation (`RAID-METHOD.md`)
2. For dependencies, keep the entry current — `roadmap` reads this register directly for its sequencing
3. Review entries with no recent movement; escalate stalled issues to their owner
4. Generate the sponsor status narrative directly from the four registers, never hand-assembled separately

## Stop conditions

- A risk logged with no owner
- A narrative drafted from memory instead of the register

## Output contract

`specs/{prefix}-raid.md`: four registers plus the current status narrative generated from them.

## Sibling skills

Feeds `roadmap`'s dependency board and `report`'s Problems and Priorities sections.
