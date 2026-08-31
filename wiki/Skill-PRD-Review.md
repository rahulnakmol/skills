# Skill: PRD Review

**Group:** pm · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-review/SKILL.md)

PRD Review scores a validated PRD against the 11-Star Experience Framework: a qualitative star-level mapping of every feature plus a quantitative score across seven weighted dimensions, landing on a verdict from Reject through Exemplary.

## When to invoke

- A PRD has passed the structural validation `prd-draft` runs.
- The user asks to review, assess, score, or rate a PRD's quality or ambition.

## How it fits

PRD Review's score is one input to the human decision at the Quality gate — never a replacement for it. Approval stays human even at a 9.0, because a high score tells the human where to look, not what to decide.

## Key references

- [ELEVEN-STAR.md](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-review/ELEVEN-STAR.md) covers the 1-to-11 scale, the seven weighted dimensions, and the five verdict bands.

## How to use

Run PRD Review after the structural validation in `prd-draft` passes. It maps every feature to a star level, traces the customer journey, scores the seven dimensions, and produces prioritized P0-P3 improvement suggestions — each naming what to change, why, and the expected star-level impact.

## Best practices

- Complete the star-level mapping before scoring — it informs Ambition, Differentiation, and Story Quality.
- Recalibrate if every dimension lands within one point of every other; real PRDs have real weaknesses.
- Watch for star inflation — matching a competitor's feature is star 5, not star 7.

## Sibling skills

Reads from [PRD Draft](Skill-PRD-Draft), after its structural validation passes. Informs the human decision at the Quality gate.
