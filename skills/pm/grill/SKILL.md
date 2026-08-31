---
name: grill
description: User-invoked interrogation loop for PM artifacts — plain, grill-with-docs, and provoke modes. Use to pressure-test an analysis, manifest, case, or PRD before it advances through a gate.
---

# Grill (user-invoked)

Interrogate a PM artifact until it earns the right to advance, or the user stops.

## When to invoke

- An analysis, manifest, case, or PRD is about to reach a gate
- The user says "challenge this," "pressure-test this," or asks for a grill round

## Procedure

1. Choose the mode: plain round protocol, grill-with-docs when a research corpus exists, or provoke for intuition-agent hypotheses (`GRILL-PM.md`)
2. Run themed rounds of three to five questions, capturing answers immediately
3. Restate the sharpened scope after each round; offer continue, stop, or sign-off
4. Before sign-off, run the pre-gate blind-spot checklist (`AGENT-OWNERSHIP.md`)
5. Record every trade-off accepted by an early stop before the session closes

## Stop conditions

- The user says "we stop here" — end immediately, no extra round
- Sign-off requested with the artifact's core question still unanswered

## Output contract

The artifact updated in place with captured answers, plus a Trade-offs record of what was accepted by stopping where the session stopped.

## Sibling skills

Threaded through `discover`, `case`, `carve`, and `prd-draft`. Shares its round protocol with the developer group's `core/GRILL.md`.
