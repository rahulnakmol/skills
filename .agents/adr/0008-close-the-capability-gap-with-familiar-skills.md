# ADR 0008: Close the capability gap with familiar skills on a shared trace spine

## Status

Proposed

## Context

A comparison against `mattpocock/skills`, a widely installed set of 25 promoted engineering and productivity skills, found that this repository covers about eight of them with a genuine counterpart, four or five partially, and roughly twelve not at all. The missing capabilities cluster in hands-on engineering craft — test-driven development, bug diagnosis, deep-module design, merge-conflict resolution, prototyping, issue triage, cited research — and in conversation-level productivity: handoff, re-explanation, questionnaires, teaching. The reference repository's draft writing skills map to this repository's Writing group, which holds a charter and no skills.

Three approaches were weighed: absorbing the capabilities as doctrine inside existing skills, porting them as small free-standing skills, and building a full six-layer harness first with skills as thin contracts on top. The decision below takes the port as the lead, because discoverability matters — a developer arriving from the reference repository should find the capability under a name they already know — and takes one piece of the harness approach with it, because a port where every skill re-implements its own discipline would depend on authorial vigilance rather than machinery.

The repository already holds four harness layers in embryo: a context compiler (the progressive-disclosure rule), a permissioned tool gateway (`adapters/` and the provider allowlist), durable state (the SPEC-TS and grit ledgers, the RAID registers), and runnable evidence gates (`grit`'s `gate-check`). What no skill writes today is a replayable trace of a run, and nothing except `update-models` improves itself on a schedule.

## Decision

Ship the missing capabilities as sixteen small, independently installable skills under familiar names, all bound to one light shared spine in `core`: a trace convention and a retrospective loop.

**The thesis test.** A capability earns promotion out of `drafts/` only if it does at least one of the following, recorded in its `SKILL.md`: it sharpens a human decision at a gate; it makes delegated work verifiable, leaving an audit artifact every run — a ledger entry, a trace, a cited file, a red-green record — that a reviewer can open instead of redoing the work; or it is scaffolding the first two require. A capability that only executes routine work fails the test and ships as doctrine inside an existing skill, or not at all.

**Familiar names.** Names follow what practitioners already call the activity, not this repository's earlier single-verb coinages. The full mapping from the reference set:

| Reference skill | Ships here as | Group | Invocation |
|---|---|---|---|
| `tdd` | `tdd` | developer | model |
| `diagnosing-bugs` | `debug` | developer | model |
| `prototype` | `prototype` | developer | model |
| `triage` | `triage` | developer | user |
| `domain-modeling` | `glossary` | developer | model |
| `codebase-design` + `improve-codebase-architecture` | `refactor` | developer | user |
| `wizard` | `wizard` | developer | model |
| `research` | `research` | core | model |
| `retro` (draft) | `retro` | core | user |
| `handoff` | `handoff` | productivity | user |
| `to-questionnaire` | `questionnaire` | productivity | user |
| `wait-what` | `wait-what` | productivity | user |
| `teach` | `teach` | productivity | user |
| `writing-fragments` (draft) | `freewrite` | writing | user |
| `writing-beats` (draft) | `outline` | writing | user |
| `writing-shape` (draft) | `draft` | writing | user |

Two capabilities land as doctrine rather than skills, because their host already exists and no one invokes them by name: merge-conflict resolution becomes `deliver/MERGE.md`, and pre-commit hooks with git guardrails extend `deliver/REPO-SETUP.md`. Two are declined rather than deferred: `migrate-to-shoehorn` and `scaffold-exercises` are one author's personal tooling and serve no audience of this repository.

**The trace spine.** The light piece of the harness approach, built once in `core` before the first new skill ships. `core/TRACE.md` defines a run record — inputs, decisions, evidence, verdicts — and a replay protocol for resuming after interruption. Every new skill carries a short contract block declaring its signals, the tool verbs it may use, its state file, its gates (reusing `grit`'s existing `gate-check`), and the trace it writes. `handoff` is then a projection of the trace rather than a summary written from memory, and `retro` — the self-improvement loop — mines traces for repeated failure patterns and proposes skill changes as reviewable pull requests, on the disclosed-schedule pattern `update-models` already proves. The deterministic test suite gains two checks: every new skill's contract block is present and well-formed, and every skill that declares a trace writes one in its dry-run fixture.

**The waves.** Wave one ships the craft skills a reference user reaches for first — `tdd`, `debug`, `prototype`, `refactor`, `glossary` — together with the trace spine and the two `deliver` doctrine sheets. Wave two ships the flow skills: `triage`, `wizard`, `research`, `handoff`. Wave three ships the judgment and voice skills — `questionnaire`, `wait-what`, `teach`, the three writing skills that open the Writing group — and `retro`, which needs accumulated traces to be worth running.

All existing invariants hold: exactly six groups, unique basenames repository-wide, one invocation axis per skill, `SKILL.md` at or under 120 lines, group independence with `core` as the only shared reference, and new work landing in `drafts/` until it passes the thesis test and the harness checks.

## Consequences

- The promoted set grows from 34 skills to 50: core from one to three, developer from fifteen to twenty-two, productivity from one to five, and the Writing group opens with three. Each addition appears in the README, the plugin manifest, and the wiki, and the always-loaded description list grows by sixteen entries — the price of like-for-like discoverability, held down by one-line descriptions.
- A user who types the reference name finds the capability directly for eight of the sixteen; the routers (`ask-fde`, `ask-pm`) absorb the translation for the renamed rest.
- Every new skill is auditable the same way, because the trace convention and gate reuse exist before the first one ships — discipline by machinery where it is cheap, by review where machinery would be heavy. The four embryonic harness layers are reused as they are, not rebuilt; a fuller harness remains open as a future record if the trace spine proves insufficient.
- The repository accepts sixteen new test surfaces and wiki pages, and the maintenance that follows.
- Declining two reference capabilities is recorded here so the question is not reopened each time the comparison is rerun.
