# ADR 0001: Promoted-only skills tree

## Status

Accepted

## Context

Codex and some hosts treat every folder under `skills/` as a plugin surface.

## Decision

Only promoted skills live under `skills/`. Everything else goes to `drafts/`.

## Consequences

- CI and `plugin.json` must list the same promoted set.
- Drafts never ship in marketplace manifests.
