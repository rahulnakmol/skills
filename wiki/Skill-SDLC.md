# Skill: SDLC

**Group:** developer · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/sdlc/SKILL.md)

Runs the full gated software delivery loop for one scoped change or work item: SPEC-TS ledger, ordered gates, human approval at each one, and a verifier challenge before anything is called done.

## When to invoke

- The user asks for a full gated delivery run, or wants SPEC-TS tracking on a change
- A raised work item's label is `ready` and its execution profile points here

## How it fits

`sdlc` is the Implementation stage of the [role journey](Architecture-Role-Journey), and the thing [orchestrate](Skill-Orchestrate) most often routes into once a mode has been decided. It never runs on a work item that hasn't cleared the pickup protocol in [WORK-ITEM-CONTRACT.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md) — an item still at `raised` or `critiqued` gets the critique-only pickup phase, not implementation.

## Key references

- [METHOD.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/sdlc/METHOD.md) — the SPEC-TS ledger (Scope / Product requirements / Engineering constraints / Components / Trade-offs / Success metrics) and interaction modes
- [LOOP-CONTRACT.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/sdlc/LOOP-CONTRACT.md) — gate order, evidence requirements, and stop states
- [DIRECTIVES.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/sdlc/DIRECTIVES.md) — the `[sdlc:*]` directive vocabulary

## Sibling skills

Routed into by [Orchestrate](Skill-Orchestrate); calls [Safeguard](Skill-Safeguard), [Assure](Skill-Assure), [Deliver](Skill-Deliver), and [Operate](Skill-Operate) at their respective gates; validated pre-merge by [Shakedown](Skill-Shakedown).
