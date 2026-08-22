# Skill: Responsible AI governance

**Group:** developer · **Invocation:** overlay · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md)

Applied on top of the stack rules whenever work touches a regulated industry — financial services, healthcare, public sector — or an AI system that makes or materially influences a consequential decision. Not a skill you run in sequence with the others; it's a layer that gets called into whichever stage needs it.

## When to invoke

- Financial services, healthcare, or public-sector context
- An AI system making or influencing a consequential decision
- The user asks about audit, explainability, model risk, residency, or a named framework (SR 11-7, BCBS 239, NIST AI RMF, ISO 42001, the EU AI Act)

## How it fits

This is the overlay that keeps the repo's four human gates from being cosmetic in regulated contexts. [Impact](Skill-Impact)'s `VALUE.md` screens for governance triggers every grill round; [Slice](Skill-Slice) calls this skill whenever a PRD's risk tier is `limited` or `high`, populating an audit trail, explainability hooks, and human-in-the-loop checkpoints in every affected work item — first-class deliverables with their own tests, never logging bolted on after the fact.

## Key references

- Full framework list and behavioral rules in [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md)

## Sibling skills

Called from [Impact](Skill-Impact), [Slice](Skill-Slice), and any specialist skill (`architect`, `safeguard`, `assure`, `operate`, `maintain`, `deliver`) working in a regulated context.
