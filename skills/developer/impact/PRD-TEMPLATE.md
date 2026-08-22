# PRD template (fast-cut)

A Google-design-doc/PRD hybrid. Hard cap 8–10 pages; ≤5 pages is the efficiency target. A PRD that needs more room has scope that belongs split across successive `impact` re-entries, not a longer document.

## Problem and outcome hypothesis

What is broken or missing today, and the hypothesis for what fixes it. Stated as an outcome, not a solution — the solution is what the grill and `slice` work out together.

## Users and jobs to be done

Who this serves and what job they are hiring the outcome to do. Named roles or segments, not "users" in the abstract.

## Scope

In-scope and out-of-scope, drawn directly from the grill rounds. Every out-of-scope entry that was actively cut during grilling links back to its entry in the Trade-offs and decision log below, rather than disappearing without a trace.

## Business value delivered

Mandatory. Populated from the Business value lens in `VALUE.md` — who benefits, how it is measured, and the number or the honest deferred-measurement note. A PRD cannot reach sign-off with this section empty or templated; see `GATES.md` G2.

## Risk and governance tier

One of: `none | limited | high | prohibited`. Recorded at G2 sign-off and not editable afterward without triggering re-approval — the tier is a commitment, not a running estimate. Tiers `limited` and `high` mean every work item sliced from this PRD carries a populated Governance section per `slice/WORK-ITEM-CONTRACT.md`, and `slice` itself routes through `responsible-ai-governance` before backlog items are generated.

## SPEC-TS snapshot

The current state of the Scope / Product requirements / Engineering constraints / Components / Trade-offs / Success metrics ledger, carried forward from `sdlc/METHOD.md`. This is what `architect` and `slice` consume downstream — keep it current, not a stale copy from an early round.

## Trade-offs and decision log

Updated every grill round, not just at the end. Every scope cut, every reopened decision, and every trade-off implicitly accepted by an early "we stop here" lands here with its rationale. This section is what makes the PRD double as the decision record of the entire inception journey.

## Approval sign-off

Explicit user sign-off, named and dated, required before `slice` may run. No sign-off, no handoff — this is Gate G2 and it is not satisfied by silence or by the absence of objection.
