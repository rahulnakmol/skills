## Install this skill pack

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

Adapters are idempotent; use `./scripts/install-adapters.sh --dry-run` to preview.

## What these commands do

`npx skills@latest add tqnonline/skills` fetches this repository's skill catalog and places it in `.agents/skills/`, the directory OpenCode, Codex, Cursor, GitHub Copilot, and Amp read, and in `.claude/skills/`, the directory Claude Code reads.

`./scripts/install-adapters.sh` wires the tool-specific execution layer on top of that catalog. With no `--tool` flag it installs both of the two tools that have one: the OpenCode agent roster, slash commands, and workflow runner into `~/.config/opencode`, and the Claude Code worker subagents (`work-fast`, `work-deep`, `reviewer`) into `~/.claude/agents`. Pass `--tool <arm>` to install one tool's layer alone; the per-tool sections below name the arms and what each one does.

## Install one group or one skill

`./scripts/link-skills.sh --group developer` links every skill in the `developer` group into the default buckets (`~/.agents/skills`, `~/.claude/skills`, `~/.cursor/skills`, `~/.copilot/skills`), plus `core`. Selecting a group always links `core` alongside it, because every group may reference core doctrine and none of them resolve without it — a lone `--skill` selection, below, does not get this treatment.

`./scripts/link-skills.sh --skill grit` links only the `grit` skill into the same default buckets, without pulling in the rest of its group or core.

`./scripts/link-skills.sh --group developer --target <dir>` links into `<dir>` instead of the default buckets, for installing into a project-local location rather than the user's home directory; `--target` combines with either `--group` or `--skill`.

`./scripts/link-skills.sh --list` prints every group and the skills inside it, then exits, without linking anything. Add `--dry-run` to any of the commands above to print what would be linked and change nothing.

## Claude Code

`./scripts/install-adapters.sh --tool claude` copies the worker subagents (`work-fast`, `work-deep`, `reviewer`) into `~/.claude/agents`. A skill is reached the way the invocation axis in its `SKILL.md` frontmatter declares: user-invoked means a person names the skill or its slash command directly; model-invoked means an orchestrating skill calls it through the Skill tool. The repository also ships three dynamic workflows as plugin slash commands: `/rahulnakmol-skills:assess-work-item`, `/rahulnakmol-skills:deliver-work-item`, and `/rahulnakmol-skills:shakedown-pr`.

Claude Code also has a Stop hook, installed separately with `./scripts/install-adapters.sh --tool claude-hooks`, that can block a session from ending while `grit`'s gate ledger has unmet gates. It is opt-in and never part of the default install. Among the six tools, only Claude Code and Codex can stop a session directly rather than flag the problem after the fact; Claude Code's hook is verified against live sessions.

## OpenCode

`./scripts/install-adapters.sh --tool opencode` copies the agent roster into `~/.config/opencode/agents`, the slash commands into `~/.config/opencode/commands`, and the deterministic workflow runner into `~/.config/opencode/workflows`. OpenCode reaches a skill through the matching command file in `commands/` (for example `/grit-verify`), which binds to one of the installed agents and carries out the skill's procedure. Enforcement runs through the same route: OpenCode has a `grit-verify` command and a rule in its verify agent, so unmet gates preclude a handoff-ready verdict.

## Catalog readers — Cursor, Codex, GitHub Copilot

`./scripts/install-adapters.sh --tool cursor`, `--tool codex`, or `--tool copilot` each print a pointer to that tool's own `adapters/<tool>/README.md`; none copies a further file, because all three read the same universal `.agents/skills/` catalog directly. This repository ships no command layer for any of the three: each applies a skill by reading the catalog as context and following the shared repository rules in `AGENTS.md`, so a request is a plain ask typed into the tool's own chat.

**Cursor** routes model choice through its own `auto` mode rather than a pinned model identifier. Cursor ships a hooks system of its own, but this repository does not yet include a Cursor hook, so `grit` enforcement here is a rule a team adds in `.cursor/rules/`, backed by `grit-gates.yml`, a dispatch-only continuous-integration workflow that fails when a gate is unmet.

**Codex** additionally reads a generated sidecar, `agents/openai.yaml` (built by `scripts/gen-openai-yaml.mjs` from every skill's frontmatter — never hand-edited), so it sees the same skill names and descriptions as the other tools. Codex also has a Stop hook, installed separately with `./scripts/install-adapters.sh --tool codex-hooks`, that can block a session from ending while `grit`'s gate ledger has unmet gates. It delegates to the same vendored checker the Claude Code hook uses, so the two tools share one ledger parser. It is opt-in, never part of the default install, and verified against Codex's published hook schema rather than a live Codex session.

**GitHub Copilot** applies a skill by reading the catalog as context, driven by an instructions file, `.github/copilot-instructions.md`, once a team has added one; this repository ships recommended rule text for that file in `adapters/copilot/README.md`. This repository ships no hook that could intercept a Copilot session at completion, so `grit`'s gate-ledger discipline is carried instead by that instruction plus a continuous-integration backstop, `grit-gates.yml`, which lints the ledger and fails the check when a gate is unmet.

## Amp

Amp has its own installer, `amp skill add`, which copies any directory that holds a `SKILL.md`. `./scripts/install-amp.sh --group pm` turns a selection into the `amp skill add` calls it needs: the group, `core`, the doctrine wrapper for each group involved, and the `tqn` router skill that maps the catalog onto Amp. Add `--global` for a personal install on the current machine, `--target .agents/skills` for the current project, `--skill <name>` for one skill with its declared requirements, or `--print` to see the commands without running them. `./scripts/publish-amp-skills.sh --scope personal|workspace` stages the same selection into an Amp-hosted skills repository, which loads in every orb the owner or the workspace opens; it commits and stops before the push. `./scripts/install-adapters.sh --tool amp` runs the installer with the default selection. `adapters/amp/README.md` covers the scopes, the doctrine wrappers, and the Amp capabilities that overlap a catalog skill.

Amp has no stop hook. The opt-in plugin `adapters/amp/plugin/tqn-grit.js` stands in for one: `./scripts/install-adapters.sh --tool amp-plugin` copies it to `~/.config/amp/plugins/`, and from then on a turn that ends with unmet `grit` gates is continued with the unmet list. Without the plugin, enforcement is the same as in Cursor and GitHub Copilot: the `tqn` skill asks for `gate-check.mjs --status` before work is reported done, and `grit-gates.yml` is the backstop. `adapters/amp/plugin/README.md` describes the plugin.
