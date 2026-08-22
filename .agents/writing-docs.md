# Writing docs for skills

1. State the job in one sentence before writing `SKILL.md`.
2. Keep `SKILL.md` on one screen (≤120 lines).
3. Put protocols in sibling markdown files; link with **load when** triggers.
4. Compose via `Call the Skill tool with "<name>"` — no copy-paste pipelines.
5. Define a machine-checkable output contract (format, required sections, stop states).
6. No model IDs in `SKILL.md`; use `model-routing` for lookups.
7. Run `node scripts/validate.mjs` before opening a PR.
