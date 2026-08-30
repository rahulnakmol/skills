# Loop vs graph vs hybrid rubric

Route on verifiability, never on difficulty. A hard task with one clean verifier still belongs in a loop; an easy task that fans out into independent branches still belongs in a graph. The question is never "how hard is this," it is "how is done actually checked."

## Routing questions

Apply in order — first hit wins, do not keep evaluating once a rule matches:

1. **Is "done" machine-checkable at all?** If not, stop. Do not guess at a spec by inventing acceptance criteria on the fly — route to `impact` and force a SPEC-TS ledger into existence first. An ungrounded spec is the single most common cause of a loop or graph running to completion against the wrong target.
2. **Does the work fit one artifact, one verifier, one context window?** → **Loop.** A single writer iterates against a single external check until it passes or a hard cap is hit.
3. **Are there independent workstreams, or does each stage need a genuinely different rubric to judge it by?** → **Graph.** Independent branches run in parallel; per-stage gates apply their own criteria rather than one blended standard.
4. **Does self-review contaminate the result** — would the same agent grading its own work miss what it already missed once? → **Graph**, with an external verifier node distinct from the implementer.
5. **Must state survive beyond this session** — a multi-day initiative, a backlog that outlives the conversation? → **Graph**, with durable artifacts on disk or in the tracker, not in-memory state.
6. **Is this a high-consequence write** — production data, a release, an irreversible external action? → **Graph plus a human gate.** No amount of verifier confidence substitutes for a named human decision at this point.
7. **None of the above cleanly fit?** → **Hybrid**: a graph shell carries the overall shape, with a loop running inside any node whose internal work is genuinely ambiguous.

## Depth of verification, not shape of execution

`orchestrate` decides execution shape — loop, graph, or hybrid. `grit` (`grit/METHOD.md`, `grit/LEDGER.md`) decides verification depth — how finely "done" is split into gates, from a flat checklist up to a tree of five to ten layers for substantial work. The two are separate axes, and this rubric keeps sole authority over the first.

A gate is a ledger row: a line of criteria to check something against, costing little beyond the check itself. A node is an agent: a dispatch that consumes a context window and tokens end to end. Deepening a ledger from five layers to ten adds rows to verify against; it does not add agents to run the work. That is why a deep ledger never trips the overhead rules above — "count tokens, not agents" and "the graph earns itself, or it is overhead" are both agent-cost rules, and a ledger's depth is not an agent cost. The routing questions are unchanged by any of this: a graph still has to earn itself on independence, self-review contamination, durability, or consequence, exactly as before. A hard verification tree bolted onto a task with one clean verifier is still, by question 2, a loop.

The mapping from execution shape to ledger shape:

| Shape | Ledger |
|-------|--------|
| Loop | One ledger. The tree's layers are sections inside it, not separate nodes. |
| Graph | One ledger per leaf, each leaf declaring exact file ownership — the same partition the single-writer rule already requires and "partition beats lottery" already demands — plus a branch integration gate where leaves join. |
| Hybrid | Per-leaf ledgers, plus loop-internal gates inside any node whose work is genuinely ambiguous. |

Depth selection is human-first. A depth the user states is taken as given. Absent one, the orchestrator recommends a depth from grit's `METHOD.md` rubric and records the recommendation with its signals, so a human can accept or override it before work starts.

A rubric answer never changes because a ledger got deeper, and a ledger never gets shallower because the execution shape got simpler.

## Evidence

The rubric is not house opinion; it rests on findings that hold across agentic systems generally.

- **ComPilot**: a verified feedback loop — an external check the agent must satisfy before it's done — beats raw model quality by more than the spread between model tiers. A weaker model with a real verifier out-performs a stronger model iterating on vibes. Separately, constrained action vocabularies (a fixed, well-typed set of moves) beat free-form tool use by 14–16% on task success — narrowing the action space is not a limitation, it is a performance lever.
- **Agint**: the type-floor ladder (TEXT → structured → typed → verified-pure) shows that raising the floor of what an intermediate artifact is allowed to be — from loose text toward something schema-checked — reduces downstream failure compounding at every stage. Separately, **partition beats lottery**: dividing genuinely independent work across N agents (partition) reliably outperforms running the same work N times hoping one attempt lands (lottery). Fan-out only pays when the branches are actually independent; redundant fan-out on the same ambiguous task is a lottery ticket, not a strategy.
- **Count tokens, not agents.** Wall-clock and cost scale with tokens consumed, not with headcount of agents spawned. A ten-agent fan-out that duplicates the same shallow pass ten times costs ten times as much for the same result as one agent doing it once — more agents is not automatically more thorough.
- **The graph earns itself, or it is overhead.** Every additional node, gate, or parallel branch has to justify its cost in caught failures or genuine time saved. A graph built because it looks more sophisticated than a loop, without a concrete reason from the questions above, is decoration that slows delivery without buying safety.

## Failure signatures

Watch for these patterns; each is a signal the routing decision was wrong or the guardrails were dropped mid-execution.

- **No-progress loops** — repeated iterations against the same verifier failure with no narrowing of the gap. A loop with a hard cap should hit `BLOCK` here, not keep spinning.
- **Verifier/implementer contamination** — the same agent, or the same model family under different framing, both writes and grades the work. This is not verification, it is self-agreement wearing a verification costume.
- **Fan-out without partition** — parallel branches that are not actually independent, silently duplicating effort and inflating token cost for no corresponding gain in coverage or confidence.
- **Gates silently dropped under degradation** — when a harness can't run the full graph (no fan-out support, reduced tooling) and quietly falls back to a lighter mode without carrying the human gate along. Degradation changes execution shape; it never removes a gate.

## Prohibited patterns

- **Same-model majority voting** as a substitute for verification. Three votes from the same model family agreeing with itself is correlated error, not independent confirmation.
- **Unbounded "until dry."** Any loop-until-convergence pattern needs an explicit stop condition and a hard cap — "keep going until nothing new turns up" without a cap is a runaway, not a rigor.
- **Multiple writers per checkout.** Exactly one agent holds write authority over a given scope at a time; concurrent writers racing on the same files is how coherent diffs become corrupted ones.
- **Dropping a human gate to preserve throughput.** A high-consequence write always waits on its human node (see `GRAPH.md`); "we were moving fast so we skipped the approval" is never an acceptable trade against velocity.

Every node has a single writer and, wherever the work is consequential, an external verifier distinct from that writer. Caps and stop states are hard, not aspirational — `success`, `dry`, `no-progress`, `budget`, and `blocked` are the only ways a loop or graph node ends.
