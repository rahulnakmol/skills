# Claude adapter

Thin worker stubs in `agents/`; promoted skills install via `npx skills add`.

- Plugin manifest: `../../.claude-plugin/plugin.json`
- Workers: `work-fast`, `work-deep`, `reviewer`
- Dynamic workflows: `workflows/` — the delivery pipeline as Claude Code dynamic workflows, namespaced by the plugin as `/rahulnakmol-skills:<name>`

## Workflows

| Workflow | Stage | What it does |
|----------|-------|--------------|
| `assess-work-item` | Pickup critique | Four perspective-diverse critics review a `raised` item — contract, alignment, codebase reality, and unstated design tradeoffs — each lens flows straight into adversarial verification of its own findings, and one consolidated critique posts to the tracker with the `critiqued` label |
| `deliver-work-item` | Implementation | Refuses any item not at `ready`; plans layers, implements as a single writer in an isolated worktree, verifies with a separate agent in a bounded fix loop, then raises one PR or a `gh stack` of layered PRs |
| `shakedown-pr` | PR review | Builds, tests, and executes the PR in a sandbox, reviews it through three verified lenses, consumes existing check runs (including GitHub Code Quality), and submits a review that blocks on a red run |

Human gates sit between the workflows, matching the pickup-protocol state machine — the runtime allows no mid-run user input, so each gate is a separate run by design. `scripts/pipeline.sh` launches any stage headless (`claude -p`) or interactively, on either engine.

Install: `../../scripts/install-adapters.sh --tool claude`
