# Skill: Update models

**Group:** developer · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/update-models/SKILL.md)

Curates the canonical model registry against live provider catalogs — Anthropic, OpenAI, and Google only, for anything shipped as a **published** default — and opens a reviewable PR. It never changes production defaults silently; a non-allowlist provider proposed as a new default is rejected outright unless an explicit ADR waiver exists.

## When to invoke

- The user runs `/update-models`, or the monthly automation dispatches
- A model deprecates, or a role-fit regression turns up in production evidence

## How it fits

`update-models` is what keeps [model-routing](Skill-Model-Routing)'s registry honest over time. The scheduled workflow now checks registry freshness and files a review-due issue when it's stale, rather than manufacturing a placeholder PR — a real research run only happens on manual dispatch, with an API key, and merge is always human.

## Key references

- [RESEARCH.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/update-models/RESEARCH.md) — the evidence log format
- [.github/workflows/update-models.yml](https://github.com/rahulnakmol/skills/blob/main/.github/workflows/update-models.yml) — monthly freshness check + `workflow_dispatch` research run

## Sibling skills

Edits the registry [Model routing](Skill-Model-Routing) reads from.
