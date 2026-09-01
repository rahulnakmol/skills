---
name: refactor
description: User-invoked survey of a codebase for places where a module could hide more complexity behind a smaller interface, ranked and handed to a human to choose from before any structural change begins. Use when the goal is to reduce the complexity callers must carry, not to fix a defect.
---

# Refactor (user-invoked)

Find the modules that could hide more behind a smaller interface, let the human pick one, then work that one.

This is a survey, not a rescue. On a genuinely tangled codebase it finds real candidates, and it will not untangle the mud on its own.

## Contract

```yaml
contract:
  invocation: user
  thesis: gate
  verbs: [read, write-repo]
  trace: deepening
```

## When to invoke

- A module keeps changing whenever an unrelated module changes, which is the signature of information leakage
- A file is mostly pass-through methods that forward calls to the next layer without adding anything
- One observable behavior takes a change in four modules to deliver, which usually means the split follows the order of events rather than the knowledge involved
- Review comments or onboarding notes say a subsystem is hard to hold in the head
- The user asks for a refactor, a design review, or an opinion on where the seams belong

## Procedure

1. Read `DEEP-MODULES.md`. **Load when** a candidate needs a name for what is wrong with it, or when the run needs the vocabulary: deep versus shallow, interface width, information leakage, temporal decomposition, pass-through methods, and seams.
2. Survey read-only. Walk the boundaries rather than the files: for every unit other code imports, write down what a caller must understand to use it and what it hides on the caller's behalf. Interface width is measured in what the caller has to know, not in the count of exported symbols.
3. Rank the candidates by hidden complexity — how much implementation would move behind the interface, and how many callers stop needing to know something. A change that relocates code without narrowing the interface is a move, not a deepening, so drop it from the list.
4. Name the failure mode for each surviving candidate: shallow interface, information leakage, temporal decomposition, or a chain of pass-through methods. A candidate with no name is a hunch, and a hunch does not go in front of the human.
5. Present at most five candidates and stop. For each, state the interface as it stands, the interface proposed, what a caller would no longer need to know, and the estimated cost. Wait for the choice. This is the gate, and the agent never picks the architecture.
6. Work only the candidate the human chose. Keep behavior identical, and move in steps small enough that the suite runs green between them. Call the Skill tool with "tdd" when the seam has no test that pins its behavior.
7. Append the trace entry: the candidates surveyed, the one chosen and that the human chose it, the seam moved, the suite result, and the candidates left on the table.
8. Report the result in the caller's terms — what the interface hides now that it did not hide before.

## Stop conditions

- The human declines every candidate → record the survey in the trace and stop; an unchosen candidate is a finding, not a backlog item to work anyway
- No single seam is separable from the rest → say so plainly and stop; this skill surveys, and a decomposition that has to move at once belongs to `architect`
- No test covers the seam being moved → write characterization tests first, or stop and report that the change cannot be shown safe
- A step changes observable behavior → revert that step; a refactor that changes behavior is a feature change wearing the wrong name
- The chosen candidate outgrows its stated cost → stop, report the revised cost, and return the decision to the human

## Output contract

```yaml
survey:
  modules_read: 41
  candidates_found: 4
chosen:
  module: src/billing/invoice-writer.ts
  failure: shallow interface — seven methods, each one line over the ledger row
  caller_knew: tax rounding order, retry policy, ledger row shape
  caller_knows_now: an invoice and a period
  chosen_by: human
work:
  steps: 5
  suite: 214 passed, 0 failed
  behavior_changed: none
declined: [config-loader temporal split, report pass-throughs, session leakage]
open: <candidates surveyed and not chosen>
```

## Sibling skills

- `tdd` — pins the behavior before a seam moves, and supplies the green each step runs between
- `architect` — takes over when the answer is a new decomposition rather than a deeper module
- `recon` — the read-only brief to run first on a codebase nobody in the session knows
- `core/TRACE.md` — the trace this skill appends to
