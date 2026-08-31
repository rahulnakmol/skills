# Decision tickets

A decision ticket asks one question whose resolution is a decision, not a piece of the build. This is the line that keeps a chart a plan rather than a second backlog: the chart is finished when nothing is left to decide, and the doing starts after that, through `carve`, `prd-draft`, and the delivery seam at Commitment. When a session feels pulled toward building the thing rather than deciding about it, that is usually the signal the chart has reached its destination.

## Sizing a ticket

Size each ticket to one agent session. In practice that means a question a competent PM and an agent can settle inside a single working context, with the evidence they can gather in that context, and record in a paragraph. Two tests catch most sizing errors:

- **The single-answer test.** Can the resolution be written as one decision? "Which billing provider" is one. "Which billing provider, and how do we migrate to it" is two, and the second usually depends on the first.
- **The context test.** Would resolving this require reading more material than one session can hold? If yes, split it, or open an evidence ticket that reduces the material to a brief the deciding ticket can consume.

Oversized tickets are the most common failure in practice, and they fail quietly: the session runs out of room, records a partial answer, and the chart now carries a decision that nobody can act on.

## The four types

Every ticket carries one type. The type decides who resolves it, how, and whether it can run in parallel with others.

### Evidence

A fact a decision waits on: a market number, a vendor's actual capability, a current-state volume, a regulatory constraint. Resolved by research agents per `RESEARCH-AGENTS.md`, with findings normalized into `specs/research/` and cited later by `grill`. Evidence tickets are the one type that runs in parallel by default — they are independent by construction, and a fleet of them is the fastest part of any chart. Their output is a brief, never a recommendation; the moment a research agent starts recommending, the ticket has quietly become an option ticket with no options shown.

### Option

A choice between at least two real courses of action, plus doing nothing. The agent builds the option set and costs each one through `case`'s `COSTING.md` — build cost, run cost, opportunity cost, and the agent fleet's own cost — and a human picks. An option ticket that reaches a human with one option and a recommendation has not done its job; it has done the deciding and left the human to ratify it.

### Alignment

A decision only a named person can make: scope, budget, policy, priority between two teams that both want to be first. The agent prepares the question, the options, and the consequences of each, then stops. It never answers on the stakeholder's behalf and never infers the answer from what the stakeholder said about something else. This is the type most likely to sit blocked, and the honest handling of a stalled alignment ticket is to raise it in `raid` as a dependency with a named owner and a date, not to let the chart quietly route around it.

### Enablement

Work that has to happen before a decision can be made, but is not itself a decision: getting access to a system so its data can be seen, exporting a data set so its shape can be judged, signing an agreement so a vendor will answer questions. Enablement is the one type that does rather than decides, and it earns its place on the chart only by unblocking a specific decision ticket. The resolution records what was done and the facts that came out of it — where the credentials live, what the row counts were — because later tickets will depend on those facts.

## Who decides

Each type is either agent-resolvable or human-led, and mislabeling the two is what produces plans that look complete and are not:

| Type | Resolved by | Runs in parallel |
|------|-------------|------------------|
| Evidence | Agents, unsupervised | Yes |
| Option | Agents prepare, a human chooses | Preparation only |
| Alignment | A named stakeholder, in conversation | No |
| Enablement | Agents where they have access, otherwise a person with a checklist | Yes |

## The claim protocol

Assign the ticket to yourself before doing any work on it. The assignment is the claim, and an open unassigned ticket means unclaimed, so a second session scanning the ready set skips what is already being worked. Claiming after the work is done defeats the purpose, because the window where two sessions can collide is exactly the window the work occupies.

Release a claim you are not going to finish. A session that ends mid-ticket should either record what it learned as a comment and unassign, or split the remainder into a fresh ticket. A stale claim is worse than a blocked ticket: a blocked ticket is visibly waiting, while a stale claim looks like progress.

## Working the chart with an agent team

A chart is designed for several sessions running against it at once, which is why the state lives on the tracker rather than in any session. Three rules keep concurrent work from corrupting it:

1. One decision ticket per session, evidence tickets excepted. A session that resolves three decisions has usually let the second and third ride on the first without checking them.
2. Re-read the chart body at the start of every session. Another session may have closed a ticket, added tickets, or moved something out of scope since the last one ran.
3. Run the blind-spot checklist from `AGENT-OWNERSHIP.md` before recording any decision. A fleet that agreed with itself, an option set with no do-nothing option, and a claim with no evidence behind it are all easier to catch before the decision is written down than after the gate rejects it.

## Recording a decision

A resolution comment carries four things: what was decided, what it was decided against, what evidence supports it, and what it changes on the chart. The last one is the part most often skipped and the most valuable later, because it is the audit trail that explains why a ticket that existed last week is gone this week.

Then close the ticket, add one line to the chart's decision list, and re-cut the edge: open the tickets the answer made specifiable, clear the known unknowns it resolved, and rule out of scope anything the answer put past the destination.
