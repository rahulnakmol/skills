---
name: maintain
description: Patch cadence and debt burn-down.
---

# Maintain (mixed-invoked specialist)

Charter skill for the maintain lane; execution detail in adapters.

## When to invoke

- SDLC gate requires maintain evidence
- Work item pod charter names this role

## Procedure

1. Load adapter: `tools/opencode-workflows/templates/maintenance.json`
2. Follow SPEC-TS and human gates in `sdlc/METHOD.md`
3. Regulated context → `responsible-ai-governance`

See `CADENCE.md` for schedule.

## Stop conditions

- Missing scope or SPEC-TS → stop
- Critical findings → escalate per adapter `-max` / verifier path

## Output contract

Maintenance plan with prioritized CI items.

## Sibling skills

- `sdlc`, `orchestrate`, `slice`
