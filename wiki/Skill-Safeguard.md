# Skill: Safeguard

**Group:** developer · **Invocation:** mixed-invoked specialist · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/safeguard/SKILL.md)

Safeguard is the security charter for the secure-DevOps gate. It carries out threat modeling and hardening and produces a report of findings by severity. It is named on its own terms, rather than borrowing the name of a generic security review, so that it reads as this repository's own gate.

## When to invoke

- A gate in the SDLC loop requires evidence from the safeguard role.
- A work item's pod charter names this role.

## How it fits

Safeguard operates at the Secure DevOps stage of the [role journey](Architecture-Role-Journey), alongside [Deliver](Skill-Deliver) and [Shakedown](Skill-Shakedown). A critical finding is escalated through the adapter's `-max` or verifier path; it is never quietly downgraded to a note in the backlog.

## Key references

- [adapters/opencode/agents/security.md](https://github.com/rahulnakmol/skills/blob/main/adapters/opencode/agents/security.md) contains the executable threat-modeling protocol.

## Sibling skills

Safeguard runs alongside [Deliver](Skill-Deliver) and [Shakedown](Skill-Shakedown) at the Secure DevOps gate within [SDLC](Skill-SDLC).
