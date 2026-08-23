# Skill: Safeguard

**Group:** developer · **Invocation:** mixed-invoked specialist · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/developer/safeguard/SKILL.md)

Safeguard is the security charter for the secure-DevOps gate. It carries out threat modeling and hardening and produces a report of findings by severity. It is named on its own terms, rather than borrowing the name of a generic security review, so that it reads as this repository's own gate.

## When to invoke

- A gate in the SDLC loop requires evidence from the safeguard role.
- A work item's pod charter names this role.

## How it fits

Safeguard operates at the Secure DevOps stage of the [role journey](Architecture-Role-Journey), alongside [Deliver](Skill-Deliver) and [Shakedown](Skill-Shakedown). A critical finding is escalated through the adapter's `-max` or verifier path; it is never quietly downgraded to a note in the backlog.

## Key references

- [adapters/opencode/agents/security.md](https://github.com/tqnonline/skills/blob/main/adapters/opencode/agents/security.md) contains the executable threat-modeling protocol.

## How to use

Safeguard engages at the secure-DevOps gate or when a pod charter names the role. It runs a passive, scoped review — threat modeling and hardening recommendations — and reports findings by severity with the evidence behind each.

## Best practices

- Confirm reachability before reporting: a vulnerability the change cannot trigger is context, not a finding.
- Passive review only — no active scanning or exploitation in a delivery pipeline.
- Escalate critical findings through the verifier path immediately; a critical that quietly becomes a backlog note has been downgraded, not triaged.

## Sibling skills

Safeguard runs alongside [Deliver](Skill-Deliver) and [Shakedown](Skill-Shakedown) at the Secure DevOps gate within [SDLC](Skill-SDLC).
