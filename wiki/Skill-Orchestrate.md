# Skill: Orchestrate

**Group:** developer · **Invocation:** model-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/orchestrate/SKILL.md)

The flagship routing skill. Given a piece of work, it decides how it should actually run — as a tight single-writer loop, a parallel graph with typed handoffs, or a hybrid of both — assigns a model to every node, and maps the result onto whichever harness (Claude Code, OpenCode, Codex, Cursor, Copilot) is driving the work.

## When to invoke

- The task spans multiple gates or contexts and no routing decision has been made yet
- The user, or the `sdlc` loop, needs a mode decided before implementation starts

## How it fits

`orchestrate` sits above every other skill in this repo's [operating model](Architecture-Role-Journey) — it is the thing that decides *how* the Build stage of the journey actually executes, and it is where the repo's human-judgment thesis becomes structural rather than aspirational: any node whose write is high-consequence gets a typed `human` node with a named owner and an SLA, not a bare stop condition.

## Key references

- [RUBRIC.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/orchestrate/RUBRIC.md) — the first-hit-wins routing questions, the evidence they rest on (ComPilot, Agint), failure signatures, and prohibited patterns
- [GRAPH.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/orchestrate/GRAPH.md) — the `agent` and `human` node schemas
- [LOOP.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/orchestrate/LOOP.md) — single-writer, single-verifier loop mode

## Sibling skills

[Model routing](Skill-Model-Routing) resolves the model for each node; [SDLC](Skill-SDLC) is the user-invoked gated loop `orchestrate` most often routes into.
