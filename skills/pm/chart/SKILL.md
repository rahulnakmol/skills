---
name: chart
description: User-invoked charting of work too large for one agent session. Turns an initiative into a chart of decision tickets on the tracker, each sized to one session, resolved one decision at a time by a PM and an agent team. Use when an initiative is too big, too uncertain, or too cross-cutting to run the pm pipeline in a single pass, and to read status off the chart instead of asking people for updates.
---

# Chart (user-invoked)

Turn work no single session can hold into a chart of decision tickets, then resolve them one at a time until nothing is left to decide.

## Contract

```yaml
contract:
  invocation: user
  thesis: gate
  verbs: [read, write-repo, write-tracker]
  scope: owns
  trace: edge
```

## When to invoke

- An initiative is too large or too uncertain for `discover` → `map` → `carve` to run in one pass
- Work spans several teams, systems, or quarters, and the order of the decisions is not yet known
- An agent team needs a shared plan that survives the end of any one session and tolerates concurrent work
- A sponsor asks for status on work whose plan currently lives in people's heads

## Procedure — Chart mode

The user arrives with an initiative and no plan. This mode produces the chart and resolves nothing.

1. Name the destination: one or two sentences stating what has to exist for this effort to be over — a signed PRD set, an approved TOM, a decision recorded, a migration completed. Classify the hat (`HATS.md`) and name the gate the destination feeds (`GATES.md`). A destination nobody can state is a discovery problem; route to `discover` first.
2. Take one breadth-first pass across the whole initiative rather than a deep pass on any part of it. `Call the Skill tool with "grill"` in plain mode to surface the open decisions, and stop at the point where each decision can be named, not answered.
3. Sort what the pass produced three ways, per `CHART.md`: a question you can state precisely today becomes a ticket, even if it is blocked; a question you can see coming but cannot yet state becomes a known unknown; work beyond the destination becomes out of scope.
4. Create the chart and its tickets on the tracker (`CHART.md`), then wire the blocking relationships in a second pass — a ticket needs an identifier before another ticket can reference it.
5. Type every ticket per `TICKETS.md` and route the evidence tickets to research agents in parallel (`RESEARCH-AGENTS.md`); resolve the execution shape through `arrange` and the model tier through `model-routing`, since a fact-finding pass and a judgment pass do not need the same tier.
6. Stop. Charting is one session's work and it decides nothing else.

## Procedure — Advance mode

The user arrives with a chart, and optionally names a ticket.

1. Read the chart body only — the destination, the standing notes, and the decisions already made. Fetch a closed ticket's detail on demand, not by default.
2. Choose a ready ticket: open, unblocked, unclaimed. If the user named one, use theirs. Claim it by assigning it to the person or session driving the chart before any work starts, so a second session skips it.
3. Resolve it by its type (`TICKETS.md`), routing into the pm skill that owns the method — `discover`, `case`, `tom-architect`, `prd-draft`, or `grill` — rather than reinventing the method inside the ticket.
4. Run the pre-gate blind-spot checklist from `AGENT-OWNERSHIP.md` before recording anything. Three agents built on one model agreeing is one opinion said three times, and a decision recorded on that basis will not survive the gate it feeds.
5. Record the decision: the answer as a comment on the ticket, the ticket closed, and one line added to the chart's decision list with a link. The detail stays in the ticket; the chart indexes and never restates it.
6. Re-cut the edge: open the tickets the answer made specifiable, clear those known unknowns, and move anything the answer put past the destination to out of scope. A question that cannot be settled at all becomes a Risk, Assumption, or Dependency in `raid` — never a ticket left open indefinitely.

Resolve one decision ticket per session. Evidence tickets are the exception: they are independent by construction and run in parallel.

## Stop conditions

- The breadth pass surfaces no open decisions → the work fits one pass; say so and run the linear pipeline instead of charting it
- More than roughly 25 open tickets at once → the destination is too wide; split it into two charts or narrow it, and say which
- A ticket's resolution requires a gate approval that has not happened → stop at the gate; the chart does not approve anything
- A ticket claimed and unresolved past its session → release the claim rather than leaving the edge falsely blocked
- No tracker is configured → fall back to the markdown chart in `CHART.md` and say plainly that concurrent sessions lose their claim protocol

## Output contract

```yaml
chart: <tracker URL or specs/chart/{prefix}-chart.md>
destination: "<what has to exist for this effort to be over>"
hat: product|transformation
gate: framing|investment|quality|commitment
tickets: { ready: <n>, blocked: <n>, claimed: <n>, closed: <n> }
known_unknowns: <n>
mode: chart|advance
decided: "<one line, advance mode only>"
```

## Sibling skills

- `discover`, `case`, `tom-architect`, `prd-draft`, `grill` — the methods a ticket routes into to be resolved
- `carve` — takes over once the chart's decisions are settled and the work is ready to be cut into epics
- `raid` — receives what the chart cannot decide, as a risk, assumption, or dependency
- `report` — reads live status off the chart, per `CHART.md`
- `arrange`, `model-routing` — the execution shape and the model tier for a ticket
