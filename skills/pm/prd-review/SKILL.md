---
name: prd-review
description: User-invoked PRD quality reviewer using the 11-Star Experience Framework. Use to score a PRD across seven weighted dimensions and map its features to star levels, informing but never replacing the human decision at the Quality gate.
---

# PRD Review (user-invoked)

Score a PRD's ambition and completeness — the score informs, a human approves.

## When to invoke

- A PRD has passed the structural validation `prd-draft` runs (`prd-draft/VALIDATION.md`)
- The user asks to review, assess, score, or rate a PRD's quality or ambition

## Procedure

1. Receive: read the full PRD, inventory features and stories
2. Assess: map each feature to a star level, trace the customer journey, identify delight moments (`ELEVEN-STAR.md`)
3. Score: rate the seven weighted dimensions and calculate the composite
4. Recommend: prioritized improvement suggestions (P0-P3), each naming what to change, why, and the expected star-level impact
5. Report: write the review; if the verdict is Major Revision or worse, hand it back to `prd-draft`

## Stop conditions

- Scoring before completing the star-level mapping
- Every dimension landing within one point of every other — recalibrate

## Output contract

`specs/prd/{epic-name}-review.md`: executive summary, star spectrum map, seven dimension scores, qualitative assessment, prioritized improvement suggestions, verdict.

## Sibling skills

Reads from `prd-draft`, after that skill's structural validation pass returns PASS or PASS WITH WARNINGS. Its score is one input to the human decision at the Quality gate (`GATES.md`); approval stays human even at a high score.
