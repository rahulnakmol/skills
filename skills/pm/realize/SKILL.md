---
name: realize
description: User-invoked benefits realization tracker. Use to maintain the benefits register against case and PRD projections, track leading indicators and actuals, roll up to the north star, and loop variance back into new work.
---

# Realize (user-invoked)

Track whether the initiative actually delivered what the case said it would.

## When to invoke

- An initiative is live and its benefits need tracking against projection
- The user asks for a benefits update, a north-star rollup, or a PI review

## Procedure

1. Deliver phase per `DDDD.md`: enter every case-projected benefit into the register with its trace back to the case and PRD (`BENEFITS.md`)
2. Attach at least one leading indicator per benefit
3. Record actuals as they arrive; compare against `COSTING.md`'s projections on both cost and benefit. Each actual is evidence against the case's projected benefit, and an unmet projection is reported unmet rather than resized to fit.
4. Roll every benefit up to the north star — efficiency and productivity as transformation value
5. Where a variance is significant, open it as new work in `discover` or `carve`, with its own case

## Stop conditions

- A benefit with no leading indicator
- An initiative that cannot state its north-star contribution — raise it in the grill instead

## Output contract

`specs/{prefix}-benefits.md`: benefits register, leading indicators, actuals against projection, north-star rollup, open variances.

## Sibling skills

Reads from `case`. Feeds `report`'s Value first section. Loops variance back into `discover` and `carve`.
