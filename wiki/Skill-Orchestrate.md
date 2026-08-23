# Skill: Orchestrate

**Group:** developer · **Invocation:** model-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/developer/orchestrate/SKILL.md)

Orchestrate is the flagship routing skill in this repository. Given a piece of work, it decides how that work should run: as a single-writer loop, as a parallel graph with typed handoffs, or as a hybrid of the two. It assigns a model to every step and maps the result onto whichever tool is doing the work, whether that is Claude Code, OpenCode, Codex, Cursor, or GitHub Copilot.

## When to invoke

- The task spans multiple gates or contexts, and no routing decision has been made yet.
- The user, or the `sdlc` loop, needs a mode decided before implementation starts.

## How it fits

Orchestrate sits above every other skill in this repository's [operating model](Architecture-Role-Journey). It is the skill that decides how the Implementation stage of the journey actually runs, and it is where this repository's commitment to human judgment becomes a structural property of the system rather than a stated intention. Any step whose write is high-consequence receives a typed `human` node, with a named owner and a service-level agreement, rather than a plain stop condition.

## Key references

- [RUBRIC.md](https://github.com/tqnonline/skills/blob/main/skills/developer/orchestrate/RUBRIC.md) covers the routing questions, applied in order until the first one matches; the evidence they rest on, including findings from ComPilot and Agint; the failure patterns to watch for; and the practices this repository prohibits.
- [GRAPH.md](https://github.com/tqnonline/skills/blob/main/skills/developer/orchestrate/GRAPH.md) defines the `agent` and `human` node types, and carries the harness mapping: work-item delivery runs as three named workflows — assess, deliver, shakedown — on Claude Code's dynamic-workflow runtime or the OpenCode template runner, launched by `scripts/pipeline.sh` on either engine.
- [LOOP.md](https://github.com/tqnonline/skills/blob/main/skills/developer/orchestrate/LOOP.md) describes loop mode, in which a single writer works against a single verifier.

## How to use

Orchestrate is model-invoked: it engages on its own when a task spans multiple gates or contexts, and `sdlc` calls it for a routing decision before implementation begins. In Claude Code you can also ask for a routing decision directly ("route this work"), and the delivery pipeline's three named workflows are the pre-routed paths for work items. There is no slash command; the skill exists to be consulted, not driven.

## Best practices

- Route on verifiability, never on apparent difficulty — the first matching rule in `RUBRIC.md` wins, and re-litigating it mid-run is a failure signature.
- Never drop a gate under degradation: a tool that cannot fan out runs the same stages sequentially, human nodes included.
- Keep one writer per checkout and populate the `evidence` field with the rubric lines and registry entries the decision rests on — an unevidenced routing decision is an opinion.

## Sibling skills

[Model routing](Skill-Model-Routing) resolves which model runs at each step. [SDLC](Skill-SDLC) is the user-invoked gated loop that Orchestrate most often routes work into.
