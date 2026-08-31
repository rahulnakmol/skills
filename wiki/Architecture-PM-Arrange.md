# Architecture: PM arrange

This is the routing rule behind the pm group's [Arrange](Skill-Arrange) skill — the same question the developer side's [Architecture: Loop vs graph](Architecture-Loop-vs-Graph) asks, adapted to work that converges through a human's judgment rather than a machine-checkable verifier.

A **grill-loop** covers work that converges only through a person reacting to a round of questions, one round at a time — a discovery interview, a case's sensitivity analysis, a PRD's story quality. This is `grill`'s round protocol, and it is the pm-side equivalent of the developer group's loop: one artifact, one convergence point, no branching.

A **parallel-fan** covers genuinely independent pieces of evidence — commissioning two or three research briefs on unrelated questions, or running the grill's provoke mode with contrasting hypotheses at once. It fans out safely only when the branches do not need each other's output, the same partition-not-lottery discipline the developer rubric applies to independent workstreams.

A **hybrid** is a grill-loop that carries the overall convergence, with a parallel-fan of research or provoked hypotheses feeding any one round whose evidence is thin.

Unlike the developer group's [Conduct](Skill-Conduct), arrange does not stand up dynamic-workflow automation to run the decision — it is a routing skill only, consulted before a multi-round effort in `discover`, `case`, `tom-architect`, or `prd-draft` begins. The full routing order, the evidence behind it, and the practices this repository prohibits — same-model majority voting standing in for a sponsor's sign-off, an unbounded provoke mode, skipping a gate under time pressure — are documented in full in [RUBRIC.md](https://github.com/tqnonline/skills/blob/main/skills/pm/arrange/RUBRIC.md). This page is a map to that document, not a substitute for it.
