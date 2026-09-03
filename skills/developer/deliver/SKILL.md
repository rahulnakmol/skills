---
name: deliver
description: Model-invoked charter for the delivery lane — continuous integration and delivery, supply chain, and release readiness. Use at the delivery gate to check a repository against the readiness checklist, ship a multi-concern change as a stack of dependency-ordered pull requests, resolve a merge or rebase conflict by intent, and record release evidence.
---

# Deliver (model-invoked)

Charter skill for the deliver lane; execution detail in adapters.

## Contract

```yaml
contract:
  invocation: model
  thesis: evidence
  verbs: [read, write-repo, write-tracker, publish]
  scope: owns
  trace: resolution
```

## When to invoke

- SDLC gate requires deliver evidence
- Work item pod charter names this role

## Procedure

1. Deliver phase per `DDDD.md`: verify the target repository against `REPO-SETUP.md` (Code Quality on its separate Actions path, `gh stack` tooling, pickup-protocol labels, shakedown workflow); record the result as gate evidence and set up what is missing
2. Load adapter: `tools/opencode-workflows/templates/deliver.json`
3. Follow SPEC-TS and human gates in `sdlc/METHOD.md`
4. A change spanning more than one concern, or too large for one review, always ships as a stack of dependency-ordered PRs, never one giant diff — see `STACKING.md`, now backed by GitHub's native stacked-PR public preview
5. Every PR, stacked or single, states its coverage and use-case traceability per `slice/WORK-ITEM-CONTRACT.md` before it is raised
6. A merge or rebase that halts on conflict markers → `MERGE.md`: resolve each hunk by the intent behind both sides, never by whichever side reads better, and never by aborting
7. Commit-time guardrails belong to the same readiness pass as step 1 → `REPO-SETUP.md`: fast pre-commit hooks, and destructive git commands blocked before they execute
8. Regulated context → `responsible-ai-governance`

## Stop conditions

- Missing scope or SPEC-TS → stop
- Critical findings → escalate per adapter `-max` / verifier path

## Output contract

Release checklist with gate evidence and artifact hashes.

## Sibling skills

- `sdlc`, `conduct`, `slice`
