# Installation

Full documentation for every skill: https://tqnonline.github.io/skills/.

## Universal

```bash
npx skills@latest add tqnonline/skills
./scripts/link-skills.sh
```

## Per tool

Each supported tool has its own additional setup step beyond the universal `.agents/skills/` drop. See `adapters/<tool>/README.md` for OpenCode, Claude, Codex, Cursor, and GitHub Copilot.

## Completion hooks, on request

`grit`'s stop hook for Claude Code is installed separately, through the hooks target of `scripts/install-adapters.sh`, and is deliberately excluded from the default `all` target. A hook that can block a session from ending is a change to how the tool behaves, so it is adopted explicitly rather than arriving with everything else. Preview it with `--dry-run` first, and remove it with the installer's uninstall flag, which takes out only its own entry and leaves any sibling hooks in place. `skills/core/grit/HOOKS.md` covers the equivalent enforcement on the other tools.

## Validate

```bash
node scripts/validate.mjs
node scripts/run-tests.mjs
```

Both commands must pass before a pull request is opened. See [Architecture: Skill design](Architecture-Skill-Design) for what each one checks.

## A note on dotfiles

If this repository is installed alongside a dotfiles setup managed by GNU Stow, Stow must not re-vendor the skills into that setup. Use the `skills.manifest.yaml` bootstrap process instead.
