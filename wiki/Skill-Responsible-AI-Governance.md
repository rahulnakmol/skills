# Skill: Responsible AI governance

**Group:** developer · **Invocation:** overlay · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md)

Responsible AI governance applies on top of this repository's other rules whenever work touches a regulated industry — financial services, healthcare, or the public sector — or an AI system that makes or materially influences a consequential decision. It is not a skill a user runs in sequence with the others. It is a layer that is called into whichever stage of the journey needs it.

## When to invoke

- The work takes place in a financial-services, healthcare, or public-sector context.
- An AI system is making, or materially influencing, a consequential decision.
- The user asks about audit requirements, explainability, model risk, data residency, or a named framework such as SR 11-7, BCBS 239, the NIST AI Risk Management Framework, ISO/IEC 42001, or the EU AI Act.

## How it fits

This skill is what keeps this repository's four human gates substantive, rather than symbolic, in a regulated context. In [Impact](Skill-Impact), the checklist in `VALUE.md` screens for governance triggers in every round of the grill loop. In [Slice](Skill-Slice), this skill is called whenever a PRD's risk tier is `limited` or `high`, and it populates an audit trail, explainability hooks, and human-in-the-loop checkpoints in every affected work item. These are treated as requirements with their own tests, not as logging added after the fact.

## Key references

- The complete list of frameworks and the behavioral rules that follow from them are in [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md).

## How to use

The overlay is triggered, not scheduled: `impact` screens for its triggers every grill round, `slice` calls it when a PRD's tier is `limited` or `high`, and any specialist skill invokes it on contact with a regulated context. Asking about a named framework — SR 11-7, the EU AI Act, ISO/IEC 42001 — also brings it in directly.

## Best practices

- When unsure whether something is governed, assume it is and ask — the cost of a wrong "not governed" is categorically higher than the reverse.
- Treat audit trails and explainability as deliverables with their own tests, never as logging added at the end.
- Never implement around a control to make a feature work; surface the conflict with options and let a human decide.

## Sibling skills

This skill is called from [Impact](Skill-Impact), from [Slice](Skill-Slice), and from any specialist skill — Architect, Safeguard, Deliver, or Operate — working in a regulated context.
