# ADR 0003: Adapters for tool-native artifacts

## Status

Accepted

## Context

Workers, slash commands, and workflow JSON are not portable skill bodies.

## Decision

Keep tool-native files under `adapters/` and `tools/`; skills document contracts and pointers.

## Consequences

- Five-tool install docs live in `adapters/*/README.md`.
- OpenCode workflow runner stays in `tools/opencode-workflows/`.
