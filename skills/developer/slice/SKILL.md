---
name: slice
description: Model-invoked PRD decomposition into epics, features, stories, and operability items conforming to WORK-ITEM-CONTRACT. Use after impact PRD sign-off.
---

# Slice (model-invoked)

Decompose an approved PRD into backlog-ready items.

## Contract

```yaml
contract:
  invocation: model
  thesis: scaffold
  verbs: [read, write-repo]
  scope: guest
  trace: cut
```

## When to invoke

- PRD gate G2 signed (`impact/GATES.md`)
- User requests backlog breakdown

## Procedure

1. Validate PRD sign-off
2. Read the PRD's Risk and governance tier; when `limited` or `high`, `Call the Skill tool with "responsible-ai-governance"` and populate the Governance section plus governance-lane items (`OPERABILITY.md`) in every affected work item
3. Apply `TEMPLATES.md` per item type
4. Attach operability items per `OPERABILITY.md`
5. Embed `WORK-ITEM-CONTRACT.md` sections in each item body
6. Hand off to `raise`

Report the trace entry under the `cut` kind for the session that owns the scope to append: where each capability boundary fell, the decomposition rejected in its favor, and the dependency order chosen. The manifest carries the surviving cut; the owning session records the one that lost.

## Stop conditions

- Missing PRD approval → refuse; return to `impact`
- Item missing contract section → do not publish

## Output contract

YAML or markdown backlog bundle ready for `raise`.

## Sibling skills

- `impact`, `raise`, `conduct`
