# Skill: Update models

**Group:** developer · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/update-models/SKILL.md)

Update models curates the canonical model registry against the current catalogs published by Anthropic, OpenAI, and Google, the only providers this repository ships as published defaults, and opens a pull request for review. It never changes a production default silently. A provider outside the allowed list, proposed as a new default, is rejected unless an explicit waiver is recorded in an architecture decision record.

## When to invoke

- The user runs the update-models command, or the monthly automated schedule triggers it.
- A model is deprecated, or evidence from production shows a regression in how well a model fits its assigned role.

## How it fits

Update models is what keeps the registry that [Model routing](Skill-Model-Routing) reads from accurate over time. The scheduled workflow checks whether the registry's last review is overdue and files an issue when it is, rather than generating a placeholder pull request with no real content. A genuine research run happens only when someone dispatches it manually, with an API key supplied, and a person always reviews the result before it merges.

## Key references

- [RESEARCH.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/update-models/RESEARCH.md) defines the format for logging evidence.
- [.github/workflows/update-models.yml](https://github.com/rahulnakmol/skills/blob/main/.github/workflows/update-models.yml) runs the monthly freshness check and the manually dispatched research job.

## Sibling skills

Update models edits the registry that [Model routing](Skill-Model-Routing) reads from.
