# Tool guidance

The skills are authored once and run in five tools. The portable core — every `SKILL.md` and its reference documents — installs identically everywhere through `npx skills@latest add rahulnakmol/skills`, which places the catalog in `.agents/skills/` (read by most tools) and `.claude/skills/` (read by Claude Code). What differs per tool is the execution power layered on top: adapters, workflows, and the runner. This page covers each tool in turn.

## Claude Code

Claude Code gets the deepest integration, because the repository ships as a Claude Code plugin.

- **Install**: `npx skills@latest add rahulnakmol/skills` for the skills, `./scripts/install-adapters.sh --tool claude` for the worker subagents (`work-fast`, `work-deep`, `reviewer`).
- **Dynamic workflows**: the delivery pipeline ships as three plugin workflows — `/rahulnakmol-skills:assess-work-item`, `/rahulnakmol-skills:deliver-work-item`, and `/rahulnakmol-skills:shakedown-pr` (Claude Code v2.1.154 or later). Each orchestrates its agents in the background and reports one result.
- **Headless**: `claude -p "Run the /rahulnakmol-skills:<name> workflow with args {...}"`, or `scripts/pipeline.sh <stage> <ref> --engine claude`, which builds that prompt for you. Add `--interactive` to open a session instead.
- **A note on effort**: the workflows carry their own orchestration, so the session's `ultracode` setting is not required for them; it remains useful for open-ended tasks outside the pipeline.

## OpenCode

OpenCode has no native workflow runtime, so the repository supplies one: the deterministic template runner in `tools/opencode-workflows/`.

- **Install**: the universal skills install, plus `./scripts/install-adapters.sh --tool opencode` for the full agent roster (orchestrators, workers, verifiers, and the specialist lanes).
- **Workflows**: seven fixed DAG templates — `design`, `deliver`, `review`, `assure`, `maintenance`, and the pipeline parity pair `assess` and `shakedown` — run through `runner.mjs` with durable state, bounded budgets, and explicit terminal states. Runs are read-only by default; `--apply` is required for anything that mutates or executes.
- **Headless**: `scripts/pipeline.sh <stage> <ref> --engine opencode`, or the runner directly. Posting results to a tracker is a separate, explicit step on this engine — side effects stay visible.

## Codex

- **Install**: the universal skills install; Codex reads the catalog from `.agents/skills/`.
- **Sidecar**: `agents/openai.yaml` is generated from every skill's frontmatter (`scripts/gen-openai-yaml.mjs` — never hand-edit it) so Codex sees the same names and descriptions.
- **Execution shape**: Codex has no fan-out runtime, so graph-mode work degrades to a sequential loop over the same stage contracts — gates are never dropped in degradation. Headless runs use `codex exec` per the work-item contract's run block.

## Cursor

- **Install**: the universal skills install; Cursor reads `.agents/skills/`.
- **Models**: the registry maps Cursor to its `auto` mode rather than pinning model identifiers — Cursor's own routing chooses within the session.
- **Execution shape**: use Cursor's native multitask for parallel work, or `cursor-agent -p` headless per the contract's run block. Graph gates apply the same way: a human gate is a stop, not a suggestion.

## GitHub Copilot

- **Install**: the universal skills install; Copilot's agent mode reads `.agents/skills/`.
- **Models**: the OpenCode adapters bind through `github-copilot/<model>` identifiers, so a Copilot subscription is one way the registry's published models are actually served.
- **Execution shape**: agent mode runs one lane at a time; like Codex, multi-lane work degrades to a sequential loop. Headless runs use `copilot -p` per the contract's run block.

## The rule underneath all five

Tool-specific power lives in `adapters/` and never leaks into a `SKILL.md`, so a skill file never breaks a tool that lacks a feature. When a tool cannot run a graph, the degradation ladder is always the same: parallel graph → sequential graph with artifacts on disk → checkpointed loop — and human gates survive every rung of it.
