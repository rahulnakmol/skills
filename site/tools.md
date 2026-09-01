---
layout: default
title: "Tools"
description: "How each of the five supported tools installs and calls a skill: Claude Code, OpenCode, Cursor, Codex, and GitHub Copilot."
permalink: /tools/
---

# Tools

Every skill in this catalog is authored once and runs the same way in five tools: Claude Code, OpenCode, Cursor, Codex, and GitHub Copilot. All five read the identical `SKILL.md` files; what differs is how each tool installs them, how a skill is called once installed, and how the repository checks that a piece of work is actually finished. This page states those three facts for each tool. The commands here match [`.agents/install-block.md`](https://github.com/tqnonline/skills/blob/main/.agents/install-block.md), the repository's canonical install reference — if the two ever disagree, that file is the source of truth.

## Claude Code

Installing the skills places them in `.claude/skills/`, the directory Claude Code reads. `./scripts/install-adapters.sh --tool claude` additionally copies three worker subagents — `work-fast`, `work-deep`, and `reviewer` — into `~/.claude/agents`, and the repository ships as a Claude Code plugin, so it also carries three dynamic workflows as plugin slash commands: `/rahulnakmol-skills:assess-work-item`, `/rahulnakmol-skills:deliver-work-item`, and `/rahulnakmol-skills:shakedown-pr`.

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh --tool claude
```

A skill is called the way its frontmatter's invocation axis declares. A **user-invoked** skill runs when a person types its name or its slash command; a **model-invoked** skill runs when an orchestrating skill calls it through the Skill tool. Claude Code also has a Stop hook, installed separately with `./scripts/install-adapters.sh --tool claude-hooks`, that can block a session from ending while `grit`'s gate ledger has unmet gates. It is opt-in and is never part of the default install, but it is the deepest completion enforcement among the five tools, because it is the only one that can stop a session directly rather than flag the problem after the fact.

## OpenCode

Installing the skills places them in `.agents/skills/`, the directory OpenCode reads. `./scripts/install-adapters.sh --tool opencode` additionally copies the agent roster into `~/.config/opencode/agents`, the slash commands into `~/.config/opencode/commands`, and the deterministic workflow runner into `~/.config/opencode/workflows`.

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh --tool opencode
```

A skill is reached through a matching command file the adapter installs — for example, `/grit-verify` runs the grit skill's gate check, and `/press` runs the press skill's render procedure. Each command file binds to one of the installed agents and carries out the skill's procedure. Enforcement runs through the same route: OpenCode has a `grit-verify` command and a rule in its verify agent, so unmet gates preclude a handoff-ready verdict.

## Cursor

Installing the skills places them in `.agents/skills/`, the directory Cursor reads; there is no further file to copy. `./scripts/install-adapters.sh --tool cursor` prints a pointer to `adapters/cursor/README.md` rather than copying anything, because Cursor needs nothing beyond the shared catalog.

```bash
npx skills@latest add tqnonline/skills
```

This repository ships no command layer for Cursor. It reads the skill catalog as context and applies a skill by following the shared repository rules in `AGENTS.md`, routing model choice through its own `auto` mode rather than a pinned model identifier. Cursor ships a hooks system of its own, but this repository does not yet include a Cursor hook. Until it does, `grit` enforcement is a rule in `.cursor/rules/`, backed by `grit-gates.yml`, a dispatch-only continuous-integration workflow that fails when a gate is unmet.

## Codex

Installing the skills places them in `.agents/skills/`, the directory Codex reads. Codex also reads a generated sidecar, `agents/openai.yaml`, built by `scripts/gen-openai-yaml.mjs` from every skill's frontmatter and never hand-edited, so it sees the same skill names and descriptions as the other four tools.

```bash
npx skills@latest add tqnonline/skills
```

Like Cursor, Codex gets no command layer from this repository. Invocation is driven by `AGENTS.md` and the skill files themselves, which Codex reads as working context. Codex ships a hooks system of its own, but this repository does not yet include a Codex hook, so `grit` enforcement is a rule in `AGENTS.md`, backed by the same `grit-gates.yml` continuous-integration workflow.

## GitHub Copilot

Installing the skills places them in `.agents/skills/`, the directory Copilot's agent mode reads.

```bash
npx skills@latest add tqnonline/skills
```

Copilot gets no command layer from this repository either. It reads the catalog as context, driven by an instructions file, `.github/copilot-instructions.md`. This repository ships no hook that could intercept a Copilot session at the point it would report a task complete, so enforcement here relies on two mechanisms instead of one. The instruction in `.github/copilot-instructions.md` tells the agent to read `GATES.md` and check every gate before reporting completion. The `grit-gates.yml` continuous-integration workflow is the backstop: it lints the ledger independently of what the agent reported and fails the check when a gate is unmet.

## Install one group or one skill

The commands above install the full catalog. To install less, `scripts/link-skills.sh` scopes the install to one group or one skill.

```bash
./scripts/link-skills.sh --group developer
```

Links every skill in the `developer` group into the default buckets (`~/.agents/skills`, `~/.claude/skills`, `~/.cursor/skills`, `~/.copilot/skills`), plus `core`. Selecting a group always links `core` alongside it, because every group may reference core doctrine and none of them resolve without it.

```bash
./scripts/link-skills.sh --skill grit
```

Links only the `grit` skill into the same default buckets, without pulling in the rest of its group or core — a lone `--skill` selection is left alone.

Add `--target <dir>` to either command to link into a project-local directory instead of the default buckets, `--list` to print every group and the skills inside it without linking anything, and `--dry-run` to preview what a command would link without changing anything.
