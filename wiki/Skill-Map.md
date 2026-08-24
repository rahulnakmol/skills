# Skill: Map

**Group:** pm · **Invocation:** model-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/pm/map/SKILL.md)

Map takes a completed `discover` analysis and produces persona profiles, current-state and target-state Mermaid process flows, and the Business Understanding Document the Framing gate signs.

## When to invoke

- `discover` has produced an analysis file.
- The user asks for persona mapping, process flows, or a swimlane or BPMN diagram.

## How it fits

Map is the second step of the product- or transformation-hat pipeline, reading directly from `discover`'s output. It applies visual compression before finalizing any figure, then routes the handoff: the product hat goes to `carve`, the transformation hat goes to `tom-architect`.

## Key references

- [VISUALS.md](https://github.com/tqnonline/skills/blob/main/skills/pm/VISUALS.md) sets the house visual system and the one-figure-one-claim rule every diagram follows.

## How to use

Invoke map once `discover`'s analysis file exists. It builds three to six named personas, current- and target-state flows with pain points in red and improvements in green, and assembles the Business Understanding Document automatically — no separate invocation needed for document assembly.

## Best practices

- Never design a target-state flow without first mapping current state — it produces a fantasy architecture.
- Every process flow needs a named persona behind it; a persona-less flow is unvalidatable.
- Give every diagram a title and a one- or two-sentence description of what it shows.

## Sibling skills

Reads from `discover`. Hands off to `carve` or `tom-architect`.
