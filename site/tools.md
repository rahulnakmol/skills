---
layout: page
title: "Tools"
description: "How each of the five supported tools installs and calls a skill: Claude Code, OpenCode, Cursor, Codex, and GitHub Copilot."
permalink: /tools/
eyebrow: "Five supported tools"
---

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

That command links every skill in the `developer` group into the default buckets (`~/.agents/skills`, `~/.claude/skills`, `~/.cursor/skills`, `~/.copilot/skills`), plus `core`. Selecting a group always links `core` alongside it, because every group may reference core doctrine and none of them resolve without it.

```bash
./scripts/link-skills.sh --skill grit
```

That one links only the `grit` skill into the same default buckets, without pulling in the rest of its group or core — a lone `--skill` selection is left alone. Add `--target <dir>` to either command to link into a project-local directory instead of the default buckets, `--list` to print every group and the skills inside it without linking anything, and `--dry-run` to preview what a command would link without changing anything.

## How each tool reaches a skill

Three mechanisms cover all five tools. Two tools get an execution layer this repository ships; the other three read the same catalog as plain context.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command, plugin workflows, opt-in stop hook</span></div>
<div class="tool-group-body">
<p>Installing the skills places them in <code>.claude/skills/</code>, the directory Claude Code reads. A skill is called the way its frontmatter's invocation axis declares. A <strong>user-invoked</strong> skill runs when a person types its name or its slash command; a <strong>model-invoked</strong> skill runs when an orchestrating skill calls it through the Skill tool.</p>
<p>Beyond the shared install above, <code>./scripts/install-adapters.sh --tool claude</code> copies the three worker subagents &mdash; <code>work-fast</code>, <code>work-deep</code>, and <code>reviewer</code> &mdash; into <code>~/.claude/agents</code>. The repository also ships as a Claude Code plugin, so it carries three dynamic workflows as plugin slash commands: <code>/rahulnakmol-skills:assess-work-item</code>, <code>/rahulnakmol-skills:deliver-work-item</code>, and <code>/rahulnakmol-skills:shakedown-pr</code>.</p>
<p>Claude Code also has a Stop hook, installed separately with <code>./scripts/install-adapters.sh --tool claude-hooks</code>, that can block a session from ending while <code>grit</code>'s gate ledger has unmet gates. It is opt-in and is never part of the default install. Among the five tools, only Claude Code and Codex can stop a session directly rather than flag the problem after the fact. Claude Code's hook is verified against live sessions; Codex's is verified against Codex's published hook schema rather than a live session.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">Command file, agent roster, workflow runner</span></div>
<div class="tool-group-body">
<p>Installing the skills places them in <code>.agents/skills/</code>, the directory OpenCode reads. Beyond the shared install above, <code>./scripts/install-adapters.sh --tool opencode</code> copies the agent roster into <code>~/.config/opencode/agents</code>, the slash commands into <code>~/.config/opencode/commands</code>, and the deterministic workflow runner into <code>~/.config/opencode/workflows</code>.</p>
<p>A skill is reached through a matching command file the adapter installs &mdash; for example, <code>/grit-verify</code> runs the grit skill's gate check, and <code>/press</code> runs the press skill's render procedure. Each command file binds to one of the installed agents and carries out the skill's procedure. Enforcement runs through the same route: OpenCode has a <code>grit-verify</code> command and a rule in its verify agent, so unmet gates preclude a handoff-ready verdict.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>Installing the skills places all three tools' copy in <code>.agents/skills/</code>, the directory each one reads; none needs a further file to be copied. For these three, <code>install-adapters.sh --tool cursor</code>, <code>--tool codex</code>, or <code>--tool copilot</code> prints a pointer to that tool's own <code>adapters/&lt;tool&gt;/README.md</code> instead of copying anything, because none needs more than the shared catalog. All three read that catalog as plain context and apply a skill by following the shared repository rules in <code>AGENTS.md</code>. None gets a command layer from this repository, so calling a skill is a plain ask typed into the tool's own chat, not a slash command.</p>
</div>
</div>

### What differs among the three catalog readers

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor routes model choice through its own <code>auto</code> mode rather than a pinned model identifier, and a team adds its rules to <code>.cursor/rules/</code>. Cursor ships a hooks system of its own, but this repository does not yet include a Cursor hook. Enforcement of <code>grit</code> there is instead a rule a team adds in that same directory, backed by <code>grit-gates.yml</code>, a dispatch-only continuous-integration workflow that fails when a gate is unmet.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex additionally reads a generated sidecar, <code>agents/openai.yaml</code>, built by <code>scripts/gen-openai-yaml.mjs</code> from every skill's frontmatter and never hand-edited, so it sees the same skill names and descriptions the other four tools do, and a team adds its rules directly to <code>AGENTS.md</code>.</p>
<p>Codex also has a Stop hook, installed separately with <code>./scripts/install-adapters.sh --tool codex-hooks</code>, that can block a session from ending while <code>grit</code>'s gate ledger has unmet gates. It delegates to the same vendored checker the Claude Code hook uses, so the two tools share one ledger parser. It is opt-in, never part of the default install, and verified against Codex's published hook schema rather than a live Codex session.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>GitHub Copilot applies a skill through <code>.github/copilot-instructions.md</code>, once a team has added one; this repository ships recommended rule text for that file in <code>adapters/copilot/README.md</code>. This repository ships no hook that could intercept a Copilot session at the point it would report a task complete, so enforcement here relies on two mechanisms instead of one. The recommended instruction tells the agent to read <code>GATES.md</code> and check every gate before reporting completion. The <code>grit-gates.yml</code> continuous-integration workflow lints the ledger independently of what the agent reported, and fails the check when a gate is unmet.</p>
</div>
</div>

## Where enforcement lands

| Tool | Calling a skill | Blocking an unmet gate |
| --- | --- | --- |
| Claude Code | Slash command or plugin workflow | Stop hook, opt-in, verified against live sessions |
| OpenCode | Command file the adapter installs | `grit-verify` command and a verify-agent rule |
| Cursor | Plain ask in the tool's chat | `grit-gates.yml` in continuous integration |
| Codex | Plain ask in the tool's chat | Stop hook, opt-in, verified against the published schema |
| GitHub Copilot | Plain ask in the tool's chat | `grit-gates.yml` in continuous integration |
