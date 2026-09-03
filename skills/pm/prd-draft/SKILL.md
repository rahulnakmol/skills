---
name: prd-draft
description: User-invoked PRD drafting and structural validation from an approved epic manifest. Use to generate one PRD per epic with INVEST-compliant user stories, Given-When-Then acceptance criteria, success metrics, and a grill pass, then to run the nine-check structural validation that ends in a PASS, PASS WITH WARNINGS, or FAIL verdict before the Quality gate. Also use to check, validate, or confirm the completeness of a PRD that already exists.
---

# PRD Draft (user-invoked)

Draft one self-contained PRD per approved epic, then validate its structure — no monolithic documents, no story without a named persona.

## Contract

```yaml
contract:
  invocation: user
  thesis: gate
  verbs: [read, write-repo]
  scope: owns
  trace: none
```

## When to invoke

- `carve` has produced an approved epic manifest
- The user asks to draft, write, or spec requirements for an epic
- The user asks to check or validate the structural completeness of an existing PRD

## Procedure

1. Define/Design phase per `DDDD.md`: read the epic manifest and the upstream understanding document or TOM
2. For each epic, populate all twelve sections (`PRD-SECTIONS.md`)
3. Write INVEST-compliant user stories with Given-When-Then acceptance criteria, including at least one error scenario per story
4. Run a grill pass — with-docs mode when a research corpus exists — before the Quality gate (`grill`)
5. Run the structural validation pass in `VALIDATION.md`: all nine checks, no short-circuit, each recorded as a gate row, ending in a PASS, PASS WITH WARNINGS, or FAIL verdict
6. On FAIL, redraft the PRD and validate again; validation reports, it never repairs the document it checks
7. Write the PRD and its validation report, update the index, and suggest `prd-review`

## Stop conditions

- No epic manifest exists — invoke `carve` first
- A story with only happy-path acceptance criteria
- A FAIL verdict handed onward — `prd-review` scores ambition, not structure, so a structurally broken PRD is redrafted first

## Output contract

`specs/prd/{epic-name}-prd.md` per epic, `specs/prd/{epic-name}-validation.md` carrying the nine-item checklist and its verdict, plus `specs/prd/_prd-index.md` summarizing status and story count across all epics.

## Sibling skills

Reads from `carve`. This PRD may feed the developer group's `impact` pipeline for engineering inception, or go straight to `slice` when its acceptance criteria are already machine-checkable — see `core/VALUE.md` for the seam. Hands off to `prd-review`.
