---
name: draft
description: User-invoked render stage of the writing sequence — use it once an outline of beats exists to write prose one beat at a time and record which beat each paragraph serves, so the draft's coverage of the outline is auditable rather than felt.
---

# Draft (user-invoked)

Write the outline into prose one beat at a time, and record which beat each paragraph serves.

## Contract

```yaml
contract:
  invocation: user
  thesis: evidence
  verbs: [read, write-repo]
  trace: draft
```

## When to invoke

- `outline` has produced an ordered beat list and every term in it is grounded
- A passage has to be rewritten because the beat behind it changed
- A draft exists and nobody can say which beats it actually covers
- The user asks for prose, a first draft, or a rewrite of a section

## Procedure

1. Read the beat list and pick one beat. Write that beat and nothing else in this pass.
2. Write paragraph by paragraph, never the whole piece in one sitting. A whole-piece pass produces even texture, and even texture is what makes writing forgettable: the reader gets no signal about which sentence carries the weight.
3. Record the beat each paragraph serves in the coverage table as the paragraph is written. A table filled in afterward records what the writer remembers, which is exactly the thing this stage exists to replace with a record.
4. Vary sentence length deliberately. A run of same-length sentences flattens the passage, and a short sentence after three long ones lands.
5. Test each paragraph by removing it and reading the beat without it. If the beat still lands, the paragraph was decoration; cut it and note the cut.
6. Read the beat aloud, or simulate reading it aloud, and mark every place you stumble. A stumble is the reader's stumble arriving early, so recast or cut the sentence that caused it.
7. Repeat from step 1 until each beat has been attempted. List the beats that still have no paragraph rather than treating silence as coverage.
8. Read the whole piece once for transitions. Writing beat by beat risks visible seams at the joins, which is the cost of the method; this pass is what pays it. Repair the joins only, and leave the texture inside each beat alone.
9. Append the trace entry: beats covered, beats left uncovered, paragraphs cut and the beat each failed to serve, and the seams repaired in the transition pass.

## Stop conditions

- A beat needs a term the reader does not yet have → stop and return to `outline`; prose cannot repair a grounding gap
- A paragraph serves no beat → cut it, however good the writing is
- A beat runs past roughly four paragraphs → it is carrying two moves; return to `outline` and split it
- The transition pass starts rewriting content instead of joins → stop the pass; content changes belong in a fresh pass over that beat
- Beats remain uncovered when the material runs out → report them as uncovered and do not close the run as complete

## Output contract

```yaml
piece: <working title>
beats: 7
coverage:
  - beat: b1
    move: <the one move the reader makes here>
    paragraphs: [1, 2]
  - beat: b6
    move: <the one move the reader makes here>
    paragraphs: []
uncovered: [b6]
cut:
  - paragraph: <first words of the paragraph removed>
    reason: <the beat it failed to serve>
seams: <joins repaired in the transition pass, or none>
open: <what the draft did not resolve>
```

## Sibling skills

- `outline` — the previous stage; every gap found here is repaired there, not in the prose
- `freewrite` — the source of the material; return there when a beat has nothing behind it
- `core/TRACE.md` — the trace this skill appends to
