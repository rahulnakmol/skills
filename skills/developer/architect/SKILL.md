---
name: architect
description: Cross-cutting technical design, ADRs, decomposition. Use at design gate or from recon brief.
---

# Architect (model-invoked)

Charter skill for the architect lane; execution detail in adapters.

## When to invoke

- SDLC gate requires architect evidence
- Work item pod charter names this role

## Procedure

1. Discover and Define per `DDDD.md` before designing: confirm the PRD's functional and non-functional requirements and their scope boundary; ideate any gap with the user rather than assuming one
2. Load adapter: `adapters/opencode/agents/architect.md`
3. Decompose into composable, bounded-domain components; surface maintainability, reliability, and tech-debt tradeoffs to the user via an issue/PR comment or the interactive session, not silently in the diagram
4. Follow SPEC-TS and human gates in `sdlc/METHOD.md`
5. Regulated context → `responsible-ai-governance`

## Stop conditions

- Missing scope or SPEC-TS → stop
- Functional or non-functional requirements not yet boundaried → stop and ideate with the user first
- Critical findings → escalate per adapter `-max` / verifier path

## Output contract

Produce ADR-ready design pack: functional and non-functional requirements with their scope boundary, component decomposition, tradeoffs, and interface contracts.

## Sibling skills

- `sdlc`, `conduct`, `slice`
