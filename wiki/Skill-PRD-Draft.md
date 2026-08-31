# Skill: PRD Draft

**Group:** pm · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-draft/SKILL.md)

PRD Draft generates one self-contained PRD per approved epic: twelve sections, INVEST-compliant user stories, Given-When-Then acceptance criteria including at least one error scenario per story, and success metrics with real baselines and targets.

## When to invoke

- `carve` has produced an approved epic manifest.
- The user asks to draft, write, or spec requirements for an epic.

## How it fits

PRD Draft reads the manifest and the upstream understanding document or TOM, then runs a grill pass — with-docs mode when a research corpus exists — before the Quality gate. Its output may feed the developer group's `impact` pipeline for engineering inception, or go straight to `slice` when its acceptance criteria are already machine-checkable.

## Key references

- [PRD-SECTIONS.md](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-draft/PRD-SECTIONS.md) covers the twelve sections, INVEST, and the acceptance-criteria rules.
- [VALUE.md](https://github.com/tqnonline/skills/blob/main/skills/core/VALUE.md) describes the seam with the developer group's `impact` pipeline.

## How to use

Run PRD Draft once an epic manifest is approved. It drafts one PRD per epic — never a monolithic document — writes stories that each name a persona from Section 2, and stops short of prescribing technical architecture in Section 9.

## Best practices

- Every story needs at least one error-scenario acceptance criterion; happy-path-only stories are untestable.
- Any story sized XL is a signal to split it, not a valid size.
- An empty Open Questions section usually means the PRD has not been thought through hard enough.

## Sibling skills

Reads from `carve`. Hands off to `prd-validate` and `prd-review`.
