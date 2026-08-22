# Installation

## Universal

```bash
npx skills@latest add rahulnakmol/skills
./scripts/link-skills.sh
```

## Per tool

Each supported tool has its own additional setup step beyond the universal `.agents/skills/` drop. See `adapters/<tool>/README.md` for OpenCode, Claude, Codex, Cursor, and GitHub Copilot.

## Validate

```bash
node scripts/validate.mjs
node scripts/run-tests.mjs
```

Both commands must pass before a pull request is opened. See [Architecture: Skill design](Architecture-Skill-Design) for what each one checks.

## A note on dotfiles

If this repository is installed alongside a dotfiles setup managed by GNU Stow, Stow must not re-vendor the skills into that setup. Use the `skills.manifest.yaml` bootstrap process instead.
