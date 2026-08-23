# Skill: Model routing

**Group:** developer · **Invocation:** model-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/developer/model-routing/SKILL.md)

Model routing resolves which model tier applies to a given task, so that no other skill needs to name a specific model directly. It is a lookup, not a decision-maker. The decision about which models are even eligible is made one layer up, in the canonical registry this skill reads from.

## When to invoke

- [Orchestrate](Skill-Orchestrate) is assigning a step, such as implementation, verification, architecture, or security.
- An adapter's instructions say to resolve the model through model routing.

## How it fits

Model routing is a thin skill that sits in front of the registry every other skill in this repository defers to for model choice. It never returns an assignment it cannot justify from `models.md`, and where a regulated overlay applies, it will not allow a downgrade that would remove the separation between an implementer and its verifier.

## Key references

- [models.md](https://github.com/tqnonline/skills/blob/main/skills/developer/model-routing/models.md) is the canonical registry: a tier matrix, the published mapping from role to model, examples of user overrides, and a machine-readable block that continuous integration checks the adapters' bindings against.

## How to use

Model routing is consulted, not driven: `orchestrate` calls it per node, and adapter stubs defer to it by name. When you need to know which model a role gets, read `models.md` directly — the registry is the answer; the skill is the disciplined way agents read it.

## Best practices

- Never hardcode a model identifier in a skill or a prompt; the registry exists so a model change is one edit, reviewed once.
- Keep local overrides local — an override committed as a default is a policy violation the harness will catch.
- In a regulated context, never trade away verifier separation for cost; the overlay forbids that downgrade for a reason.

## Sibling skills

Model routing is consulted by [Orchestrate](Skill-Orchestrate) for every step in a graph, and its registry is kept current by [Update models](Skill-Update-Models).
