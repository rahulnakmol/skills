## Install this skill pack

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

Adapters are idempotent; use `./scripts/install-adapters.sh --dry-run` to preview.

## What these commands do

`npx skills@latest add tqnonline/skills` fetches this repository's skill catalog and places it in `.agents/skills/`, the directory OpenCode, Codex, Cursor, and GitHub Copilot read, and in `.claude/skills/`, the directory Claude Code reads.

`./scripts/install-adapters.sh` wires the tool-specific execution layer on top of that catalog. With no `--tool` flag it installs both of the two tools that have one: the OpenCode agent roster, slash commands, and workflow runner into `~/.config/opencode`, and the Claude Code worker subagents (`work-fast`, `work-deep`, `reviewer`) into `~/.claude/agents`. Pass `--tool <arm>` to install one tool's layer alone; see "Per tool" below for the arm names and what each one does.

## Install one group or one skill

`./scripts/link-skills.sh --group developer` links every skill in the `developer` group into the default buckets (`~/.agents/skills`, `~/.claude/skills`, `~/.cursor/skills`, `~/.copilot/skills`), plus `core`. Selecting a group always links `core` alongside it, because every group may reference core doctrine and none of them resolve without it — a lone `--skill` selection, below, does not get this treatment.

`./scripts/link-skills.sh --skill grit` links only the `grit` skill into the same default buckets, without pulling in the rest of its group or core.

`./scripts/link-skills.sh --group developer --target <dir>` links into `<dir>` instead of the default buckets, for installing into a project-local location rather than the user's home directory; `--target` combines with either `--group` or `--skill`.

`./scripts/link-skills.sh --list` prints every group and the skills inside it, then exits, without linking anything. Add `--dry-run` to any of the commands above to print what would be linked and change nothing.

## Per tool

**Claude Code** — `./scripts/install-adapters.sh --tool claude` copies the worker subagents (`work-fast`, `work-deep`, `reviewer`) into `~/.claude/agents`. A skill is reached the way the invocation axis in its `SKILL.md` frontmatter declares: user-invoked means a person names the skill or its slash command directly; model-invoked means an orchestrating skill calls it through the Skill tool. The repository also ships three dynamic workflows as plugin slash commands: `/rahulnakmol-skills:assess-work-item`, `/rahulnakmol-skills:deliver-work-item`, and `/rahulnakmol-skills:shakedown-pr`.

**OpenCode** — `./scripts/install-adapters.sh --tool opencode` copies the agent roster into `~/.config/opencode/agents`, the slash commands into `~/.config/opencode/commands`, and the deterministic workflow runner into `~/.config/opencode/workflows`. OpenCode reaches a skill through the matching command file in `commands/` (for example `/grit-verify`), which binds to one of the installed agents and carries out the skill's procedure.

**Cursor** — `./scripts/install-adapters.sh --tool cursor` prints a pointer to `adapters/cursor/README.md`; there is no further file-copy step, because Cursor reads the universal `.agents/skills/` catalog directly. This repository ships no command layer for Cursor: it applies a skill by reading the catalog as context and following the shared repository rules in `AGENTS.md`, routing model choice through its own `auto` mode rather than a pinned model identifier.

**Codex** — `./scripts/install-adapters.sh --tool codex` prints a pointer to `adapters/codex/README.md`; there is no further file-copy step, because Codex reads the same universal `.agents/skills/` catalog. Codex additionally reads a generated sidecar, `agents/openai.yaml` (built by `scripts/gen-openai-yaml.mjs` from every skill's frontmatter — never hand-edited), so it sees the same skill names and descriptions as the other tools. Like Cursor, Codex gets no command layer from this repository, so invocation is driven by `AGENTS.md` and the skill files themselves.

**GitHub Copilot** — `./scripts/install-adapters.sh --tool copilot` prints a pointer to `adapters/copilot/README.md`; there is no further file-copy step, because Copilot's agent mode reads the same universal `.agents/skills/` catalog. This repository ships no hook that could intercept a Copilot session at completion, so `grit`'s gate-ledger discipline is carried instead by an instruction in `.github/copilot-instructions.md` plus a continuous-integration backstop, `grit-gates.yml`, which lints the ledger and fails the check when a gate is unmet.
