# Skill: Model routing

**Group:** developer · **Invocation:** model-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/model-routing/SKILL.md)

Resolves which model tier applies to a task node, so no other skill has to embed a model ID directly. A lookup, not a decision-maker — the decision about which models are even eligible lives one layer up, in the canonical registry this skill reads.

## When to invoke

- [Orchestrate](Skill-Orchestrate) is assigning a node (implement, verify, architect, security, …)
- An adapter stub says "resolve via model-routing"

## How it fits

`model-routing` is the thin skill sitting in front of the registry every other skill in this repo ultimately defers to for model choice. It never returns a role it can't justify from `models.md`, and a regulated overlay in effect blocks any downgrade past verifier separation.

## Key references

- [models.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/model-routing/models.md) — the canonical registry: tier matrix, published role→model mapping, override examples, and the machine-readable JSON block CI checks adapter bindings against

## Sibling skills

Consumed by [Orchestrate](Skill-Orchestrate) for every graph node; kept current by [Update models](Skill-Update-Models).
