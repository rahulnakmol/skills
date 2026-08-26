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

1. Deliver phase per `DDDD.md`: pull value and north-star rollup from `realize`
2. Pull Problems from `raid`, Priorities from `roadmap`, cost/benefit baseline from `case`, and — where the initiative is charted — decisions settled and decisions in flight from `chart`
3. Pull live pipeline state — pickup-protocol status, pull requests, stacks — for Progress
4. Write the pack in the 4Ps structure, value first (`REPORT-METHOD.md`), routing the drafting pass through `model-routing` — a mechanical pull from the registers and a judgment-heavy Perspective section do not need the same tier
5. Compress the cadence's key decision into one figure (`VISUALS.md`)
6. Render through `Call the Skill tool with "press"`
7. Before marking the pack sent, open the rendered artifact and check every number in it against its source register — per `shakedown/VERIFICATION.md`'s rule that a render finishing without error is not evidence the numbers are right — then route to leadership

## Stop conditions

- A Perspective section drafted entirely by an agent with no PM judgment applied
- A pack with no compressing figure
- A pack marked sent without the rendered artifact having been opened and checked against its source registers

## Output contract

`specs/{prefix}-report-{cadence}.md` plus rendered output: value summary, 4Ps, compressing figure.

## Sibling skills

Reads from `realize`, `raid`, `roadmap`, `case`, and `chart` where one exists. Renders via `press`.
