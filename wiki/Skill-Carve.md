# Skill: Carve

**Group:** pm · **Invocation:** model-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/pm/carve/SKILL.md)

Carve extracts discrete, DIVE-tested epics from a Business Understanding Document or a TOM's maturity gaps, writing them to a single epic manifest that `prd-draft` consumes one epic at a time. Ported from the source `epic-decompose` skill and renamed to sit in the bare-verb family alongside `slice` and `raise`.

## When to invoke

- `map` has produced an understanding document, or `tom-architect` has produced a TOM.
- The user asks to break an initiative down into epics.

## How it fits

Carve's core rule is unchanged from its source: no epic without DIVE validation. The manifest it produces is grilled, then approved alongside the case at the Investment gate.

## Key references

- [DIVE.md](https://github.com/tqnonline/skills/blob/main/skills/pm/carve/DIVE.md) covers the four criteria — Deliverable, Independent, Valuable, Estimable — and what failing each one means.

## How to use

Invoke carve once an understanding document or TOM exists. It extracts candidates, validates each against DIVE, orders the manifest by value or gap priority, runs a grill pass, and presents the ordered list for approval — it never writes the manifest until the user approves it.

## Best practices

- More than eight epics is a program, not a project — escalate rather than force a manifest.
- Every epic needs a named persona; "all users" is not one.
- Split an epic that fails Independent rather than accepting a hidden dependency chain.

## Sibling skills

Reads from `map` or `tom-architect`. Approved with `case` at the Investment gate. Hands off to `prd-draft`.
