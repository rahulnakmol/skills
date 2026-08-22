---
name: slice
description: Model-invoked PRD decomposition into epics, features, stories, and operability items conforming to WORK-ITEM-CONTRACT. Use after impact PRD sign-off.
---

# Slice (model-invoked)

Decompose an approved PRD into backlog-ready items.

## When to invoke

- PRD gate G2 signed (`impact/GATES.md`)
- User requests backlog breakdown

## Procedure

1. Validate PRD sign-off
2. Apply `TEMPLATES.md` per item type
3. Attach operability items per `OPERABILITY.md`
4. Embed `WORK-ITEM-CONTRACT.md` sections in each item body
5. Hand off to `raise`

## Stop conditions

- Missing PRD approval → refuse; return to `impact`
- Item missing contract section → do not publish

## Output contract

YAML or markdown backlog bundle ready for `raise`.

## Sibling skills

- `impact`, `raise`, `orchestrate`
