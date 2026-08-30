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

Nodes = skills or adapter roles; edges = contracts. Join nodes only on explicit artifact handoff (PRD, brief, manifest, or a human node's recorded decision) — never on an implicit "the previous step probably finished." An edge into a `human` node carries the inputs that node's `inputs` field names; an edge out of one carries the decision that was made, not merely a pass/fail signal. Where leaves carry per-leaf ledgers, a join on artifact handoff also carries a branch integration gate from the grit ledger (`grit/METHOD.md`), because a set of individually passing leaves is not evidence the assembly works.

## Harness mapping

Work-item delivery runs as three graph stages, each with a human gate between them (the runtime allows no mid-run input, so the gates live between runs by design):

| Stage | Claude Code (dynamic workflow) | OpenCode (template runner) |
|-------|-------------------------------|----------------------------|
| Assess (pickup critique) | `/rahulnakmol-skills:assess-work-item` | `templates/assess.json` |
| Deliver (plan, implement, verify, raise PR or stack) | `/rahulnakmol-skills:deliver-work-item` | `templates/deliver.json` |
| Shakedown (sandbox build-test-execute + review) | `/rahulnakmol-skills:shakedown-pr` | `templates/shakedown.json` |

`scripts/pipeline.sh <stage> <ref> --engine claude|opencode [--interactive]` launches either engine, headless or interactive. Codex, Cursor, and Copilot degrade to a sequential loop over the same stage contracts; gates are never dropped in degradation. Large diffs are raised as a reviewable stack per `deliver/STACKING.md`.
