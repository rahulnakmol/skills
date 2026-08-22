# Installation

## Universal

```bash
npx skills@latest add rahulnakmol/skills
./scripts/link-skills.sh
```

## Per tool

See `adapters/<tool>/README.md` for OpenCode, Claude, Codex, Cursor, Copilot — each covers the tool-specific install step beyond the universal `.agents/skills/` drop.

## Validate

```bash
node scripts/validate.mjs
node --test "test/**/*.test.mjs"
```

Both must pass before a PR — see [Architecture: Skill design](Architecture-Skill-Design) for what they check.

## Stow caveat

Dotfiles stow must not re-vendor skills; use `skills.manifest.yaml` bootstrap only.
