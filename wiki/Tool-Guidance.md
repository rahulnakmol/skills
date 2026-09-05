# Tool guidance

Full documentation for every skill: https://tqnonline.github.io/skills/.

The skills are authored once and run in six tools. The portable core — every `SKILL.md` and its reference documents — installs identically everywhere through `npx skills@latest add tqnonline/skills`, which places the catalog in `.agents/skills/` (read by most tools) and `.claude/skills/` (read by Claude Code). What differs per tool is the execution power layered on top: adapters, workflows, and the runner. This page covers each tool in turn.

## Claude Code

Claude Code gets the deepest integration, because the repository ships as a Claude Code plugin.

- **Install**: `npx skills@latest add tqnonline/skills` for the skills, `./scripts/install-adapters.sh --tool claude` for the worker subagents (`work-fast`, `work-deep`, `reviewer`).
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

## Amp

Amp reads the same `SKILL.md` format, so every skill runs as written. It also has its own installer and two hosted skill repositories, which is how one install reaches every orb a person or a workspace opens.

- **Install**: `scripts/install-amp.sh --group <group>` (or `--skill <name>`, or nothing for everything) runs the `amp skill add` calls a selection needs: the group, `core`, a doctrine wrapper per group, and the `tqn` router. `--target .agents/skills` scopes it to the current project; `--global` to the current machine. `scripts/publish-amp-skills.sh --scope personal|workspace` stages the same selection into Amp's hosted Personal Skills or Workspace Skills repository and stops before the push.
- **Doctrine**: `amp skill add` copies only directories that hold a `SKILL.md`, so the group doctrine files travel in generated `core-doctrine`, `developer-doctrine`, and `pm-doctrine` skills. The `tqn` skill tells Amp where a citation such as `core/VERIFICATION.md` resolves.
- **Where Amp already does the job**: `research` uses Librarian and the web tools; `recon` uses Finder and Librarian; `handoff` records thread URLs; `model-routing` binds tiers to Amp modes rather than to model identifiers; `shakedown` runs in an orb; `spotlight` renders through Amp's chart and diagram support. `tqn` carries the full table.
- **Execution shape**: an `agent` node runs as a Task subagent or, when it must not share the writer's context, as a new orb thread; a `human` node stops and asks; a recurring node becomes a thread schedule. Human gates survive unchanged.
- **This repository in an orb**: `.agents/setup` and `.agents/resume` link every skill into `.agents/skills/` and turn off Amp's commit trailers, which the repository forbids.

`adapters/amp/README.md` has the scope matrix and the plain `amp skill add` commands.

## Enforcing completion per tool

`grit`'s gate ledger is read the same way everywhere, but only some tools can be stopped from ending a session while gates remain unmet. Claude Code and Codex each have an opt-in stop hook, installed with the `claude-hooks` and `codex-hooks` targets of `scripts/install-adapters.sh`; neither is part of the default install, and both call the same vendored checker, so one ledger parser serves both. Claude Code's hook is verified against live sessions; Codex's is verified against Codex's published hook schema and has not yet been exercised against a live Codex session. OpenCode has a `grit-verify` command and a rule in its verify agent, so unmet gates preclude a handoff-ready verdict. For Cursor and GitHub Copilot this repository ships no hook — Cursor has a hook system of its own that an adapted hook could target later — so their enforcement today is a rule in the file each one already reads: `.cursor/rules/` and `.github/copilot-instructions.md`. Amp has an opt-in plugin, `adapters/amp/plugin/tqn-grit.js`, installed with the `amp-plugin` target of the same script; it runs the same vendored checker at Amp's `agent.end` event and continues the turn while gates are unmet, and it was exercised against a live orb thread once. Without it, the `tqn` skill asks for `gate-check.mjs --status` before work is reported done. Cursor, Copilot, and an Amp session without the plugin are backed by `grit-gates.yml`, a dispatch-only Action that lints the ledger and runs the checker in its parse-only mode. That Action is the backstop for every tool without a shipped hook, and it needs no secret, because parse-only mode executes nothing. `skills/core/grit/HOOKS.md` carries the exact snippets.

## The rule underneath all six

Tool-specific power lives in `adapters/` and never leaks into a `SKILL.md`, so a skill file never breaks a tool that lacks a feature. When a tool cannot run a graph, the degradation ladder is always the same: parallel graph → sequential graph with artifacts on disk → checkpointed loop — and human gates survive every rung of it.
