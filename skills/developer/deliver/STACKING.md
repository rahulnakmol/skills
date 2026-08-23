# Stacked pull requests

A change too large to hold in a reviewer's head does not ship as one giant pull request. It ships as a stack: a dependency-ordered chain of small pull requests, each covering exactly one concern, reviewed and merged from the base upward. This is how an agent-generated change stays reviewable by a person — the single most important property the delivery pipeline protects.

## When to stack

Stack when either condition holds; otherwise open a single pull request.

- The diff spans more than one concern — for example, a data model, an API on top of it, and a UI on top of that. One concern per pull request.
- The diff is too large to review in one sitting. As a working threshold, treat roughly 400 changed lines as the point to start considering layers; judgment, not the number, decides.

## How to layer

Identify the foundational work and place it lowest. Layer dependent work above it in dependency order, so each pull request builds on a reviewed checkpoint below it. Layers partition the change: no file belongs to two layers. The `deliver-work-item` workflow plans layers before implementation and commits per layer, so the history splits cleanly when the stack is raised.

## Tooling

GitHub supports stacks natively through the `gh stack` CLI extension:

- `gh stack init` — create the stack against its base (this repository's base is `dev`)
- `gh stack add` — add one branch per layer, in dependency order
- `gh stack push` and `gh stack submit` — push the branches and open the linked pull requests
- `gh stack sync` — propagate a change in a lower layer upward through the stack
- `gh stack rebase` — cascade a rebase after the base moves

`gh extension install github/gh-stack` installs the extension, and `gh skill install github/gh-stack` teaches coding agents the stack commands. When the extension is unavailable, the fallback is manual: one branch per layer, each pull request's base set to the branch below it, the bottom one based on `dev`, and a stack map ("layer N of M, depends on #X") in every pull request body.

## Review and merge order

Read the stack top-down to understand the end goal; review it bottom-up so each layer is judged against an already-reviewed foundation. Continuous-integration checks evaluate each pull request against the stack base. Merge from the base to the tip, one approved layer at a time. When a reviewer requests changes in a lower layer, fix it there and sync the stack upward — never patch the same problem again in a higher layer.

## How the pipeline uses this

- `deliver-work-item` (the Claude dynamic workflow) plans layers at the Plan phase, commits per layer at the Implement phase, and raises either one pull request or a `gh stack` at the Raise phase.
- `shakedown-pr` reviews each layer against its own stack base, so a red result points at the layer that caused it, not at the whole feature.
