# Graph mode

## Node types

A graph has exactly two node types. Both are first-class citizens of the DAG — a `human` node is not a stop condition bolted onto an otherwise all-agent graph, it is a typed node with its own schema, exactly like an `agent` node.

**`agent`** — a skill or adapter role executing work. Resolve its model via `model-routing` before dispatch. Single writer per checkout; pair with an external verifier whenever the node's output feeds a consequential downstream decision.

**`human`** — a named decision owner making a call the graph cannot make for itself. Schema:

```yaml
- id: approve-release
  type: human
  owner: <named decision owner>
  decision: <the exact question being asked>
  inputs: [<artifacts the owner needs to decide>]
  sla_hours: 48
  escalation: <who is asked when the SLA lapses>
```

Every high-consequence write in a graph passes through a `human` node before it executes — this is what turns "human-in-the-loop" from a compliance phrase into a property the graph can actually check. A lapsed SLA triggers the named escalation; it never triggers silent auto-approval. An `sla_hours` field with no `escalation` is an incomplete node and must not ship.

## Edges and joins

Nodes = skills or adapter roles; edges = contracts. Join nodes only on explicit artifact handoff (PRD, brief, manifest, or a human node's recorded decision) — never on an implicit "the previous step probably finished." An edge into a `human` node carries the inputs that node's `inputs` field names; an edge out of one carries the decision that was made, not merely a pass/fail signal.
