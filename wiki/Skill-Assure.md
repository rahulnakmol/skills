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

## How to use

Assure engages at the quality gate or when a pod charter names the role. It audits the SPEC-TS ledger for testability — prioritized requirements, quantified constraints, evidence-backed trade-offs — and produces a quality report whose gaps become backlog items.

## Best practices

- Send every finding to the backlog as a continuous-improvement item; a quality report that ends as a document has changed nothing.
- Insist on quantified constraints — "fast enough" and "reliable" are placeholders, not engineering requirements.
- A failed or omitted quality lens is a result to report, never an empty success.

## Sibling skills

Assure feeds continuous-improvement items back into [Slice](Skill-Slice) and runs within [SDLC](Skill-SDLC)'s quality gate.
