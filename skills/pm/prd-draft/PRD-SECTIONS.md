# PRD sections

Ported from the source `prd-draft` skill's twelve-section structure — one self-contained PRD per approved epic, never a monolithic document covering several epics at once.

## The twelve sections

Every PRD populates all twelve: (1) Problem Statement & Business Context, tracing to the initiative's classification and the cost of inaction; (2) Stakeholders & Personas, behavior and feelings under the product hat or TOM role mappings under the transformation hat; (3) TOM Alignment, transformation-hat only, mapping L1-L4 processes and maturity gaps to this epic; (4) Epic Definition, scope in and out, dependencies, assumptions; (5) User Stories; (6) Key Features & Business Value, each feature carrying an 11-Star level; (7) Success Metrics, at least three, with baseline, target, method, and frequency, at least one leading and one lagging; (8) Constraints & Assumptions with a risk table; (9) Technical Considerations, non-prescriptive — integration points, data, performance, security named but not designed; (10) Process Flow References, Mermaid diagrams carried from `map`; (11) Release & Rollout, strategy, phases, rollback criteria; (12) Open Questions, each with an owner and a due date — a PRD with zero open questions is either trivially simple or has not been thought through hard enough.

## INVEST

Every user story is Independent, Negotiable, Valuable, Estimable, Small, and Testable. Stories run three to fifteen per epic. Every story carries a named persona from Section 2 — "as a user" is never acceptable. Complexity is stated as S, M, or L only; a story sized XL is a signal to split it, not a valid size. Priority is Must Have, Should Have, or Could Have, with at least sixty percent Must Have and no more than twenty percent Could Have, and Must Have stories listed first.

## Acceptance criteria

Every story carries three to eight acceptance criteria in Given, When, Then form. At minimum one happy path, one boundary condition, and one error scenario per story — a story with only happy-path acceptance criteria is untestable, because it says nothing about what should happen when something goes wrong. A PRD's twelfth section, Open Questions, exists precisely because acceptance criteria this specific will surface questions nobody had answers to yet; recording them with an owner and a due date is part of the deliverable, not a gap in it.
