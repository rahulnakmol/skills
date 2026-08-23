---
name: prd-draft
description: User-invoked PRD drafting from an approved epic manifest. Use to generate one PRD per epic with INVEST-compliant user stories, Given-When-Then acceptance criteria, success metrics, and a grill pass before the Quality gate.
---

# PRD Draft (user-invoked)

Draft one self-contained PRD per approved epic — no monolithic documents, no story without a named persona.

## When to invoke

- `carve` has produced an approved epic manifest
- The user asks to draft, write, or spec requirements for an epic

## Procedure

1. Read the epic manifest and the upstream understanding document or TOM
2. For each epic, populate all twelve sections (`PRD-SECTIONS.md`)
3. Write INVEST-compliant user stories with Given-When-Then acceptance criteria, including at least one error scenario per story
4. Run a grill pass — with-docs mode when a research corpus exists — before the Quality gate (`grill`)
5. Write the PRD and update the index; suggest `prd-validate` then `prd-review`

## Stop conditions

- No epic manifest exists — invoke `carve` first
- A story with only happy-path acceptance criteria

## Output contract

`specs/prd/{epic-name}-prd.md` per epic, plus `specs/prd/_prd-index.md` summarizing status and story count across all epics.

## Sibling skills

Reads from `carve`. This PRD may feed the developer group's `impact` pipeline for engineering inception, or go straight to `slice` when its acceptance criteria are already machine-checkable — see `impact/VALUE.md` for the seam. Hands off to `prd-validate` and `prd-review`.
