# Skill: Safeguard

**Group:** developer · **Invocation:** mixed-invoked specialist · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/safeguard/SKILL.md)

The secure-DevOps gate's security charter — threat modeling, hardening, and a findings-severity report — deliberately named away from a generic "security review" so it reads as this repo's own gate, not a borrowed built-in.

## When to invoke

- An SDLC gate requires safeguard evidence
- A work item's pod charter names this role

## How it fits

`safeguard` sits at the Secure DevOps stage of the [role journey](Architecture-Role-Journey), alongside [Deliver](Skill-Deliver) and [Shakedown](Skill-Shakedown). Critical findings escalate per the adapter's `-max` / verifier path rather than being silently downgraded to a backlog note.

## Key references

- [adapters/opencode/agents/security.md](https://github.com/rahulnakmol/skills/blob/main/adapters/opencode/agents/security.md) — the executable threat-modeling protocol

## Sibling skills

Runs alongside [Deliver](Skill-Deliver) and [Shakedown](Skill-Shakedown) at the Secure DevOps gate within [SDLC](Skill-SDLC).
