---
name: architect
description: Cross-cutting technical design, ADRs, decomposition. Use at design gate or from recon brief.
---

# Architect (mixed-invoked specialist)

Charter skill for the architect lane; execution detail in adapters.

## When to invoke

- SDLC gate requires architect evidence
- Work item pod charter names this role

## Procedure

1. Load adapter: `adapters/opencode/agents/architect.md`
2. Follow SPEC-TS and human gates in `sdlc/METHOD.md`
3. Regulated context → `responsible-ai-governance`

## Stop conditions

- Missing scope or SPEC-TS → stop
- Critical findings → escalate per adapter `-max` / verifier path

## Output contract

Produce ADR-ready design pack with NFRs and interface contracts.

## Sibling skills

- `sdlc`, `orchestrate`, `slice`
