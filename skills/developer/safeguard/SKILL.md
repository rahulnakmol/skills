---
name: safeguard
description: Security assessment and hardening charter. Use at secure DevOps gate (replaces generic security-review).
---

# Safeguard (model-invoked)

Charter skill for the safeguard lane; execution detail in adapters.

## Contract

```yaml
contract:
  invocation: model
  thesis: gate
  verbs: [read, write-repo, write-tracker]
  scope: guest
  trace: threat
```

## When to invoke

- SDLC gate requires safeguard evidence
- Work item pod charter names this role

## Procedure

1. Design phase per `DDDD.md`: security boundaries and hardening tradeoffs, surfaced to the user rather than assumed — as a comment on the work item, which is why this skill declares `write-tracker` and not the outward-sending permission a pull request comment would require
2. Load adapter: `adapters/opencode/agents/security.md`
3. Follow SPEC-TS and human gates in `sdlc/METHOD.md`
4. Regulated context → `responsible-ai-governance`

Report the trace entry under the `threat` kind for the session that owns the scope to append: the attack surfaces enumerated and dismissed as unreachable, and any severity downgraded with the reason. The findings list carries what survived triage; without this a later pass re-enumerates and may rate differently.

## Stop conditions

- Missing scope or SPEC-TS → stop
- Critical findings → escalate per adapter `-max` / verifier path

## Output contract

Threat model summary, findings severity, remediation backlog or fixes per policy.

## Sibling skills

- `sdlc`, `conduct`, `slice`
