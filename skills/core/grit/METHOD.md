# Verification depth and the four passes

This document covers how grit decides how finely a piece of work is decomposed into gates, and how implementation proceeds between them.

## Verification depth, not execution shape

Orchestration and grit answer two different questions, and confusing them is the most common way a planning agent misapplies both. A group's own routing rubric decides execution shape: whether the work runs as a loop, a graph, or a hybrid, routed on verifiability rather than difficulty. Grit decides verification depth: how finely "done" is decomposed into gates, once a shape has already been chosen. Neither authority reaches into the other's decision.

The distinction has a cost basis behind it, not just a naming convention. A gate is a ledger row — a line of Markdown with a CHECK, an EXPECT, and eventually an EVIDENCE string. Adding one costs the space it takes on the page and the seconds it takes `gate-check.mjs` to run it. A node is an agent — a context window, a model invocation, tokens spent reasoning and writing. Deepening a ledger from five layers to ten adds checks; it does not add agents. A routing rubric's "count tokens, not agents" and grit's depth tree are compatible for exactly this reason: a ten-layer ledger governing a single loop costs ten checks run against one artifact, not ten agents each producing their own.

The two compose along a fixed mapping:

- A **loop** — one artifact, one verifier, one context window — carries one ledger. Depth there means more gates against the same artifact, not more iterations of the loop.
- A **graph** — independent workstreams, each with its own rubric — carries one ledger per leaf, with each leaf's OWNS line declaring exact file ownership. This is the same partition the single-writer rule already requires for execution; grit's ledger makes that partition's completion checkable rather than trusted. Where leaves join, branch integration gates verify the composition specifically, because two individually passing leaves are not evidence the assembly between them works.
- A **hybrid** — a graph shell with a loop inside an ambiguous node — carries per-leaf ledgers at the graph level, plus loop-internal gates inside whichever node runs the loop, checking that node's own iterations without exposing loop-internal state to sibling leaves.

## Selecting depth

Depth is a human choice first, a rubric recommendation second, and it is recorded either way. A depth the user states — in the invocation itself, in the work item's Execution profile, or announced at a gate — is taken as given; grit does not override a stated depth with its own recommendation. Absent a stated depth, grit recommends one from the rubric below and records both the number and the signals that produced it, so a human reviewing the ledger can accept the recommendation or override it with a stated reason. What never happens is a silently applied default with no record of why.

Below the substantial threshold — a single concern, one artifact, one session — the rubric returns a flat ledger and no tree at all. A five-layer decomposition on a one-file fix is overhead the rubric names as overhead, not rigor; the same "the graph earns itself, or it is overhead" standard a routing rubric applies to execution shape applies here to verification shape. A ledger that costs more to write and check than the risk it is meant to catch has picked the wrong depth.

Above the threshold, depth starts at a base of 5 and adds one layer per signal present, capped at 10:

- **High consequence or an irreversible write** — production data, a release, an action that cannot be undone by rerunning the work.
- **A wide integration surface** — each additional contract or boundary the change crosses adds a place a passing component can still fail to compose.
- **Novelty** — no existing pattern in the codebase to follow, so the ledger cannot lean on a prior gate set that already proved itself.
- **Scope breadth** — owned paths spanning more than one concern, the same condition a delivery group's stacking convention uses to decide when a change needs more than one pull request layer.
- **Governance tier of limited or high** — the work item's own contract already names this tier; a higher tier means more of what could go wrong is expensive to have gone wrong.

The ledger records who chose the depth — user-stated or rubric-recommended — and, for a recommendation, which signals were present. A depth with no recorded source is not a depth grit produced; it is a number someone wrote down.

## Two worked selections

A one-line fix to a log message sits below the threshold: a single concern, one artifact, one session, no contract crossed, and a mistake is undone by editing the line again. The rubric returns a flat ledger — a few gates in one file, no tree. A five-layer decomposition here would cost more to write and check than the error it could catch.

A payment-provider migration sits well above it. Base 5, plus one for the irreversible write, since money moves and a refund is a new transaction rather than an undo. Plus one for the integration surface, because the provider API, the ledger service, and the reconciliation job each sit on a different contract, and all three can pass their own checks while still failing to compose. Plus one for novelty, as no prior provider swap exists in the codebase to copy a proven gate set from. Plus one for the governance tier, which the item's contract already names as high. That is four signals on a base of 5, so the recommendation is depth 9. The scope-breadth signal is absent — the owned paths stay inside one payments module — and its absence is recorded too, because a rubric that only ever adds is not being applied. The ledger stores depth 9, rubric-recommended, with those four signals named, so a reviewer can see the number was derived rather than chosen. A human who disagrees states a different depth, and that stated depth wins.

## Building the tree

Once depth and shape are set, layers become leaves. Each leaf gets its own ledger with an OWNS line naming the exact repository-relative globs it may write — the same ownership discipline the single-writer rule enforces at execution time, made legible on the page. Branch integration gates sit above the leaves they join, and they check the composed result specifically: that the interfaces two leaves agreed on actually match, that a shared resource is not written twice, that the assembled artifact behaves as the sum of its parts rather than as parts that merely each individually pass.

## Dispatch state

Tree work tracks ownership at `.grit/<scope>/dispatch.json`, alongside that scope's ledger. `--claim` and `--release` on `gate-check.mjs` serialize a leaf's lease on its OWNS paths — a leaf claims before writing and releases when done, so two leaves never hold write access to the same path at the same time. `dispatch-check.mjs` reports this state without mutating it. A claim attempted against paths another leaf already holds returns exit code 3, a lease conflict, distinct from exit code 1 for an unmet gate — the two failures mean different things and a caller distinguishing them can retry a lease conflict without mistaking it for a failed check.

## The four passes

Implementation between the gates runs four passes, each with its own job:

1. **Complete** — build the deliverable fully. No placeholder, no stub left for later, no TODO standing in for a decision that was actually available to make now.
2. **Harden** — raise each component to production quality: error handling, input validation, the boundary cases a happy-path draft skips.
3. **Hunt** — search deliberately for defects across four categories: correctness, integration, portability, and performance. This pass assumes the first two passes left something behind, because they usually do.
4. **Polish** — run a full pass that finds nothing new. This is the pass's own stop condition, not a separate check: when a complete sweep across all four hunt categories turns up nothing the prior pass didn't already catch, the four passes are done.

The stop condition ties directly to the "dry" termination state a gated loop contract defines: two consecutive complete rounds producing zero new verified findings, not a single quiet pass that happened to find nothing because it wasn't looking hard. The passes still need a hard cap regardless — a loop contract of that kind is explicit that an unbounded "until nothing new turns up" is a runaway, not rigor, and the same caution applies here. A pass count with no ceiling is not thoroughness; it is a loop that has not yet been told to stop.

## Depth tree and stacked pull requests

A delivery group's stacking convention caps a reviewable pull-request stack at 2 to 4 layers, and grit's depth tree runs 5 to 10 layers. The two numbers look like they should reconcile and they measure different things entirely. A PR stack layer bounds what a human reviewer holds in their head while reading a diff — more than about four concerns in one sitting and a reviewer stops actually evaluating each one. A verification depth layer bounds what a checker verifies about one artifact — more granular gates catch more distinct ways a criterion can be silently unmet. A five-gate ledger can check a single PR-stack layer thoroughly; a ten-gate ledger can do the same for a more consequential single layer. Neither count constrains the other, and a planning agent should never derive one from the other or treat a mismatch between them as an inconsistency to resolve.
