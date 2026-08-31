---
name: operate
description: Charter for a system after it is built — reliability, quality, and maintenance in one lane. Covers service-level objectives, error budgets, instrumentation, dashboards, runbooks, on-call and incident readiness; quality assurance of the SPEC-TS ledger, test gaps, coverage floors, and technical-debt findings; and patch cadence, dependency updates, and debt burn-down. Use when asked to set or review SLOs, add monitoring or alerting, write or rehearse a runbook, prepare for an incident or work its follow-up, check whether requirements are testable, find test gaps or quality risks in a slice, plan a patch or dependency-update cycle, or reduce technical debt.
---

# Operate (mixed-invoked specialist)

Charter skill for the post-release lane — reliability, quality, and maintenance; execution detail in adapters.

The three concerns sit in one charter because they run one loop: each measures the delivered system against the same Design baseline, and each returns its findings to the same backlog through `slice`. The trade-off is a wider charter than a single role holds, so every run states which lanes it covered and which it did not.

## When to invoke

- An SDLC gate requires reliability, quality, or maintenance evidence
- A work item pod charter names any of the three roles
- The user asks about SLOs, error budgets, alerting, dashboards, runbooks, or incident readiness
- The user asks whether requirements are testable, where the test gaps are, or what technical debt a slice carries
- A patch, dependency-update, or debt burn-down cycle is due per `CADENCE.md`

## Procedure

1. Deliver phase per `DDDD.md`: check operational readiness, quality, and maintainability against the Discover-Define-Design baseline, not against a green build
2. Scope the run to the lanes the request touches, and name the lanes left out
3. Reliability lane — load adapter `adapters/opencode/agents/operate.md`: an SLO with a named owner and an alert threshold for every service boundary, a correlation identifier on every agent run and automated decision, dashboards, runbooks, and declared incident roles
4. Quality lane — load adapter `adapters/opencode/agents/quality.md`: audit the SPEC-TS ledger for testability — prioritized requirements, quantified constraints, evidence-backed tradeoffs — then record test gaps against the floors in `core/COVERAGE.md` and log the technical debt the slice carries
5. Maintenance lane — load adapter `tools/opencode-workflows/templates/maintenance.json` on the schedule in `CADENCE.md`: patch review, dependency updates, and debt burn-down measured against the original Design baseline rather than a fresh scope
6. Follow SPEC-TS and human gates in `sdlc/METHOD.md`; record each lane's evidence as gate rows per `grit/LEDGER.md`
7. Return every finding to the backlog through `slice` as a continuous-improvement item, per `slice/OPERABILITY.md`; a report that ends as a document has changed nothing
8. Regulated context → `responsible-ai-governance`

## Stop conditions

- Missing scope or SPEC-TS → stop
- Critical findings → escalate per adapter `-max` / verifier path
- A lane that could not run is reported as a gap, never as an empty pass
- This charter does not waive its own gate; it reports evidence and a human decides

## Output contract

One brief carrying a section per lane, each naming the evidence found or the reason the lane did not run:

- Reliability: SLO table with owners and alert thresholds, dashboards, runbooks
- Quality: test gaps against the coverage floors, plus technical-debt items for the slice
- Maintenance: prioritized patch, dependency, and debt items, with the next review date

## Sibling skills

- `sdlc`, `conduct`, `slice`
