---
name: assure
description: Quality and maintainability assurance.
---

# Assure (mixed-invoked specialist)

Charter skill for the assure lane; execution detail in adapters.

## When to invoke

- SDLC gate requires assure evidence
- Work item pod charter names this role

## Procedure

1. Load adapter: `adapters/opencode/agents/quality.md`
2. Follow SPEC-TS and human gates in `sdlc/METHOD.md`
3. Regulated context → `responsible-ai-governance`

## Stop conditions

- Missing scope or SPEC-TS → stop
- Critical findings → escalate per adapter `-max` / verifier path

## Output contract

Quality report with test gaps and tech-debt items for slice.

## Sibling skills

- `sdlc`, `orchestrate`, `slice`
