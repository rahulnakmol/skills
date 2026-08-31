# Skill: Chart

**Group:** pm · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/pm/chart/SKILL.md)

Chart turns work that no single agent session can hold into a chart of decision tickets on the team's tracker. Each ticket asks one question sized to one session; the chart itself is a single issue that indexes the decisions already made and points at the tickets holding their detail. The effort is finished when nothing is left to decide, and the doing starts after that.

## When to invoke

- An initiative is too large or too uncertain for `discover` → `map` → `carve` to run in one pass.
- Work spans several teams, systems, or quarters, and the order of the decisions is not yet known.
- An agent team needs a plan that survives the end of any one session and tolerates concurrent work.
- A sponsor asks for status on work whose plan currently lives in people's heads.

## How it fits

Chart sits above the linear pm pipeline rather than inside it. It does not replace `discover`, `case`, or `tom-architect`; it decides which of them to run, in what order, and it routes each ticket into whichever of them owns the method for that question. What it cannot settle leaves the chart as a risk, assumption, or dependency in `raid`, so a stalled decision stays visible instead of sitting open forever. `report` reads the chart for Progress and Priorities, which is how a large effort produces status without anyone writing a status update.

## Key references

- [CHART.md](https://github.com/tqnonline/skills/blob/main/skills/pm/chart/CHART.md) — the chart artifact: its body, the four ticket states, where it lives on GitHub, Linear, or Azure DevOps, the markdown fallback, and how `report` reads it.
- [TICKETS.md](https://github.com/tqnonline/skills/blob/main/skills/pm/chart/TICKETS.md) — sizing a ticket to one session, the four ticket types (evidence, option, alignment, enablement), the claim protocol, and the rules that keep concurrent sessions from corrupting the chart.

## How to use

Invoke it in one of two modes. In chart mode, the user brings an initiative and no plan: the skill names the destination, takes one breadth-first pass over the whole space, sorts what it finds into tickets, known unknowns, and out of scope, then creates the chart and wires the blocking relationships. It resolves nothing else in that session. In advance mode, the user brings the chart: the skill reads the chart body, claims one ready ticket, resolves it through the pm skill that owns the method, records the decision, and re-cuts the edge of the plan.

## Best practices

- Claim a ticket by assigning it before any work starts. The window in which two sessions can collide is exactly the window the work occupies.
- Resolve one decision ticket per session. Evidence tickets are the exception and run in parallel by design.
- Write a question as a ticket only when you can state it precisely today; a question you can only gesture at belongs in known unknowns until the frontier of the work reaches it.
- Keep the chart an index. A decision lives in its ticket, and the chart carries one line and a link, because the chart is read at the start of every session.
- Run the blind-spot checklist from `AGENT-OWNERSHIP.md` before recording a decision. Agents built on one model agreeing is one opinion said several times.

## Sibling skills

Routes into `discover`, `case`, `tom-architect`, `prd-draft`, and `grill`. Hands off to `carve` once the decisions are settled. Sends what it cannot decide to `raid`. Supplies status to `report`.
