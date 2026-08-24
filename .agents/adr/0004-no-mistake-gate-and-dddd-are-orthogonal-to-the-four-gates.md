# ADR 0004: The no-mistake gate and DDDD extend the existing gates, not a fifth one

## Status

Accepted

## Context

Two additions needed a home in the pipeline: coverage floors, FR/NFR traceability, and verification-before-completion (the "no-mistake gate"); and a self-maturing Discover-Define-Design-Deliver execution cycle for real-work skills. Both could plausibly have shipped as a new, fifth named gate alongside Framing, Investment, Quality, and Commitment.

## Decision

Neither becomes a new gate. The no-mistake gate strengthens the existing Commitment/Release gate — `shakedown` and `deliver` carry the new doctrine (`COVERAGE.md`, `VERIFICATION.md`) rather than a new skill inserted before or after it. DDDD is explicitly orthogonal to all four gates: the gates decide when a human signs off, DDDD is how a skill does its own work in the stretch between one gate and the next. The four-gate count and naming (Framing, Investment, Quality, Commitment on the pm side; the mirrored developer-side gates) do not change.

## Consequences

- The four-gate identity, already threaded through the README, the wiki, and the harness, stays a stable invariant — no cascading rename across docs, tests, and diagrams.
- `shakedown`'s procedure grew a coverage check and a verification pass instead of a new pre-merge skill being invented.
- Every real-work skill on both sides threads one line to `DDDD.md` rather than being restructured around four new named phases in its own procedure.
- A future genuinely new gate is not precluded by this decision — it just was not the right shape for either of these two additions.
