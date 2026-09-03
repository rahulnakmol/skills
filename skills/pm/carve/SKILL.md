---
name: carve
description: Model-invoked epic decomposition from a Business Understanding Document or a TOM's maturity gaps. Use to carve DIVE-tested epics into a manifest before PRDs are drafted, one epic at a time.
---

# Carve (model-invoked)

Carve epics from the Business Understanding Document, or from TOM maturity gaps, and pass every one through DIVE.

## Contract

```yaml
contract:
  invocation: model
  thesis: gate
  verbs: [read, write-repo]
  scope: owns
  trace: dive
```

## When to invoke

- `map` has produced an understanding document (product hat) or `tom-architect` has produced a TOM (transformation hat)
- The user asks to break an initiative down into epics

## Procedure

1. Define phase per `DDDD.md`: detect the input: understanding document only, understanding document plus TOM, or direct input with no upstream artifacts
2. Extract candidate epics — recommended epics under the product hat, maturity-gap epics under the transformation hat
3. Validate every candidate against DIVE — Deliverable, Independent, Valuable, Estimable (`DIVE.md`); split or reject failures. Record each DIVE verdict with the evidence that produced it, gate discipline per `grit/LEDGER.md`.
4. Order the manifest by business value or by gap priority
5. Grill the manifest before presenting it (`grill`) — a manifest that has not been pressure-tested is a draft, not a commitment
6. Present the ordered list for user approval; do not write until approved
7. Write the epic manifest and suggest `prd-draft` as the next step

## Stop conditions

- More than eight epics — this is a program, not a project; escalate to the user
- An epic with no named persona

## Output contract

`specs/prd/{prefix}-epic-manifest.md`: ordered epics, each with name, scope in/out, personas, dependencies, DIVE validation summary.

## Sibling skills

Reads from `map` or `tom-architect`. The manifest is approved together with the case at the Investment gate (`GATES.md`). Hands off to `prd-draft`.
