# Architecture: Loop vs graph

This is the routing rule behind the [Orchestrate](Skill-Orchestrate) skill. The rule is to route on whether a result can be verified, never on how difficult a task appears. A hard task that has one clean verifier still belongs in a loop. An easy task that splits into independent branches still belongs in a graph.

A loop covers one artifact, one verifier, and one context window. A single writer repeats the work until the verifier passes or a hard limit is reached.

A graph covers independent workstreams, separate rubrics for each stage, state that must survive beyond a single session, or a high-consequence write. Its nodes are typed as either `agent` or `human`; see [GRAPH.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/orchestrate/GRAPH.md) for the two schemas. Its edges are explicit handoffs of a defined artifact — never an assumption that the previous step has already finished.

A hybrid is a graph that carries the overall shape of the work, with a loop running inside any single node whose internal work is genuinely open-ended.

The full routing order, the evidence behind it — including findings from ComPilot on verified feedback loops and from Agint on its type-floor ladder and its comparison of partitioned work against redundant fan-out — the failure patterns to watch for, and the practices this repository prohibits (voting among instances of the same model, an unbounded "run until nothing new turns up," and more than one writer on a single checkout) are documented in full in [RUBRIC.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/orchestrate/RUBRIC.md). This page is a map to that document, not a substitute for it.
