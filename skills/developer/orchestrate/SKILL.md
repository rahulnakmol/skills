---
name: orchestrate
description: Model-invoked flagship orchestration. Choose loop, graph, or hybrid execution; assign model-per-node via model-routing; map to harness adapters. Use for multi-step delivery beyond a single verifier.
---

# Orchestrate (model-invoked)

Select execution shape and route work across skills and adapters.

## When to invoke

- Task spans multiple gates or contexts
- User or `sdlc` needs routing before implementation

## Procedure

1. Apply `RUBRIC.md` → loop | graph | hybrid
2. Build node list with outputs (see `GRAPH.md` / `LOOP.md`)
3. Per node: `Call the Skill tool with "model-routing"`
4. Invoke specialist skills (`impact`, `recon`, `architect`, …) — do not inline their protocols
5. Enforce pickup protocol on work items (`slice/WORK-ITEM-CONTRACT.md`)

## Stop conditions

- Ambiguous done criteria → stop; call `impact` for SPEC-TS
- Work item not `ready` → critique-only phase

## Output contract

```yaml
mode: graph|loop|hybrid
nodes:
  - id: implement-1
    skill: sdlc
    adapter: adapters/opencode/agents/work-sonnet.md
evidence: []
```

## Sibling skills

- `sdlc` — user-invoked gated loop
- `model-routing` — tier resolution
