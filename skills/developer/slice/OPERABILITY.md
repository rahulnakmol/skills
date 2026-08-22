# Operability lane items

Every epic decomposition includes a mandatory operability lane alongside its user-facing stories — reliability, maintainability, and instrumentation are not a hardening phase bolted on after initial release; they enter the backlog at first slicing, as first-class items with their own acceptance criteria and tests, matching the observability non-negotiable this repo holds everywhere else.

## Observability

Every service boundary this epic touches gets structured logs, traces, and metrics as an explicit backlog item, not an implicit expectation. Every agent run and every automated decision carries a correlation id so a single request or a single agent action can be traced end to end across logs, traces, and — where the governance tier requires it — the audit trail.

## SLOs and alerting

Where the epic introduces or changes a service boundary, a corresponding SLO item is sliced alongside it: the guardrail, the leading indicator, the alert threshold, and who owns the pager. An epic that changes production behavior without a corresponding SLO item is incomplete, not merely under-instrumented.

## Runbooks

Any new failure mode this epic can introduce gets a runbook item: what the alert looks like, what the first responder checks, what the rollback or mitigation path is. Runbooks are sliced as their own item, reviewable and testable independent of the feature code.

## CI/CD and test coverage

Test coverage for the epic's acceptance criteria, and any CI/CD changes the epic requires (new pipeline stage, new gate, new deployment target) are sliced as explicit items — never assumed to ride along for free with the feature work.

## Governance lane

Whenever the parent PRD's risk and governance tier is `limited` or `high`, the operability lane also generates governance items: the audit trail, explainability hooks, and human-in-the-loop checkpoints required by `responsible-ai-governance`. These enter the backlog with their own tests, the same as any other operability item — a governance requirement satisfied only by after-the-fact logging has not actually been satisfied.

Continuous-improvement items produced from `operate` and `assure` findings after release re-enter this lane the same way initial-slicing items do — the operability lane is where the improvement loop closes back into the backlog.
