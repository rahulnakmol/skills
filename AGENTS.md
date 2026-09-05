# Agent instructions

This file is read by agent tools that follow the AGENTS.md convention (Codex, Cursor, GitHub Copilot, OpenCode, and others). Claude Code reads [CLAUDE.md](./CLAUDE.md), which holds the same rules in the form of machine-checkable invariants; this file states them for every other tool.

## Voice and tone for every document you write

Any agent writing documentation in this repository — a `SKILL.md` file, a reference doc, the README, a wiki page, a commit message, or a pull request description — follows one voice: simple American English, professional and formal in register, and written in the style of a fact-based news explainer, the kind of piece NPR or the New York Times runs to explain how something works. It is never an opinion column.

- Use plain American English spelling and vocabulary. Define a technical term in plain language the first time it appears.
- Write short, direct sentences in the active voice. One idea per sentence.
- State facts, not enthusiasm. Do not use marketing language or hype adjectives ("seamless," "revolutionary," "game-changing," "cutting-edge"). No first-person cheerleading, no rhetorical questions, no exclamation points, no decorative emoji.
- Be fair and balanced: state a limitation or a trade-off next to a benefit. Attribute a claim to evidence — a test result, a cited source, an observed behavior — rather than to confidence alone.
- Educate before instructing: give the reasoning alongside the rule, so the reader understands why, not only what.
- Write as a knowledgeable, neutral reporter explaining a system to an informed general reader — not as a salesperson, a casual blog post, or an over-eager assistant.

The full rule, with more detail, lives in [.agents/writing-docs.md](.agents/writing-docs.md).

## Repository rules

See [CLAUDE.md](./CLAUDE.md) for the complete set of repository invariants: skill structure, the invocation axis, the model-provider policy, the testing harness, and the sidecar-generation rules. Every rule there applies regardless of which tool you are.

## Agent attribution

No agent attribution footers or watermarks in anything written to this repository or to GitHub — commit messages, pull request titles and bodies, issue and review comments, changesets. No "Generated with" line, no agent "Co-Authored-By" trailer, no session link. The record carries what changed and why, not which tool typed it.

## Working in Amp

Amp reads this file at the start of every thread. In an orb, `.agents/setup` and `.agents/resume` link every skill in this repository, plus the Amp-only skills under `adapters/amp/skills/`, into `.agents/skills/`, so all of them are available as project skills; `.agents/resume` also sets `amp.git.commit.coauthor.enabled` and `amp.git.commit.ampThread.enabled` to `false` in the orb's Amp settings, which is how the attribution rule above holds for commits Amp makes. Load the `tqn` skill before using a catalog skill; it maps the catalog's doctrine citations and execution shapes onto Amp's tools. Load Amp's `building-skills` skill before creating or editing a `SKILL.md`. After changing a doctrine file at a group root, run `node scripts/gen-amp-doctrine.mjs`; `--check` is part of the test suite. `adapters/amp/README.md` covers installing the skills at project, personal, and workspace scope.
