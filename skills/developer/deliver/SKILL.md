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

1. Verify the target repository against `REPO-SETUP.md` (Code Quality on its separate Actions path, `gh stack` tooling, pickup-protocol labels, shakedown workflow); record the result as gate evidence and set up what is missing
2. Load adapter: `tools/opencode-workflows/templates/deliver.json`
3. Follow SPEC-TS and human gates in `sdlc/METHOD.md`
4. A change spanning more than one concern, or too large for one review, always ships as a stack of dependency-ordered PRs, never one giant diff — see `STACKING.md`, now backed by GitHub's native stacked-PR public preview
5. Every PR, stacked or single, states its coverage and use-case traceability per `slice/WORK-ITEM-CONTRACT.md` before it is raised
6. Regulated context → `responsible-ai-governance`

## Stop conditions

- Missing scope or SPEC-TS → stop
- Critical findings → escalate per adapter `-max` / verifier path

## Output contract

Release checklist with gate evidence and artifact hashes.

## Sibling skills

- `sdlc`, `orchestrate`, `slice`
