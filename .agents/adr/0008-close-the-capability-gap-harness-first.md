# ADR 0008: Close the reference-repo capability gap harness-first

## Status

Proposed

## Context

A comparison against `mattpocock/skills`, a widely installed set of 25 promoted engineering and productivity skills, found that this repository covers about eight of them with a genuine counterpart, four or five partially, and roughly twelve not at all. The missing capabilities cluster in hands-on engineering craft — test-driven development, bug diagnosis, deep-module design, merge-conflict resolution, prototyping, issue triage, cited research — and in conversation-level productivity: handoff, re-explanation, questionnaires, teaching. The reference repository's draft writing skills also map to this repository's Writing group, which holds a charter and no skills.

Copying those skills one for one would produce an adequate capability, and adequate is available to everyone: the originals are a free install away. The repository's thesis says where the durable value sits instead — value concentrates at the two ends of a process, human judgment at the gates and verifiable execution behind them, while routine execution in the middle is a baseline that artificial intelligence has already commoditized. A gap-closure that only adds middle is decoration.

The repository also already holds, in embryo, four layers of the harness an agent needs to run these skills with few mistakes: a context compiler (the progressive-disclosure rule and `brief`), a permissioned tool gateway (`adapters/`, the provider allowlist in `scripts/validate.mjs`, and `grit`'s stop hook), durable state (the SPEC-TS ledger, the grit gate ledger, the RAID registers, `chart`'s decision tickets), and evidence gates (`grit`'s runnable `gate-check` and the four human gates). Two layers are missing everywhere: a trace and recovery loop, and a self-improvement loop. Nothing today writes a replayable record of a run, and only `update-models` curates itself on a schedule.

## Decision

Close the gap harness-first. Build the two missing layers once, in `core`, generalize the four embryonic ones, and ship each missing capability as a thin contract skill that binds to that machinery — rather than absorbing everything into existing skills, or porting the reference set as free-standing skills that each re-implement their own discipline.

**The thesis test.** A capability earns promotion out of `drafts/` only if it does at least one of the following, recorded in its `SKILL.md`:

1. It sharpens a human decision at a gate — it encodes judgment as an interrogation, a contract, a routing rule, or a checklist that changes what the human signs.
2. It makes delegated work verifiable — every run leaves an audit artifact (a ledger entry, a trace, a cited file, a red-green record) that a reviewer can open instead of redoing the work.
3. It is scaffolding the first two require.

A capability that only executes routine work fails the test. It ships as doctrine inside an existing skill, or not at all.

**The six-layer harness.** `core` names and owns the layers; every contract skill declares how it uses each one. The context compiler maps signals to documents, and a harness check asserts every doctrine sheet is reachable from a declared signal and nothing loads unconditionally. The tool gateway has each skill declare the verbs it may use — read, write-tracker, write-repo, publish — enforced by the harness the same way the provider allowlist is enforced today. Durable state generalizes the grit ledger and SPEC-TS into one schema, so a fresh session recovers from disk rather than from memory. Evidence gates generalize `gate-check` so any skill declares runnable gates and "done" is a gate audit. The trace and recovery loop is new: every run appends a record of inputs, decisions, evidence, and verdicts, with a replay protocol for resumption — a handoff between sessions becomes a property of this layer, not a separate trick. The self-improvement loop is new: a skill on the `update-models` pattern mines traces for repeated failure patterns and proposes skill changes as reviewable pull requests, keeping a human at the gate.

**The waves.** Wave zero absorbs, immediately and without new skills, the four capabilities whose natural host already exists: merge-conflict resolution into `deliver`, pre-commit hooks and git guardrails into `deliver/REPO-SETUP.md`, deep-module design vocabulary into `architect`, and the domain-language glossary practice into `brief`. Wave one builds the harness layers above, each behind its own review. Wave two ships the engineering contract skills: `diagnose`, `prove` (test-first), `prototype`, `triage`, `deepen`, and `wizard`. Wave three ships `research` in core, the trace-backed `handoff`, `askback`, `replay`, and `teach` in productivity, the Writing group's first three skills from the reference repository's writing drafts, and `hone`, the self-improvement skill that closes layer six. Two reference capabilities are declined rather than deferred: `migrate-to-shoehorn` and `scaffold-exercises` are one author's personal tooling and serve no audience of this repository.

All existing invariants hold: exactly six groups, unique basenames repository-wide, one invocation axis per skill, `SKILL.md` at or under 120 lines, group independence with `core` as the only shared reference, and new work landing in `drafts/` until it passes the thesis test and the harness checks.

## Consequences

- The repository's differentiator stays the harness, which cannot be copied by reading a skill file, rather than a catalog that can.
- Parity is reached in capability, not in shape: a user who types `/tdd` from habit finds `prove`, and the routers (`ask-fde`, `ask-pm`) absorb the translation.
- Every new skill is auditable by construction — the gate ledger and trace exist before the skill does — instead of by each author's discipline.
- First visible parity is slower than a direct port. Wave zero exists to offset this: four gaps close as doctrine while the harness is built.
- `core` grows machinery and must stay group-neutral; each layer lands behind its own review, and the deterministic test suite gains checks for signal reachability, verb declarations, and trace presence.
- The Writing group opens with shipped skills, converting its charter into practice.
- Declining two reference capabilities is recorded here so the question is not reopened each time the comparison is rerun.
