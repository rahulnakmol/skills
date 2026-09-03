---
name: recon
description: Model-invoked brownfield codebase brief via signal-first archetype triage. Read-only; loads ≤3 pattern cards. Use before impact or architect on existing estates.
---

# Recon (model-invoked)

Produce a brownfield brief without editing the repository.

## Contract

```yaml
contract:
  invocation: model
  thesis: scaffold
  verbs: [read]
  scope: guest
  trace: signal
```

## When to invoke

- Brownfield `impact` or architecture needs estate context
- User asks for codebase orientation or modernization seams

## Procedure

1. Follow `TRIAGE.md`
2. Match markers (`references/signals/MARKERS.md`)
3. Load only matched cards (`PATTERNS.md`)
4. Targeted file reads on hot paths
5. Output `BRIEF-FORMAT.md`

Report the trace entry for the session that owns the scope to append under the `signal` kind: the signals matched, the pattern cards considered and not loaded against the three-card cap, and the archetype confidence. Recon reads only and writes nothing, so the owning session records it.

## Stop conditions

- No signals → brief states unknown archetype + suggested manual questions
- Never modify source files

## Output contract

Brief markdown per `BRIEF-FORMAT.md` with archetype labels and confidence.

## Sibling skills

- `impact` — consumes brief for PRD
- `architect` — design from brief
