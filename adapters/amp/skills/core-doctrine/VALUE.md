# Value probing lenses

Four lenses, run every grill round against every candidate scope item. Nothing advances that cannot survive all four; nothing enters the backlog on the strength of enthusiasm alone.

## Business value

Name who benefits, and be specific — a named role or segment, not "users" or "the business." State how the benefit is measured, in a unit that can actually be observed: time saved, error rate reduced, revenue protected, cost avoided, adoption achieved. Where a number is not yet known, the skill's job is to help the user find it or reason toward a credible estimate, not to accept "it'll obviously help" as a substitute. When quantification is genuinely premature — true discovery-stage work — record that plainly as a deferred measurement, name what would make it measurable, and set when it becomes due; a permanently unmeasured value claim is not acceptable, only a temporarily deferred one is.

## Customer experience and delight

Functional is the floor, not the target. This lens asks what makes the outcome delightful rather than merely working — the specific moment where the experience exceeds what was strictly necessary. Name that moment explicitly in the PRD; if no such moment exists, say so and treat it as a gap to close, not a lens to skip. A feature that is correct but joyless has passed engineering review and failed this lens.

## The do-nothing alternative

Before committing resources, state plainly what actually fails if the team ships nothing at all. Not a hypothetical inconvenience — the honest, specific consequence of inaction: a customer who leaves, a cost that compounds, a risk that materializes. If the honest answer is "not much changes," that is a legitimate and important finding: it means the scope is oversized relative to its urgency, and the grill should shrink it rather than wave the finding away to protect momentum that was never earned.

## Governance triggers

Screen every scope item for the signals that require `responsible-ai-governance` before the PRD can be signed off: a regulated industry (financial services, healthcare, public sector), an AI system that makes or materially influences a consequential decision, handling of personal data, or a data-residency constraint. When a trigger fires, `Call the Skill tool with "responsible-ai-governance"` and record the resulting risk tier — `none | limited | high | prohibited` — in the PRD's Risk and governance tier section. This is not a courtesy check run once at the end; screen for triggers every round, because grilling routinely surfaces scope that widens into governed territory partway through.
