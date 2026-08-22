# Skill: Press

**Group:** branding · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/branding/press/SKILL.md)

Press renders a signed-off PRD as a branded PDF suitable for a presentation deck. It uses the user's own branding skill when one is installed, or a default Anthropic-inspired palette otherwise. It never changes the source PRD; it produces only an artifact and a checksum.

## When to invoke

- The PRD has been signed off at Gate G2 in [Impact](Skill-Impact).
- The user wants a document to share with stakeholders.

## How it fits

Press is the first skill in the branding group, and the only step in the [role journey](Architecture-Role-Journey) that turns the inception artifact into something meant to be read outside the engineering conversation — in a stakeholder review, a deck, or a presentation.

## Key references

- [PALETTE.md](https://github.com/rahulnakmol/skills/blob/main/skills/branding/press/PALETTE.md) defines the default Anthropic-inspired palette used when no user branding skill is installed.

## Sibling skills

Press consumes a signed PRD from [Impact](Skill-Impact).
