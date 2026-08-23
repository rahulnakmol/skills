# Skill: Ask PM

**Group:** pm · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/pm/ask-pm/SKILL.md)

Ask PM routes a stated intent to the correct pm skill, on the same pattern as the developer group's `ask-fde`. It covers all fourteen sibling skills and hands across the seam to the developer group when the intent is engineering inception or backlog delivery.

## When to invoke

- The user asks "which pm skill" or describes a goal without naming a skill.

## How it fits

Ask PM is the pm group's single entry point for an unsure user, mirroring `ask-fde`'s role in the developer group. The developer group's own router now sends product, program, or transformation intent here rather than leaving it unclassified.

## Key references

- The routing table lives directly in the skill's own procedure — one line per pm skill.

## How to use

Describe what you are trying to do in plain language. Ask PM classifies the intent, names the skill it maps to, and calls it. It asks which hat — product or transformation — only when the intent is genuinely ambiguous; that classification is normally `discover`'s job.

## Best practices

- Let Ask PM classify first rather than guessing a skill name that turns out to be close but wrong.
- If the intent spans two skills — for example scoping and then drafting — expect two calls, not one skill doing both.

## Sibling skills

Routes to every pm skill. Hands off to the developer group's `impact`, `slice`, and `raise` at the seam.
