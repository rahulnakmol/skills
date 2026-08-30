---
name: grit
description: User-invoked completion discipline for substantial AI-agent work, backed by runnable gates. Use to write the acceptance-gate ledger before implementation, choose a verification depth, run the four passes, and audit met, unmet, and abandoned gates before done is declared.
---

# Grit (user-invoked)

Write the acceptance-gate ledger before implementation starts, then hold the finished work to it.

## When to invoke

- The user asks for completion discipline, or wants to be sure work is actually done, not just reported done
- A work item or PM artifact is substantial enough that a green build or a clean run is not evidence it met its acceptance criteria
- A pipeline needs an evidence ledger in place before implementation begins

## Procedure

1. Author the ledger from the acceptance criteria before any implementation starts. One gate per criterion, each tagged with one of the five dimensions — see `LEDGER.md`.
2. Fix the verification depth. A depth the user states is taken as given; otherwise recommend one from the rubric in `METHOD.md` and record which of the two produced it. Execution shape — loop, graph, or hybrid — stays with `orchestrate`; grit decides only how finely done is decomposed into gates.
3. Implement between the gates using the four passes in `METHOD.md`: complete, harden, hunt, polish.
4. Verify with the checker, in order: `--status` to read the ledger without executing anything, then a dry run to see the resolved commands, then `--approve` once a human has read each command, then `--reverify` on returned work.
5. Close with the final audit in `AUDIT.md` — every gate met, unmet, or abandoned, with evidence.
6. Enforce per tool as described in `HOOKS.md`.

## Stop conditions

- Implementation started before the ledger exists → stop and write the ledger first
- An acceptance criterion no command can decide → record it as a manual gate with recorded evidence, never as a runnable gate with a weakened check
- Unmet gates remain at close → the work is reported unfinished, never softened by editing EXPECT
- A check the approving human cannot read and understand → it does not get approved

## Output contract

```yaml
ledger: GATES.md
depth: 6
depth_source: user-stated|recommended
audit:
  met: 9
  unmet: 1
  abandoned: 1
  gates:
    - id: G1
      status: met
      evidence: "exit=0; shell=/bin/sh; cwd=/repo; EXPECT=matched; output-sha256=6bf5...; output-bytes=9"
    - id: G7
      status: unmet
      evidence: "exit=1; shell=/bin/sh; cwd=/repo; EXPECT=no match; output-sha256=1a2b...; output-bytes=142"
    - id: G9
      status: abandoned
      evidence: "criterion infeasible: no source system exposes this figure; signed off by <name>, 2026-08-30"
```

## Sibling skills

- `shakedown` — the verification doctrine grit makes runnable
- `sdlc` — the gated loop grit's ledgers report into
- `slice` — writes the work-item acceptance criteria grit turns into gates
- `orchestrate` — owns execution shape; grit owns verification depth only
