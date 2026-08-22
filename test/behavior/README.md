# Behavior smoke tests

These are agent-behavior smoke tests, not deterministic assertions. They drive a live model through a skill and grep the transcript for expected behavioral markers.

Requirements: `ANTHROPIC_API_KEY` in the environment and the `claude` CLI on `PATH`. They are **never** run in default CI — they run manually, or via `workflow_dispatch` on `.github/workflows/behavior.yml`. A script exits `0` and prints a skip notice when the prerequisites are missing; it never fabricates a pass.

- `grill-smoke.sh` — feeds a vague idea through `impact`'s intake + one grill round; asserts a fast-cut PRD appeared, questions were asked, and the trade-off ledger was touched.
- `pickup-smoke.sh` — feeds an incomplete work item through the pickup protocol; asserts the agent critiques and asks questions instead of implementing.
- `shakedown-runbook.md` — a manual runbook (needs a real sandbox repo and PR) verifying a red test suite gets a blocking review, never an approval.
