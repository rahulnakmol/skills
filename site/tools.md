---
layout: default
title: "Tools"
description: "How each of the five supported tools installs and calls a skill: Claude Code, OpenCode, Cursor, Codex, and GitHub Copilot."
permalink: /tools/
---

# Tools

Every skill in this catalog is authored once and runs the same way in five tools: Claude Code, OpenCode, Cursor, Codex, and GitHub Copilot. All five read the identical `SKILL.md` files; what differs is how each tool installs them, how a skill is called once installed, and how the repository checks that a piece of work is actually finished. This page states those three facts for each tool. The commands here match [`.agents/install-block.md`](https://github.com/tqnonline/skills/blob/main/.agents/install-block.md), the repository's canonical install reference — if the two ever disagree, that file is the source of truth.

## Install once, use in all five tools

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

The first command fetches this repository's skill catalog and places it in `.claude/skills/`, the directory Claude Code reads, and in `.agents/skills/`, the directory OpenCode, Cursor, Codex, and GitHub Copilot all read. The second wires the tool-specific execution layer on top of that catalog. With no `--tool` flag it installs both of the two tools that have one: the Claude Code worker subagents (`work-fast`, `work-deep`, `reviewer`) into `~/.claude/agents`, and the OpenCode agent roster, slash commands, and workflow runner into `~/.config/opencode`. Pass `--tool <name>` — `claude`, `opencode`, `cursor`, `codex`, or `copilot` — to install one tool's layer alone; the sections below name what each one does.

Installing less than the full catalog uses a different script, `link-skills.sh`, scoped to one group or one skill:

```bash
./scripts/link-skills.sh --group developer
```

Links every skill in the `developer` group into the default buckets (`~/.agents/skills`, `~/.claude/skills`, `~/.cursor/skills`, `~/.copilot/skills`), plus `core`. Selecting a group always links `core` alongside it, because every group may reference core doctrine and none of them resolve without it.

```bash
./scripts/link-skills.sh --skill grit
```

Links only the `grit` skill into the same default buckets, without pulling in the rest of its group or core — a lone `--skill` selection is left alone. Add `--target <dir>` to either command to link into a project-local directory instead of the default buckets, `--list` to print every group and the skills inside it without linking anything, and `--dry-run` to preview what a command would link without changing anything.

## Claude Code

Installing the skills places them in `.claude/skills/`, the directory Claude Code reads. A skill is called the way its frontmatter's invocation axis declares. A **user-invoked** skill runs when a person types its name or its slash command; a **model-invoked** skill runs when an orchestrating skill calls it through the Skill tool. Beyond the shared install above, `./scripts/install-adapters.sh --tool claude` copies the three worker subagents — `work-fast`, `work-deep`, and `reviewer` — into `~/.claude/agents`, and the repository ships as a Claude Code plugin, so it also carries three dynamic workflows as plugin slash commands: `/rahulnakmol-skills:assess-work-item`, `/rahulnakmol-skills:deliver-work-item`, and `/rahulnakmol-skills:shakedown-pr`.

Claude Code also has a Stop hook, installed separately with `./scripts/install-adapters.sh --tool claude-hooks`, that can block a session from ending while `grit`'s gate ledger has unmet gates. It is opt-in and is never part of the default install. Among the five tools, only Claude Code and Codex can stop a session directly rather than flag the problem after the fact. Claude Code's hook is verified against live sessions; Codex's is verified against Codex's published hook schema rather than a live session.

## OpenCode

Installing the skills places them in `.agents/skills/`, the directory OpenCode reads. Beyond the shared install above, `./scripts/install-adapters.sh --tool opencode` copies the agent roster into `~/.config/opencode/agents`, the slash commands into `~/.config/opencode/commands`, and the deterministic workflow runner into `~/.config/opencode/workflows`.

A skill is reached through a matching command file the adapter installs — for example, `/grit-verify` runs the grit skill's gate check, and `/press` runs the press skill's render procedure. Each command file binds to one of the installed agents and carries out the skill's procedure. Enforcement runs through the same route: OpenCode has a `grit-verify` command and a rule in its verify agent, so unmet gates preclude a handoff-ready verdict.

## Catalog readers — Cursor, Codex, GitHub Copilot

Installing the skills places all three tools' copy in `.agents/skills/`, the directory each one reads; none needs a further file to be copied. For these three, `install-adapters.sh --tool cursor`, `--tool codex`, or `--tool copilot` prints a pointer to that tool's own `adapters/<tool>/README.md` instead of copying anything, because none needs more than the shared catalog. All three read that catalog as plain context and apply a skill by following the shared repository rules in `AGENTS.md`. None gets a command layer from this repository, so calling a skill is a plain ask typed into the tool's own chat, not a slash command.

What genuinely differs among the three:

- **Cursor** routes model choice through its own `auto` mode rather than a pinned model identifier, and a team adds its rules to `.cursor/rules/`. Cursor ships a hooks system of its own, but this repository does not yet include a Cursor hook. `grit` enforcement there is instead a rule a team adds in that same directory, backed by `grit-gates.yml`, a dispatch-only continuous-integration workflow that fails when a gate is unmet.
- **Codex** additionally reads a generated sidecar, `agents/openai.yaml`, built by `scripts/gen-openai-yaml.mjs` from every skill's frontmatter and never hand-edited, so it sees the same skill names and descriptions the other four tools do, and a team adds its rules directly to `AGENTS.md`. Codex also has a Stop hook, installed separately with `./scripts/install-adapters.sh --tool codex-hooks`, that can block a session from ending while `grit`'s gate ledger has unmet gates. It delegates to the same vendored checker the Claude Code hook uses, so the two tools share one ledger parser. It is opt-in, never part of the default install, and verified against Codex's published hook schema rather than a live Codex session.
- **GitHub Copilot** applies a skill through `.github/copilot-instructions.md`, once a team has added one; this repository ships recommended rule text for that file in `adapters/copilot/README.md`. This repository ships no hook that could intercept a Copilot session at the point it would report a task complete, so enforcement here relies on two mechanisms instead of one. The recommended instruction tells the agent to read `GATES.md` and check every gate before reporting completion. The `grit-gates.yml` continuous-integration workflow lints the ledger independently of what the agent reported, and fails the check when a gate is unmet.
