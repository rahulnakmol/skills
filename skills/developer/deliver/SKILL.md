---
name: deliver
description: CI/CD, supply chain, and release readiness.
---

# Deliver (mixed-invoked specialist)

Charter skill for the deliver lane; execution detail in adapters.

## When to invoke

- SDLC gate requires deliver evidence
- Work item pod charter names this role

## Procedure

1. Load adapter: `tools/opencode-workflows/templates/deliver.json`
2. Follow SPEC-TS and human gates in `sdlc/METHOD.md`
3. Regulated context → `responsible-ai-governance`

## Stop conditions

- Missing scope or SPEC-TS → stop
- Critical findings → escalate per adapter `-max` / verifier path

## Output contract

Release checklist with gate evidence and artifact hashes.

## Sibling skills

- `sdlc`, `orchestrate`, `slice`
