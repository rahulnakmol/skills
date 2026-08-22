# ADR 0002: Registry inside model-routing skill

## Status

Accepted

## Context

Model IDs appear in many tool configs; duplication drifts quickly.

## Decision

Canonical registry: `skills/developer/model-routing/models.md`. Adapters reference tiers, not ad-hoc IDs in skills.

## Consequences

- `update-models` PRs touch `models.md` and adapters together.
- `validate.mjs` rejects model IDs in `SKILL.md`.
