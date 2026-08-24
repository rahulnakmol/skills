# Skill: Constitution

**Group:** pm · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/pm/constitution/SKILL.md)

Constitution codifies what the practice, or one initiative, stands for: principles, value propositions, positioning, CX philosophy, building approach, prioritization framework, and research bets. Ported from the source `philosophy` skill and renamed because its deliverable is the Product Constitution, not a philosophy. Every downstream pm skill reads the applicable constitution before it drafts anything.

## When to invoke

- No constitution exists yet and the practice or an initiative needs one.
- The user wants to evolve a section, or a constitution has passed its quarterly review date.

## How it fits

Constitution sits above the pipeline rather than inside it: `discover`, `prd-draft`, `prd-review`, `carve`, and `tom-architect` each read the compact summary plus the specific section they need. A practice constitution at the repository root and a per-initiative constitution in each initiative's own `specs/` tree form a hierarchy — the initiative's overrides win, the practice default fills in the rest.

## Key references

- [CONSTITUTION.md](https://github.com/tqnonline/skills/blob/main/skills/pm/constitution/CONSTITUTION.md) covers the two-tier architecture, the hierarchy, the seven sections, and the quarterly review cadence.

## How to use

Run `constitution` with no arguments to start Create mode if none exists. To evolve one section, name it directly and the skill runs Co-author mode: read, ask what changed, revise in two or three rounds. When a constitution is overdue for review, the skill offers Review mode on its own — a grill session over the constitution's own claims — rather than silently reasoning from a stale document.

## Best practices

- Keep principles to five or fewer; a list of ten principles resolves nothing.
- Every principle should include a "this means we..." and a "this means we don't..." example.
- Land every revision as a pull request, never a silent edit.
- Do not skip the quarterly review — a stale constitution is worse than an honestly incomplete one, because it looks grounded when it is not.

## Sibling skills

Read by `discover`, `prd-draft`, `prd-review`, `carve`, and `tom-architect` before they draft.
