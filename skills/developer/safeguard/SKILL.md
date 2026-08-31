---
name: safeguard
description: Security assessment and hardening charter. Use at secure DevOps gate (replaces generic security-review).
---

# Safeguard (mixed-invoked specialist)

Charter skill for the safeguard lane; execution detail in adapters.

## When to invoke

- SDLC gate requires safeguard evidence
- Work item pod charter names this role

## Procedure

1. Design phase per `DDDD.md`: security boundaries and hardening tradeoffs, surfaced to the user rather than assumed
2. Load adapter: `adapters/opencode/agents/security.md`
3. Follow SPEC-TS and human gates in `sdlc/METHOD.md`
4. Regulated context → `responsible-ai-governance`

## Stop conditions

- Missing scope or SPEC-TS → stop
- Critical findings → escalate per adapter `-max` / verifier path

## Output contract

Threat model summary, findings severity, remediation backlog or fixes per policy.

## Sibling skills

- `sdlc`, `conduct`, `slice`
