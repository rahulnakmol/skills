# Skill: PRD Validate

**Group:** pm · **Invocation:** model-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-validate/SKILL.md)

PRD Validate is a read-only structural filter: it checks a PRD against a nine-item checklist and reports pass or fail, without modifying the document or rewriting a single line.

## When to invoke

- `prd-draft` has produced one or more PRDs.
- The user asks to check or validate PRD completeness.

## How it fits

PRD Validate sits between `prd-draft` and `prd-review` — a cheap, deterministic gate that catches structural gaps before the more expensive, judgment-heavy quality review runs.

## Key references

- Its nine checks — sections present, named personas, Given-When-Then acceptance criteria, priority and complexity, star levels, success metrics, risk detail, owned open questions, populated scope — are stated in full in the skill's own procedure.

## How to use

Point PRD Validate at a PRD path, or leave it unset to validate every PRD found under `specs/prd/`. It runs all nine checks regardless of an early failure and writes one report per PRD with a PASS, PASS WITH WARNINGS, or FAIL verdict.

## Best practices

- Treat a FAIL on any of checks one through four as blocking — these are structural, not stylistic.
- Never ask this skill to fix an issue; route back to `prd-draft` instead.
- Run all nine checks even after an early failure — do not short-circuit.

## Sibling skills

Reads from `prd-draft`. Precedes `prd-review`.
