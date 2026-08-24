---
name: report
description: User-invoked leadership report generator. Use to produce the 4Ps leadership pack — Progress, Problems, Priorities, Perspective — at weekly, fortnightly, quarterly, half-yearly, or yearly cadence, sourced from the registers and the live pipeline.
---

# Report (user-invoked)

Produce the leadership pack: value first, the 4Ps, one compressing figure, sourced from the registers.

## When to invoke

- A reporting cadence is due — weekly, fortnightly, quarterly, half-yearly, or yearly
- The user asks for a status update, a steering pack, or a leadership update

## Procedure

1. Pull value and north-star rollup from `realize`
2. Pull Problems from `raid`, Priorities from `roadmap`, cost/benefit baseline from `case`
3. Pull live pipeline state — pickup-protocol status, pull requests, stacks — for Progress
4. Write the pack in the 4Ps structure, value first (`REPORT-METHOD.md`)
5. Compress the cadence's key decision into one figure (`VISUALS.md`)
6. Render through `Call the Skill tool with "press"` and route to leadership

## Stop conditions

- A Perspective section drafted entirely by an agent with no PM judgment applied
- A pack with no compressing figure

## Output contract

`specs/{prefix}-report-{cadence}.md` plus rendered output: value summary, 4Ps, compressing figure.

## Sibling skills

Reads from `realize`, `raid`, `roadmap`, `case`. Renders via `press`.
