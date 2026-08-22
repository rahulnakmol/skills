# Architecture: Skill design

The conventions every skill in this repo follows, checked mechanically by `node scripts/validate.mjs` and `node --test "test/**/*.test.mjs"` in CI — not aspirations, invariants.

**UNIX philosophy + progressive disclosure** — each `SKILL.md` is a short entry point (≤120 lines) that points to `references/` and deeper doctrine files only on signal match, rather than inlining everything a skill might ever need. Judgment-layer doctrine (grill loops, rubrics, work-item contracts) lives in those reference files at full depth; the `SKILL.md` itself stays a map.

**Invocation axis** — every skill is user-invoked or model-invoked, and the frontmatter `name` must equal its directory basename. See [.agents/invocation.md](https://github.com/rahulnakmol/skills/blob/main/.agents/invocation.md) for the full rule and how user-invoked skills call each other only via `Call the Skill tool with "<name>"`, never inline.

**Promoted vs draft** — only what's in `skills/` and named in [.claude-plugin/plugin.json](https://github.com/rahulnakmol/skills/blob/main/.claude-plugin/plugin.json) is promoted; everything else lives in `drafts/` and appears in neither the README nor the plugin manifest.

**No model IDs in skills** — model choice lives only in [models.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/model-routing/models.md) and in `adapters/`; a skill body naming a model directly fails CI.

## Contributing

- [.agents/writing-docs.md](https://github.com/rahulnakmol/skills/blob/main/.agents/writing-docs.md) — authoring conventions
- [.agents/invocation.md](https://github.com/rahulnakmol/skills/blob/main/.agents/invocation.md) — the invocation-axis rule in full
- `node scripts/validate.mjs` and `node --test "test/**/*.test.mjs"` must both pass before a PR — see [Installation](Installation) for the full validation command set
- ADRs recording structural decisions live under [.agents/adr/](https://github.com/rahulnakmol/skills/tree/main/.agents/adr)
