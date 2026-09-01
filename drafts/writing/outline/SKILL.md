---
name: outline
description: User-invoked structure stage of the writing sequence — use it after freewriting to assemble raw fragments into an ordered sequence of beats, grounding every term before a beat leans on it and cutting material that serves no beat.
---

# Outline (user-invoked)

Turn a pile of fragments into an ordered journey of beats, and cut whatever does not serve one.

## Contract

```yaml
contract:
  invocation: user
  thesis: gate
  verbs: [read, write-repo]
  trace: beat
```

## When to invoke

- `freewrite` has produced fragments and the author is ready to decide what the piece is for
- A draft reads as a list of true statements that never add up to a journey
- A reader reports getting lost partway through an existing piece
- The user asks for an outline, a structure, or a running order

## Procedure

1. State in one sentence what the piece is for and who reads it. Every later cut is measured against that sentence, so an outline built without it has no gate.
2. Name each candidate beat as one move the reader makes: one idea landing, one turn, one objection answered. A section heading is not a beat and a topic is not a beat, because neither says what changes in the reader.
3. Attach fragments to beats. A beat with no supporting fragment is an assertion the piece cannot yet pay for; either find the material or drop the beat.
4. Order the beats by what the reader needs next, not by the order the material was gathered. The gathering order records how the author found the idea, and the reader has not found it yet.
5. Walk the beats in order and ground every term. For each beat, list the concepts it relies on and confirm an earlier beat introduced each one. If beat five leans on a term the reader met nowhere, the outline is broken however good beat five is; move the grounding earlier or add a beat that supplies it.
6. Collect everything that serves no beat into a cut list, including material the author likes. Quality is not the test at this stage; service to a beat is.
7. Put the cut list to the author and get an explicit decision on each item. This is the gate, and it needs a human: only the author can say what the piece is actually for, and that judgment is what makes a good paragraph expendable.
8. Append the trace entry: the purpose sentence, the beat count and order, any term that had to be grounded earlier and where it moved, and what the author cut.
9. Hand the ordered beat list to `draft`.

## Stop conditions

- A beat cannot be stated as one move the reader makes → it is a topic; split it into moves or cut it
- A term is used before it is grounded and no earlier beat can carry it → add a grounding beat, or drop the beat that needs the term
- Every fragment survives → the gate did not run; walk the list again with the purpose sentence in hand
- The author will not say what the piece is for → stop; ordering by reader need is guesswork without it
- Two beats make the same move → merge them, because a repeated move reads to the reader as stalling

## Output contract

```yaml
purpose: <what the piece is for, and for whom>
beats:
  - id: b1
    move: <the one move the reader makes here>
    grounds: [<terms this beat introduces>]
    requires: [<terms it relies on, each introduced earlier>]
    fragments: [f3, f11]
  - id: b2
    move: <the one move the reader makes here>
    grounds: []
    requires: [<term introduced in b1>]
    fragments: [f7]
grounding: clean | <term, and the beat it moved to>
cut:
  - fragment: f9
    reason: <the beat it failed to serve>
    decided_by: author
open: <beats with no supporting material yet>
```

## Sibling skills

- `freewrite` — the previous stage; return there when a beat has no material behind it
- `draft` — the next stage; it renders these beats one at a time and reports its coverage of them
- `core/TRACE.md` — the trace this skill appends to
