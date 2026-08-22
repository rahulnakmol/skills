---
name: operate
description: SLOs, instrumentation, incident readiness.
---

# Operate (mixed-invoked specialist)

Charter skill for the operate lane; execution detail in adapters.

## When to invoke

- SDLC gate requires operate evidence
- Work item pod charter names this role

## Procedure

1. Load adapter: `adapters/opencode/agents/operate.md`
2. Follow SPEC-TS and human gates in `sdlc/METHOD.md`
3. Regulated context → `responsible-ai-governance`

## Stop conditions

- Missing scope or SPEC-TS → stop
- Critical findings → escalate per adapter `-max` / verifier path

## Output contract

Operate brief: SLO table, dashboards, runbooks.

## Sibling skills

- `sdlc`, `orchestrate`, `slice`
