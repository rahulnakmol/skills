# Skill: Press

**Group:** branding · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/branding/press/SKILL.md)

Renders a signed-off PRD to a branded, deck-ready PDF — using the user's own branding skill when one is installed, or a default Anthropic-inspired palette otherwise. It never mutates the PRD source; it only produces an artifact path and a checksum.

## When to invoke

- The PRD is signed off at Gate G2 in [Impact](Skill-Impact)
- The user wants a shareable document for stakeholders

## How it fits

`press` is the first skill in the branding group, and the only step in the [role journey](Architecture-Role-Journey) that turns the inception artifact into something meant to travel outside the engineering conversation — a stakeholder review, a deck, a presentation.

## Key references

- [PALETTE.md](https://github.com/rahulnakmol/skills/blob/main/skills/branding/press/PALETTE.md) — the default Anthropic-inspired palette used absent a user branding skill

## Sibling skills

Consumes a signed PRD from [Impact](Skill-Impact).
