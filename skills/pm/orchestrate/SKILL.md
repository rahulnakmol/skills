---
name: orchestrate
description: Model-invoked execution-shape routing for the pm group. Choose grill-loop, parallel-fan, or hybrid before a discovery, case, TOM, or PRD round begins. Use for multi-round pm work beyond a single grill session.
---

# Orchestrate (model-invoked)

Select the execution shape a piece of pm work should run in — no dynamic-workflow automation, the decision itself.

## When to invoke

- A discovery, case, TOM, or PRD effort spans more than one grill round or research commission
- `discover`, `case`, `tom-architect`, or `prd-draft` needs a routing decision before it starts

## Procedure

1. Apply `RUBRIC.md` → grill-loop | parallel-fan | hybrid
2. Grill-loop: route to `grill` for the round protocol; one line of questioning, human-judged convergence
3. Parallel-fan: commission independent research or provoked hypotheses per `RESEARCH-AGENTS.md`, genuinely independent branches only
4. Per step: `Call the Skill tool with "model-routing"` — a mechanical pass and a judgment pass do not need the same tier
5. High-consequence artifacts route through their gate's human sign-off (`GATES.md`) regardless of shape

## Stop conditions

- No human convergence point identified → stop; the work has no shape to route
- A parallel-fan whose branches are not actually independent → collapse to grill-loop instead

## Output contract

```yaml
mode: grill-loop|parallel-fan|hybrid
why: "<the routing question that decided it>"
gate: <the GATES.md gate this feeds, if any>
```

## Sibling skills

- `grill` — the round protocol grill-loop mode routes into
- `model-routing` — tier resolution, shared with the developer group
