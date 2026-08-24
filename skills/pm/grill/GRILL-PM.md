# The PM grill

The grill is where a business artifact earns the right to advance — an analysis, a manifest, a case, or a PRD is not ready because it looks complete, it is ready because it survived interrogation. This doctrine is inspired by mattpocock's `grill-me` and `grill-with-docs` pattern, not copied from it, and it shares its lineage directly with the developer group's `impact/GRILL.md`, which the round protocol below reuses by reference rather than reinventing.

## Round protocol

Rounds follow the same shape as `impact/GRILL.md`: three to five questions per round, drawn from one dominant theme rather than scattered across all of them, answers captured immediately rather than deferred. At the end of each round, restate the sharpened scope in three sentences or fewer, then close with the same three-way choice: continue, stop, or move to sign-off. The user may say **"we stop here"** at any point, in any round, and the loop ends immediately — no closing argument, no extra round squeezed in first. Stopping is never silent: every trade-off implicitly accepted by stopping early is written down before the session closes.

## Grill with docs

When a research corpus exists in `specs/research/` (per `RESEARCH-AGENTS.md`), every question in this mode must cite the specific document and passage that motivated it — a question with nothing to cite is either not grounded or the corpus has a gap, and either finding gets recorded. A claim in the artifact that the corpus does not actually support is itself a finding, surfaced to the user rather than quietly resolved in the artifact's favor.

## Provoke

Provoke mode commissions two or three contrasting candidate framings from the intuition agents described in `RESEARCH-AGENTS.md`, each pushed deliberately toward star 7 or star 8 ambition on the 11-Star scale, and each explicitly labeled a hypothesis — never presented as a finding. The candidates are handed back into the round protocol above; the human's reaction to each one, agreement or rejection, is itself the output of the round, not a formality on the way to one.

## Personas and their questions

The grill's question bank is persona-aware because a junior product manager and a Chief Business Transformation Officer are grilled on the same artifact for different reasons. A Product Manager is pressed on scope and user value. A Business Architect is pressed on process fit and capability gaps. A Transformation Leader is pressed on organizational readiness and sequencing risk. A Chief Business Transformation Officer is pressed on portfolio-level trade-offs and the north-star contribution — does this initiative's case for existing survive being read next to every other initiative competing for the same budget. Every rung gets the same round protocol; what changes is which theme the questions lean toward.

## Exit criteria

The grill exits exactly two ways: an explicit user stop, or explicit sign-off at the relevant gate. There is no third path — it does not time out and does not advance because the facilitator judges it sufficient. Sign-off has one hard precondition: the artifact's core question — the business value, the manifest's DIVE validation, the case's recommendation, or the PRD's story — must actually be answered, not left as a placeholder. Before any gate, the grill also runs the pre-gate blind-spot checklist from `AGENT-OWNERSHIP.md` — an artifact that "ran out of questions" without that checklist having run is a stall dressed up as completion, and it gets said plainly rather than waved through.
