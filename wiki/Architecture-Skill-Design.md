# Architecture: Skill design

This page describes the conventions every skill in this repository follows. They are checked automatically by `node scripts/validate.mjs` and `node scripts/run-tests.mjs` in continuous integration, so they function as requirements rather than as guidance a contributor might choose to follow.

The design follows a Unix-like philosophy of small, composable parts, combined with progressive disclosure: each `SKILL.md` file is a short entry point, no longer than 120 lines, that points to a `references/` directory and to deeper doctrine files only when the situation calls for them, rather than including everything a skill might ever need. Detailed judgment material — grill-loop protocols, routing rubrics, and work-item contracts — lives in those reference files at full length. The `SKILL.md` file itself stays a map to that material.

Every skill declares an invocation axis: it is either user-invoked or model-invoked. Its frontmatter `name` field must match the name of its own directory. See [.agents/invocation.md](https://github.com/rahulnakmol/skills/blob/main/.agents/invocation.md) for the complete rule, including the requirement that a user-invoked skill can call another skill only through the phrase `Call the Skill tool with "<name>"`, never by inlining that skill's logic.

A skill is either promoted or a draft. Only what appears under `skills/` and is named in [.claude-plugin/plugin.json](https://github.com/rahulnakmol/skills/blob/main/.claude-plugin/plugin.json) is promoted. Everything else lives under `drafts/` and appears in neither the README nor the plugin manifest.

No skill names a specific model. Model choice lives only in [models.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/model-routing/models.md) and in the `adapters/` directory; a skill body that names a model directly fails continuous integration.

## Contributing

- [.agents/writing-docs.md](https://github.com/rahulnakmol/skills/blob/main/.agents/writing-docs.md) covers authoring conventions, including the voice and tone every document in this repository is written in.
- [.agents/invocation.md](https://github.com/rahulnakmol/skills/blob/main/.agents/invocation.md) covers the invocation-axis rule in full.
- `node scripts/validate.mjs` and `node scripts/run-tests.mjs` must both pass before a pull request is opened; see [Installation](Installation) for the full set of validation commands.
- Architecture decision records for structural choices are kept under [.agents/adr/](https://github.com/rahulnakmol/skills/tree/main/.agents/adr).
