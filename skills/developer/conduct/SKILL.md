---
name: conduct
description: Model-invoked routing for work that builds or changes software. Decides whether delivery runs as a loop, a graph, or a hybrid, assigns a model to each node, and maps the result onto harness adapters. Use before implementation spanning several workstreams, verifiers, or context windows begins. For choosing the shape of a research or product inquiry instead, use arrange.
---

# Conduct (model-invoked)

Select execution shape and route work across skills and adapters.

## Contract

```yaml
contract:
  invocation: model
  thesis: scaffold
  verbs: [read]
  scope: guest
  trace: none
```

## When to invoke

- Task spans multiple gates or contexts
- User or `sdlc` needs routing before implementation

## Procedure

1. Apply `RUBRIC.md` → loop | graph | hybrid
2. Build node list with outputs (see `GRAPH.md` / `LOOP.md`)
3. Per node: `Call the Skill tool with "model-routing"`
4. Invoke specialist skills (`impact`, `recon`, `architect`, …) — do not inline their protocols
5. Enforce pickup protocol on work items (`slice/WORK-ITEM-CONTRACT.md`)
6. High-consequence writes route through a `human` node — see `GRAPH.md`
7. Work-item delivery maps to the named pipeline workflows — see `GRAPH.md` harness mapping

## Stop conditions

- Ambiguous done criteria → stop; call `impact` for SPEC-TS
- Work item not `ready` → critique-only phase

## Output contract

```yaml
mode: graph|loop|hybrid
nodes:
  - id: implement-1
    type: agent
    skill: sdlc
    adapter: adapters/opencode/agents/work-sonnet.md
  - id: approve-release
    type: human
    owner: release-manager
    decision: "Ship implement-1's diff to production?"
    inputs: [implement-1.diff, verify-1.report]
    sla_hours: 48
    escalation: engineering-director
evidence: ["RUBRIC.md#routing-questions", "models.md#machine-registry"]
```

## Sibling skills

- `sdlc` — user-invoked gated loop
- `model-routing` — tier resolution
