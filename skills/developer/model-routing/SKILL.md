---
name: model-routing
description: Model-invoked lookup of tier and role assignments from the canonical registry. Use when selecting a worker, verifier, or orchestrator model for a task node.
---

# Model routing (model-invoked)

Resolve which model tier applies to a task node without embedding IDs in other skills.

## When to invoke

- Orchestrator assigns a node (implement, verify, architect, security)
- Adapter stub says "resolve via model-routing"

## Procedure

1. Open `models.md`
2. Match **role** + **task shape** to a tier row
3. Map tier to host-specific ID in the active adapter (OpenCode, Copilot, Cursor)
4. Return: tier, rationale, adapter key — not raw secrets

## Stop conditions

- Role unknown → default to `worker-fast` with explicit assumption logged
- Regulated overlay active → no downgrade past verifier separation

## Output contract

```yaml
tier: worker-deep
role: implement
adapter_ref: adapters/opencode/agents/work-sonnet.md
rationale: multi-file API change
```

## Sibling skills

- `update-models` — human curation PRs to `models.md`
- `orchestrate` — consumes routing for each graph node
