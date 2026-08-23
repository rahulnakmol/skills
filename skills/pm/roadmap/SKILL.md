---
name: roadmap
description: User-invoked roadmapping and PI planning. Use to sequence initiatives by outcome linkage and dependency across now/next/later horizons, and to run Program Increment planning where the practice uses it.
---

# Roadmap (user-invoked)

Sequence work by outcome and dependency, not by whoever asked last — and ship the compressing figure that shows the sequencing decision.

## When to invoke

- Multiple initiatives or epics need sequencing against capacity and dependency
- The user asks for a roadmap, a PI plan, or a sequencing rationale

## Procedure

1. Place each item in a horizon — now, next, or later (`ROADMAP.md`)
2. Link every item to the outcome it is meant to move
3. Sequence by dependency and capacity, reading the dependency board from `raid` rather than re-deriving it
4. Where the practice runs PI planning, set PI objectives, map iterations, and state capacity
5. Compress the sequencing decision into one figure before shipping (`VISUALS.md`)
6. Feed the PI review's outcome into `realize`

## Stop conditions

- An item on the roadmap with no outcome linkage
- A sequencing order that ignores a known dependency

## Output contract

`specs/{prefix}-roadmap.md` plus its compressing figure: horizons, outcome linkage, dependency-aware sequence, PI objectives where applicable.

## Sibling skills

Reads the dependency board from `raid`. Feeds `report`'s leadership pack and `realize`'s PI review loop.
