# Writing docs for skills

## Voice and tone

Every document in this repository — `SKILL.md` files, reference docs, the README, and the wiki — is written in simple American English, in a professional and formal register, in the style of a fact-based news explainer (the kind of piece NPR or the New York Times runs to explain how something works). It is never an opinion column. Concretely:

- **Plain American English.** American spelling (organize, color, license), not British (organise, colour, licence). Define a technical term in plain language the first time it appears; do not assume the reader already knows the house jargon.
- **Short, direct, active sentences.** One idea per sentence. Prefer the active voice ("the skill validates the PRD," not "the PRD is validated by the skill"). Cut a sentence that exists only for rhythm or emphasis.
- **State facts, not enthusiasm.** No marketing language and no hype adjectives — words like "seamless," "revolutionary," "game-changing," "supercharged," or "cutting-edge" do not appear. No first-person cheerleading ("we're excited to," "you'll love"). No rhetorical questions, no exclamation points, no emoji used as decoration.
- **Fair and balanced.** State a limitation or a trade-off next to a benefit rather than omitting it. Attribute a claim to evidence — a test result, a cited source, an observed behavior — rather than to confidence alone.
- **Educate before instructing.** Give the reader the reasoning or the context for a rule alongside the rule itself, the way an explainer article gives context before its conclusion, so the reader understands why, not only what.
- **Formal without being stiff.** Write as a knowledgeable, neutral reporter explaining a system to an informed general reader — not as a salesperson, not as a casual blog post, and not as an over-eager assistant. A reader should be able to read a document once, at a normal pace, and understand it without having to guess intent.

This rule applies to every agent and every tool working in this repository — see [AGENTS.md](../AGENTS.md).

## Authoring a skill

1. State the job in one sentence before writing `SKILL.md`.
2. Keep `SKILL.md` on one screen (≤120 lines).
3. Put protocols in sibling markdown files; link with **load when** triggers.
4. Compose via `Call the Skill tool with "<name>"` — no copy-paste pipelines.
5. Define a machine-checkable output contract (format, required sections, stop states).
6. No model IDs in `SKILL.md`; use `model-routing` for lookups.
7. Run `node scripts/validate.mjs` before opening a PR.
