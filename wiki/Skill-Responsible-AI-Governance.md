# Skill: Responsible AI governance

**Group:** developer · **Invocation:** overlay · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md)

Responsible AI governance applies on top of this repository's other rules whenever work touches a regulated industry — financial services, healthcare, or the public sector — or an AI system that makes or materially influences a consequential decision. It is not a skill a user runs in sequence with the others. It is a layer that is called into whichever stage of the journey needs it.

## When to invoke

- The work takes place in a financial-services, healthcare, or public-sector context.
- An AI system is making, or materially influencing, a consequential decision.
- The user asks about audit requirements, explainability, model risk, data residency, or a named framework such as SR 11-7, BCBS 239, the NIST AI Risk Management Framework, ISO/IEC 42001, or the EU AI Act.

## How it fits

This skill is what keeps this repository's four human gates substantive, rather than symbolic, in a regulated context. In [Impact](Skill-Impact), the checklist in `VALUE.md` screens for governance triggers in every round of the grill loop. In [Slice](Skill-Slice), this skill is called whenever a PRD's risk tier is `limited` or `high`, and it populates an audit trail, explainability hooks, and human-in-the-loop checkpoints in every affected work item. These are treated as requirements with their own tests, not as logging added after the fact.

## Key references

- The complete list of frameworks and the behavioral rules that follow from them are in [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md).

## Sibling skills

This skill is called from [Impact](Skill-Impact), from [Slice](Skill-Slice), and from any specialist skill — Architect, Safeguard, Assure, Operate, Maintain, or Deliver — working in a regulated context.
