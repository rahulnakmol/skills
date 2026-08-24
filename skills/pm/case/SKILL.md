---
name: case
description: User-invoked business case builder. Use to weigh at least two real options plus do-nothing, cost each including the agent fleet's own cost, and prepare the case the sponsor approves at the Investment gate.
---

# Case (user-invoked)

Build the business case the sponsor approves — options, costs, benefits, and the assumption that could break the recommendation.

## When to invoke

- An epic manifest or TOM is ready and needs sponsor investment approval
- The user asks to build a case, justify spend, or weigh options

## Procedure

1. Design phase per `DDDD.md`: name at least two real options plus the do-nothing option (`CASE-METHOD.md`)
2. Cost each option: build, run, opportunity, and agent-fleet cost (`COSTING.md`)
3. Commission evidence where the cost or benefit estimate is thin (`RESEARCH-AGENTS.md`), routing each commissioned agent's model tier through `model-routing`
4. Trace each option's benefits forward to what `realize` will later hold accountable
5. Run the sensitivity analysis — the one assumption that would kill the recommendation
6. Grill the case before presenting it (`grill`)
7. Present to the sponsor for approval at the Investment gate

## Stop conditions

- Only one real option presented — a case is a comparison, not a pitch
- A benefit claimed with no way to measure it later

## Output contract

`specs/{prefix}-case.md`: options, do-nothing baseline, costs and benefits, sensitivity, recommendation.

## Sibling skills

Reads from `carve` or `tom-architect`. Approved alongside the epic manifest at the Investment gate (`GATES.md`). Feeds `realize`'s benefit register.
