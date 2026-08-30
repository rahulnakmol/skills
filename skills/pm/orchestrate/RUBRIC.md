# Grill-loop vs parallel-fan vs hybrid rubric

Route on how the work actually converges, never on how important it looks. Most PM work does not have a machine-checkable "done" the way code does — it converges through human judgment, applied round after round, or it doesn't converge at all. This rubric adapts the developer group's loop/graph/hybrid routing (`orchestrate/RUBRIC.md`) to that reality, without standing up dynamic-workflow automation to run it — the decision is made by an agent applying this rubric, not by a scripted pipeline.

## Routing questions

Apply in order — first hit wins, do not keep evaluating once a rule matches:

1. **Does this converge only through a human's sign-off, one round at a time?** → **Grill-loop.** A single line of questioning, themed rounds, immediate capture, the round protocol from `grill/GRILL-PM.md`. Discovery, a case's sensitivity analysis, a PRD's story quality — each converges by a person reacting to what came back, not by a machine check passing.
2. **Are there genuinely independent pieces of evidence to gather, none of which depends on another's answer?** → **Parallel-fan.** Commissioning three research briefs on three unrelated questions, or running the grill's provoke mode with two or three contrasting hypotheses at once, fans out safely because the branches do not need each other's output to proceed.
3. **Does self-review contaminate the result** — would the same agent drafting a case and then reviewing its own sensitivity analysis miss what it already missed once? → **Parallel-fan**, with a distinct reviewing agent, the same discipline `AGENT-OWNERSHIP.md` requires of every gate.
4. **Is this a high-consequence artifact** — a case a sponsor is about to approve, a PRD about to reach Quality, a constitution revision? → **Grill-loop plus a human gate.** No amount of agent confidence substitutes for the sign-off a gate in `GATES.md` requires.
5. **None of the above cleanly fit?** → **Hybrid**: a grill-loop shell carries the overall convergence, with a parallel-fan round of research or provoked hypotheses feeding any one round whose evidence base is thin.

## Evidence

- The grill's own round protocol (`grill/GRILL-PM.md`) already shows that PM convergence is iterative and human-judged — a single unreviewed pass reliably under-interrogates an artifact, the same failure a raw loop with no verifier shows on the code side.
- **Partition beats lottery** carries over from the developer rubric unchanged: three research agents each covering a genuinely different question outperforms three agents redundantly answering the same question hoping one is more thorough.
- **Count tokens, not agents.** A parallel-fan of five research agents that duplicates the same shallow question five times costs five times as much for the same result as one agent asking it once.

## Failure signatures

- **A grill-loop that never stops** — rounds continuing with no narrowing of the open questions and no exit offered. `GRILL-PM.md`'s exit criteria exist precisely to catch this.
- **Parallel-fan without partition** — commissioning three research briefs that all answer the same question because the branches were never actually made independent.
- **Reviewer and drafter contamination** — the agent that wrote the case also reviews its own sensitivity analysis, producing agreement dressed as verification.

## Prohibited patterns

- **Same-model majority voting** as a substitute for a human gate — three agents agreeing with each other is not a sponsor's sign-off.
- **Unbounded provoke mode.** Provoke commissions two or three hypotheses, never an open-ended search for more candidates until something interesting turns up.
- **Skipping the human gate under time pressure.** A case or PRD that reaches Investment or Quality without its gate's sign-off has not been delivered faster, it has been delivered unapproved.

Every routing decision names which shape it chose and why, in the same one-line form the developer rubric uses: mode, and the routing question that decided it. Model selection per step still goes through `model-routing` — a grill round's question-generation step and a research agent's fact-gathering step do not need the same tier. Where a gate carries a grit ledger, the shape decision made here never changes the ledger's depth — a grill-loop walks one ledger, and a parallel-fan gives each genuinely independent branch its own leaf ledger, the same independence this rubric already requires of a fan. This division of authority — shape from orchestration, depth from grit — follows the developer rubric's own split in `orchestrate/RUBRIC.md`.
