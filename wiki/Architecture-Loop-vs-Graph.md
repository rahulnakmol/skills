# Architecture: Loop vs graph

The routing rubric behind [Orchestrate](Skill-Orchestrate). Route on verifiability, never on difficulty — a hard task with one clean verifier still belongs in a loop, and an easy task that fans into independent branches still belongs in a graph.

**Loop** — one artifact, one verifier, one context window. A single writer iterates until the verifier passes or a hard cap is hit.

**Graph** — independent workstreams, per-stage rubrics, state that must survive the session, or a high-consequence write. Nodes are typed `agent` or `human` (see [GRAPH.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/orchestrate/GRAPH.md)); edges are explicit artifact handoffs, never an implicit "the previous step probably finished."

**Hybrid** — a graph shell carrying the overall shape, with a loop running inside any node whose internal work is genuinely ambiguous.

The full first-hit-wins routing order, the evidence it rests on (ComPilot's verified-feedback-loop findings, Agint's type-floor ladder and partition-vs-lottery fan-out, count-tokens-not-agents), the failure signatures to watch for, and the prohibited patterns (same-model majority voting, unbounded "until dry," multiple writers per checkout) all live in [RUBRIC.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/orchestrate/RUBRIC.md) — this page is the map, that file is the doctrine.
