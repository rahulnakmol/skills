# Skill: PRD Draft

**Group:** pm · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-draft/SKILL.md)

PRD Draft generates one self-contained PRD per approved epic — twelve sections, INVEST-compliant user stories, Given-When-Then acceptance criteria including at least one error scenario per story, and success metrics with real baselines and targets — then validates the result against a nine-item structural checklist before the PRD advances.

The validation pass was previously a separate skill, `prd-validate`. It has been folded in as a sibling doctrine document because the two were indistinguishable at the point of selection: both triggered on the phrase "PRD," and a model choosing between "draft a PRD" and "check a PRD" from a user's plain sentence had no reliable signal. Merging also closes the gap the split created, where a PRD could be drafted and handed onward without the check ever running. The pass keeps its own discipline inside the merged skill: it is read-only, it reports rather than repairs, and a failure sends the PRD back through drafting.

## When to invoke

- `carve` has produced an approved epic manifest.
- The user asks to draft, write, or spec requirements for an epic.
- The user asks to check, validate, or confirm the structural completeness of an existing PRD.

## How it fits

PRD Draft reads the manifest and the upstream understanding document or TOM, then runs a grill pass — with-docs mode when a research corpus exists — and the structural validation pass, both before the Quality gate. Its output may feed the developer group's `impact` pipeline for engineering inception, or go straight to `slice` when its acceptance criteria are already machine-checkable. [PRD Review](Skill-PRD-Review) scores what this skill has already proven structurally sound.

## Key references

- [PRD-SECTIONS.md](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-draft/PRD-SECTIONS.md) covers the twelve sections, INVEST, and the acceptance-criteria rules.
- [VALIDATION.md](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-draft/VALIDATION.md) holds the nine structural checks, the gate-row reporting format, and the PASS, PASS WITH WARNINGS, and FAIL verdict rules.
- [VALUE.md](https://github.com/tqnonline/skills/blob/main/skills/core/VALUE.md) describes the seam with the developer group's `impact` pipeline.

## How to use

Run PRD Draft once an epic manifest is approved. It drafts one PRD per epic — never a monolithic document — writes stories that each name a persona from Section 2, and stops short of prescribing technical architecture in Section 9. It then runs all nine structural checks, records each as a gate row, and writes a validation report alongside the PRD. Point it at an existing PRD, or leave the path unset to validate every PRD under `specs/prd/`, to run the validation pass on its own.

## Best practices

- Every story needs at least one error-scenario acceptance criterion; happy-path-only stories are untestable.
- Any story sized XL is a signal to split it, not a valid size.
- An empty Open Questions section usually means the PRD has not been thought through hard enough.
- Treat a failure on any of checks one through four as blocking; those four are structural, not stylistic, and nothing downstream can act on a PRD that fails them.
- Run all nine checks even after an early failure. A report that stops at the first problem hides the rest and turns one redraft into several.
- Redraft rather than patch. The validation pass reports what it found; correcting the document is a separate, recorded act.

## Sibling skills

Reads from `carve`. Hands off to [PRD Review](Skill-PRD-Review).
