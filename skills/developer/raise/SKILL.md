---
name: raise
description: Model-invoked publish of sliced backlog to GitHub or Linear with pickup-protocol labels. Use after slice output is ready.
---

# Raise (model-invoked)

Publish work items to the configured tracker.

## When to invoke

- `slice` produced contract-complete items
- User confirms tracker target

## Procedure

1. Read `.impact.json` for `tracker.primary`
2. Follow `trackers/github.md` or `trackers/linear.md`
3. Apply label `raised` on create
4. Store stable idempotency key in issue body footer

## Stop conditions

- Tracker auth missing → stop with setup steps
- Contract incomplete → return to `slice`

## Output contract

List of issue URLs + label state `raised`.

## Sibling skills

- `slice`, `orchestrate`, `sdlc`
