# Skill: Impact

**Group:** developer · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/impact/SKILL.md)

The entry point to the whole pipeline. Turns a raw idea, a meeting transcript, or a half-formed intent into a signed-off PRD through a relentless, collaborative grill loop — never a form to fill in alone.

## When to invoke

- A new initiative, major feature, or brownfield change needs alignment before backlog work starts
- The user shows up with notes, a transcript, or vague intent rather than a scoped ask

## How it fits

`impact` is the **inception gate** in the [role journey](Architecture-Role-Journey) — the first of the repo's four human gates. For brownfield work it first calls [recon](Skill-Recon) for a codebase brief; either way it exits only through an explicit user stop or a signed Gate G2, never on autopilot, and hands off to [slice](Skill-Slice) only once the PRD's Business value and Risk and governance tier sections are populated.

## Key references

- [GRILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/impact/GRILL.md) — the round protocol, the four value lenses run every round, open-ended wayfinding probing, and the stop-anytime trade-off ledger
- [VALUE.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/impact/VALUE.md) — business value, customer delight, the do-nothing alternative, governance triggers
- [PRD-TEMPLATE.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/impact/PRD-TEMPLATE.md) — the 8-page-max PRD shape, including the Risk and governance tier field
- [GATES.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/impact/GATES.md) — G0 through G3

## Sibling skills

[Recon](Skill-Recon) for brownfield context, [Slice](Skill-Slice) and [Raise](Skill-Raise) downstream, [Press](Skill-Press) for a branded PDF export of the signed PRD.
