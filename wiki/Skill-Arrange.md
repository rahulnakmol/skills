# Skill: Arrange

**Group:** pm · **Invocation:** model-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/pm/arrange/SKILL.md)

Arrange is the pm group's routing skill. It asks of business-side work the same question the developer group's [Conduct](Skill-Conduct) asks of delivery work: how should this actually run? Most pm work does not converge through a machine-checkable verifier the way code does — it converges through a human reacting to a grill round — so the rubric routes to **grill-loop** (a single line of questioning, human-judged, one round at a time), **parallel-fan** (independent research briefs or provoked hypotheses with no dependency between them), or **hybrid**.

Unlike the developer skill, arrange does not stand up dynamic-workflow automation to run the decision. It is a routing skill only, consulted before `discover`, `case`, `tom-architect`, or `prd-draft` begins a multi-round effort.

The skill was called `orchestrate` until the groups were made independently installable. Both groups carried a skill by that name, and because every supported tool installs skills into one flat namespace, the two collided. Each was renamed for what it actually does: this one arranges an inquiry, and the developer group's conducts execution. See [ADR 0007](https://github.com/tqnonline/skills/blob/main/.agents/adr/0007-groups-are-independently-installable.md).

## When to invoke

- A discovery, case, TOM, or PRD effort spans more than one grill round or research commission.
- `discover`, `case`, `tom-architect`, or `prd-draft` needs a routing decision before it starts.

## How it fits

Arrange decides the shape of work inside any one stage of the [PM journey](Architecture-PM-Journey); it does not move work between stages, and it never substitutes for a gate. A high-consequence artifact keeps its human sign-off whatever shape it runs in. The routing rule itself is mapped in [Architecture: PM arrange](Architecture-PM-Arrange).

## Key references

- [RUBRIC.md](https://github.com/tqnonline/skills/blob/main/skills/pm/arrange/RUBRIC.md) carries the routing questions in the order they are applied, the evidence behind them, the failure signatures, and the practices this repository prohibits — same-model majority voting standing in for a sponsor's sign-off, an unbounded provoke mode, and skipping a gate under time pressure.

## How to use

Consult arrange before a discovery, case, TOM, or PRD effort that spans more than one grill round or research commission. It names the shape and the routing question that decided it, then hands grill-loop work to [Grill](Skill-Grill) and parallel-fan work to the research and intuition agents in `RESEARCH-AGENTS.md`.

## Best practices

- Collapse a parallel-fan back to grill-loop the moment its branches turn out not to be independent.
- A high-consequence artifact — a case, a PRD nearing Quality — always keeps its gate's human sign-off, regardless of shape.
- Route each step's model choice through [Model routing](Skill-Model-Routing) the same way the developer side does; a mechanical pass and a judgment pass do not need the same tier.
- Where a gate carries a grit ledger, leave its depth alone. The shape decision made here never changes how finely verification is decomposed; see [Grit](Skill-Grit).

## Sibling skills

[Grill](Skill-Grill) runs the round protocol a grill-loop routes into. [Model routing](Skill-Model-Routing) resolves the model for each step. [Conduct](Skill-Conduct) answers the same routing question for the developer group.
