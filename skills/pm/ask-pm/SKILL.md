---
name: ask-pm
description: User-invoked skill router for the pm group. Maps intent to the correct pm skill. Use when unsure which pm skill to run.
---

# Ask PM (user-invoked)

Route user intent to the right skill in the pm group.

## When to invoke

- User asks "which pm skill" or describes a goal without naming a skill

## Procedure

1. Classify intent: constitution | discovery | mapping | operating model | epics | PRD authoring | PRD checking | PRD scoring | business case | roadmap | risk/status | benefits | leadership reporting | pressure-test
2. Map to skill:
   - practice or initiative grounding → `constitution`
   - problem discovery → `discover`
   - personas or process flows → `map`
   - target operating model → `tom-architect`
   - epic breakdown → `carve`
   - PRD authoring → `prd-draft`
   - PRD structural check → `prd-validate`
   - PRD quality scoring → `prd-review`
   - investment justification → `case`
   - sequencing or PI planning → `roadmap`
   - risks, assumptions, issues, dependencies → `raid`
   - benefits or north-star tracking → `realize`
   - leadership update or steering pack → `report`
   - "challenge this / pressure-test this" → `grill`
3. Ask which hat — product or transformation — only when genuinely ambiguous; classification is normally `discover`'s job
4. Hand across the seam to `slice`/`raise` at Commitment, or to `impact` when engineering inception is needed
5. `Call the Skill tool` with the chosen name

## Stop conditions

- Ambiguous intent → ask one clarifying question, then route

## Output contract

Chosen skill name plus one-sentence rationale.

## Sibling skills

Routes to every pm skill; hands off to the developer group's `impact`, `slice`, and `raise` at the seam.
