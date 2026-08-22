---
name: update-models
description: User-invoked model registry curation. Research provider catalogs, propose updates to models.md and adapters, open a reviewable PR. Use on schedule or when models deprecate.
---

# Update models (user-invoked)

Curate the canonical registry; never silently change production defaults.

## When to invoke

- User runs `/update-models` or monthly automation dispatches
- A model deprecates or role-fit regresses

## Procedure

1. Read `RESEARCH.md` and current `../model-routing/models.md`
2. Gather provider changelogs (Anthropic, OpenAI, Google only for **published** defaults)
3. Draft diff: `models.md` + affected `adapters/` stubs only
4. Log evidence in `RESEARCH.md`
5. Open PR; human approval required

## Stop conditions

- Non-allowlist provider as new **default** → reject unless ADR waiver
- Missing evidence for role change → stop

## Output contract

PR with: summary table, risk notes, test plan (smoke orchestration path).

## Automation

`.github/workflows/update-models.yml` — monthly cron + `workflow_dispatch`.
