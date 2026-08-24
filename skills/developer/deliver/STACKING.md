# Stacked pull requests

A change too large to hold in a reviewer's head does not ship as one giant pull request. It ships as a stack: a dependency-ordered chain of small pull requests, each covering exactly one concern, reviewed and merged from the base upward. This is how an agent-generated change stays reviewable by a person — the single most important property the delivery pipeline protects.

## When to stack

Stacking a multi-concern change is never optional — it is the default posture for `deliver-work-item`, not a judgment call to skip under time pressure. Stack when either condition holds; a genuinely single-concern change too small to layer opens as one pull request instead.

- The diff spans more than one concern — for example, a data model, an API on top of it, and a UI on top of that. One concern per pull request.
- The diff is too large to review in one sitting. As a working threshold, treat roughly 400 changed lines as the point to start considering layers; judgment decides where exactly to cut a layer, never whether a genuine multi-concern change gets to skip stacking.

## How to layer

Identify the foundational work and place it lowest. Layer dependent work above it in dependency order, so each pull request builds on a reviewed checkpoint below it. Layers partition the change: no file belongs to two layers. The `deliver-work-item` workflow plans layers before implementation and commits per layer, so the history splits cleanly when the stack is raised.

## Tooling

Stacked pull requests are a native GitHub platform feature, in **public preview** since July 30, 2026 — not just a client-side convention the `gh stack` CLI extension bolts on. A PR that is part of a stack carries a **stack map** at the top of the page showing how it fits the larger change, and the platform itself, not the CLI, does the mechanical work: merging the ready layer merges every unmerged layer below it in one operation, and when a lower layer merges on its own, every pull request above it stays open and gets an automatic rebase and retarget on GitHub's own servers — no manual rebase step for the agent or the reviewer. Existing branch protections and required status checks still govern every layer exactly as before; nothing about the preview changes what gates a merge.

The `gh stack` CLI extension is the interface to this native feature:

- `gh stack init` — create the stack against its base (this repository's base is `dev`)
- `gh stack add` — add one branch per layer, in dependency order
- `gh stack push` and `gh stack submit` — push the branches and open the linked pull requests
- `gh stack sync` — propagate a change in a lower layer upward through the stack
- `gh stack rebase` — cascade a rebase after the base moves; increasingly a fallback now that the platform rebases automatically on a lower-layer merge, but still needed when the stack's own base branch (`dev`) itself moves

`gh extension install github/gh-stack` installs the extension, and `gh skill install github/gh-stack` teaches coding agents the stack commands. Merge-queue support for stacks is rolling out progressively during the preview — where it is not yet available for this repository, that degradation is stated, never silently worked around. When the extension itself is unavailable, the fallback is manual: one branch per layer, each pull request's base set to the branch below it, the bottom one based on `dev`, and a stack map ("layer N of M, depends on #X") in every pull request body — the same information the native stack map shows, written by hand.

## Review and merge order

Read the stack top-down to understand the end goal; review it bottom-up so each layer is judged against an already-reviewed foundation. Continuous-integration checks evaluate each pull request against the stack base. Merge from the base to the tip, one approved layer at a time. When a reviewer requests changes in a lower layer, fix it there and sync the stack upward — never patch the same problem again in a higher layer.

## How the pipeline uses this

- `deliver-work-item` (the Claude dynamic workflow) plans layers at the Plan phase, commits per layer at the Implement phase, and raises either one pull request or a `gh stack` at the Raise phase.
- `shakedown-pr` reviews each layer against its own stack base, so a red result points at the layer that caused it, not at the whole feature.
