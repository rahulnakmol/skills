# The chart

A chart is one artifact that holds a plan too big for one working session: a single tracker issue labeled `chart`, with every decision ticket filed as a child of it. It exists because agent sessions end. A plan that lives in a session's context is gone when the session closes, and a plan that lives in a document nobody updates is stale within a week. The chart is neither: it is the record on the tracker the whole team already reads, and it stays correct because resolving a ticket is the same act as updating it.

## The chart is an index, not a store

Each decision lives in exactly one place — the ticket that resolved it. The chart carries a one-line summary of that decision and a link to the ticket holding the reasoning, the evidence, and the alternatives that lost. This matters for a practical reason: the chart is read at the start of every session, so its length is a running cost paid on every turn of every session. A chart that restates its tickets grows without bound and drifts from them, and a reader can no longer tell which copy is authoritative.

The same rule explains what the chart body leaves out. Open tickets are not listed on it. They are child issues, and the tracker already answers "what is open" better than a hand-maintained list does.

## The chart body

```markdown
## Destination

<what has to exist for this effort to be over — a signed PRD set, an approved TOM,
a decision recorded, a migration completed. One or two sentences. Every session
reads this before it chooses a ticket.>

## Standing notes

<the hat, the gate this destination feeds, the skills every session should call,
and any standing preference for this effort>

## Decisions

<!-- the index: one line per closed ticket, enough to judge relevance, then follow
     the link for the detail the ticket holds -->

- [<closed ticket title>](link): <one-line statement of what was decided>

## Known unknowns

<!-- areas inside the destination that you can see are coming but cannot yet state
     as a precise question; each is cleared from here when it becomes a ticket -->

## Out of scope

<!-- work consciously ruled outside this destination, with one line on why -->
```

Every ticket body states one question and nothing else. The answer is not written into the body; it is posted as a comment when the ticket is resolved, so the question and its answer stay distinguishable in the history. Artifacts produced along the way — a research brief, a costed option set, a prototype — are linked from the ticket rather than pasted into it.

## Three places a question can sit

The difference between a ticket and a known unknown is whether you can state the question precisely today, not whether you can answer it today. A question that is sharp but blocked is still a ticket: it has a place in the order of work. A question you can only gesture at ("we will need to decide something about data residency") is a known unknown, and writing it as a ticket forces a precision the effort does not yet have, which produces tickets that get rewritten or closed unresolved.

Out of scope is a separate judgment and it is about the destination, not about sharpness. When a ticket turns out to sit past the destination — mis-scoped when the chart was drawn, or exposed as out of bounds by a later decision — close it and leave one line in the out-of-scope section. Out-of-scope work does not return to the chart later; if the destination changes, that is a new chart, not a resumption of this one.

## Ticket states

Four states, readable from the tracker without opening anything:

| State | Definition |
|-------|------------|
| ready | open, unassigned, and every ticket blocking it is closed |
| blocked | open, with at least one open blocking ticket |
| claimed | open and assigned to a person or a session that is working it now |
| closed | resolved, with the answer recorded as a comment |

The ready set is the edge of the plan: the decisions that can be taken right now. Everything the chart does — blocking, claiming, closing — exists to keep that set honest, because a PM steering an agent team needs to know what can start today without reading every ticket to work it out.

## Where the chart lives

Use the tracker the initiative already uses, following the same tracker documents `raise` uses: `skills/developer/raise/trackers/github.md`, `linear.md`, or `ado.md`. Three operations differ by tracker and should be read there before charting: how a child issue is created, how a blocking relationship is expressed, and how the ready set is queried.

Prefer the tracker's native blocking relationship over a convention written into a ticket body. Native blocking is drawn in the tracker's own views, so a stakeholder sees what is takeable without opening the chart, and the ready set can be queried rather than assembled by hand.

Where no tracker is available — Azure DevOps exports rather than writes, and some initiatives have no tracker at all — the chart falls back to `specs/chart/{prefix}-chart.md` in the initiative repository (`INITIATIVE-REPO.md`), with tickets as sections and blocking as a stated field. Say plainly what the fallback costs: concurrent sessions have no claim protocol, so two sessions can resolve the same ticket twice.

## Reporting from the chart

A chart answers the two questions a sponsor asks most often — what has been settled, and what is being settled now — without anyone writing a status update. `report` reads the decision list for Progress, the blocked and claimed tickets for Priorities, and anything routed to `raid` for Problems. The chart supplies the facts; it does not replace the pack, because a leadership pack still has to carry value, cost, and the compressing figure (`VISUALS.md`) that a ticket list cannot.

One limitation is worth stating. A chart reports the state of decisions, not the state of delivery. Once a decision has been made and the work has crossed into the backlog, its progress is the pickup protocol's to report, not the chart's.
