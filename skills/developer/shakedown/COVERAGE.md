# Coverage and use-case traceability

A green test run proves the tests that exist pass, not that the right tests exist. This doctrine is what closes that gap: every work item ships with a matrix tracing its acceptance criteria to the tests that check them, and a coverage floor the tests themselves must clear — checked by the `deliver-work-item` verifier before a PR is raised, and again by `shakedown-pr`'s tests lens before merge, so a gap caught late is still caught before it ships.

## The FR/NFR traceability matrix

Every work item's `WORK-ITEM-CONTRACT.md` acceptance criteria fall into two kinds, and both need a named test, not just the functional ones. Functional requirements (FRs) are what the change does — the happy path, the boundary, the documented error case. Non-functional requirements (NFRs) are how well it does it — latency under load, behavior on a dependency timeout, memory under the expected concurrency, backward compatibility with the previous contract version. The matrix is one row per acceptance criterion: the criterion, the test that proves it, and pass or fail. A criterion with no row is not covered; a row with no passing test is not done. `slice` authors the matrix's rows when it writes the acceptance criteria — a criterion nobody can name a test for is a sign the criterion itself is not concrete enough to ship.

## Coverage floors

Two floors, because business-capability code and integration code fail differently and need different rigor. Code implementing the actual business capability — the logic the work item exists to deliver — holds to **85-90%** line and branch coverage; this is the code a defect in directly breaks the promised outcome, so it earns the tighter floor. Code at integration boundaries — wiring to an external service, a database adapter, a message queue consumer — holds to **75-80%**; a lower floor here is deliberate, not lax, because integration surfaces are often better proven by a contract test or a recorded interaction than by counting lines, and chasing the higher floor there produces brittle tests that assert implementation detail instead of behavior. Both floors are checked against the diff, not the whole repository — a work item is not responsible for raising legacy coverage it did not touch, only for not lowering the floor on what it did.

## Non-functional use cases

Every work item's contract states which non-functional use cases apply to it — not every item touches all of them, and a governance-tier-none item skips the audit-trail NFR the same way it skips the Governance section, explicitly rather than by omission. The recurring set: performance under the stated load, graceful degradation when a dependency is slow or unavailable, backward compatibility for any changed contract, and security boundaries for any new input surface. An NFR that genuinely does not apply is marked not applicable in the matrix, the same discipline `WORK-ITEM-CONTRACT.md`'s Governance section already uses — never silently absent.

## Right-sized verification

Checking a matrix and a coverage floor is itself a task that needs a model, and the model should fit the job. Route the coverage-checking pass through `model-routing` like any other task node — a mechanical row-by-row check of "does this criterion have a passing test" does not need the same tier as reasoning about whether a security finding is reachable. The goal is accuracy at the coverage question actually being asked, at the token budget that question warrants, never reflexively reaching for the largest available model because the words "coverage" and "compliance" sound like they demand it.
