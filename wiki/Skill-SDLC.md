# Skill: SDLC

**Group:** developer · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/SKILL.md)

SDLC runs the full gated software delivery loop for one scoped change or work item. It maintains a SPEC-TS ledger, moves through an ordered set of gates, requires human approval at each one, and requires a verifier's challenge before any work is called done.

## When to invoke

- The user asks for a full gated delivery run, or wants SPEC-TS tracking applied to a change.
- A raised work item carries the `ready` label and its execution profile names this skill.

## How it fits

SDLC carries out the Implementation stage of the [role journey](Architecture-Role-Journey), and is the skill that [Conduct](Skill-Conduct) most often routes work into once a mode has been decided. It never runs on a work item that has not cleared the pickup protocol described in [WORK-ITEM-CONTRACT.md](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md); an item still at `raised` or `critiqued` receives a review, not an implementation.

## Key references

- [METHOD.md](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/METHOD.md) describes the SPEC-TS ledger — Scope, Product requirements, Engineering constraints, Components, Trade-offs, and Success metrics — and the modes of interaction a user can expect.
- [LOOP-CONTRACT.md](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/LOOP-CONTRACT.md) sets the gate order, the evidence each gate requires, and the states in which the loop can stop.
- [DIRECTIVES.md](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/DIRECTIVES.md) defines the vocabulary of `[sdlc:*]` directives.

## How to use

Run `/sdlc` on a scoped change or on a work item whose label is `ready`. In the delivery pipeline, `deliver-work-item` carries the same discipline end to end — use `/sdlc` directly when you want the gated loop interactively, gate by gate, with a person at each approval. Check the target repository against `deliver/REPO-SETUP.md` first; the skill reports gaps before walking gates rather than discovering them mid-loop.

## Best practices

- Never start on an item that has not cleared the pickup protocol — an item at `raised` or `critiqued` gets a critique, not code.
- Record evidence at every gate as you pass it; reconstructing evidence after the fact is the failure mode the ledger exists to prevent.
- Stop on an unsigned human gate and say so plainly — silence is not approval, and the loop never advances on it.

## Sibling skills

SDLC is routed into by [Conduct](Skill-Conduct). It calls [Safeguard](Skill-Safeguard), [Assure](Skill-Assure), [Deliver](Skill-Deliver), and [Operate](Skill-Operate) at their respective gates, and its output is checked before merge by [Shakedown](Skill-Shakedown).
