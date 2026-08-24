# Skill: Roadmap

**Group:** pm · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/pm/roadmap/SKILL.md)

Roadmap sequences initiatives across now/next/later horizons by outcome linkage and dependency, and runs Program Increment planning — PI objectives, iteration mapping, stated capacity — where the practice uses it.

## When to invoke

- Multiple initiatives or epics need sequencing against capacity and dependency.
- The user asks for a roadmap, a PI plan, or a sequencing rationale.

## How it fits

Roadmap reads the dependency board directly from `raid` rather than keeping a second copy, and its PI review feeds `realize`. It ships a compressing figure — the sequencing decision, not a decorative timeline.

## Key references

- [ROADMAP.md](https://github.com/tqnonline/skills/blob/main/skills/pm/roadmap/ROADMAP.md) covers horizons, outcome linkage, sequencing rules, and PI planning.
- [VISUALS.md](https://github.com/tqnonline/skills/blob/main/skills/pm/VISUALS.md) governs the compressing figure every roadmap ships.

## How to use

Run Roadmap once multiple epics or initiatives are competing for the same capacity. It places each in a horizon, links it to an outcome, and sequences by dependency and stated capacity — never by whoever asked most recently.

## Best practices

- Never place an item on the roadmap with no outcome linkage.
- Read the dependency board from `raid` rather than re-deriving it.
- Feed the PI review's result into `realize` so the next planning cycle starts from evidence.

## Sibling skills

Reads the dependency board from `raid`. Feeds `report` and `realize`.
