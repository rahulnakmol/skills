---
name: prd-validate
description: Model-invoked PRD structural validator. Reads a PRD and checks it against the required-structure checklist, producing a pass/fail report without modifying the PRD. Use after prd-draft, before prd-review.
---

# PRD Validate (model-invoked)

Check a PRD's structure against the checklist — read-only, never rewrites.

## When to invoke

- `prd-draft` has produced one or more PRDs
- The user asks to check or validate PRD completeness

## Procedure

1. Locate the PRD file, or glob for all PRDs in `specs/prd/` if no path is given
2. Run all nine structural checks: twelve sections present, every story has a named persona, every story has three to eight Given-When-Then acceptance criteria, every story has priority and complexity, every feature has a star level, at least three success metrics, at least one fully detailed risk, no open question without an owner, scope in/out both populated
3. Never skip a check to short-circuit on the first failure
4. Write the report with a verdict: PASS, PASS WITH WARNINGS, or FAIL (any critical check — 1, 2, 3, or 4 — failing is always FAIL)
5. Present the summary; on FAIL, suggest returning to `prd-draft`

## Stop conditions

- Any temptation to fix an issue directly — report it instead

## Output contract

`specs/prd/{epic-name}-validation.md`: nine-item checklist with pass/fail, specific issues per failure, and a summary verdict.

## Sibling skills

Reads from `prd-draft`. Precedes `prd-review`.
