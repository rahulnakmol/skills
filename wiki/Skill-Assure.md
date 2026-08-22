# Skill: Assure

**Group:** developer · **Invocation:** mixed-invoked specialist · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/assure/SKILL.md)

Assure is the quality and maintainability charter. It checks that the SPEC-TS ledger is actually testable and complete: requirements are prioritized, constraints are quantified, and trade-offs are backed by evidence. It produces a quality report that lists test gaps and technical-debt items for the backlog.

## When to invoke

- A gate in the SDLC loop requires evidence from the assure role.
- A work item's pod charter names this role.

## How it fits

Assure carries out the Maintainability stage of the [role journey](Architecture-Role-Journey). Its findings do not stop at a report; they return to [Slice](Skill-Slice) as continuous-improvement items, which is how the operability lane keeps the loop between delivery and maintenance open.

## Key references

- [adapters/opencode/agents/quality.md](https://github.com/rahulnakmol/skills/blob/main/adapters/opencode/agents/quality.md) contains the executable protocol for checking ledger completeness and quality.

## Sibling skills

Assure feeds continuous-improvement items back into [Slice](Skill-Slice) and runs within [SDLC](Skill-SDLC)'s quality gate.
