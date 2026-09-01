---
name: freewrite
description: User-invoked explore stage of the writing sequence — use it at the start of a piece, before any structure exists, to mine raw fragments from the author while keeping generation strictly separate from judgment.
---

# Freewrite (user-invoked)

Pull raw material out of the author, unsorted and unjudged, so a later stage has something to shape.

## Contract

```yaml
contract:
  invocation: user
  thesis: scaffold
  verbs: [read, write-repo]
  trace: fragment
```

## When to invoke

- The author has a subject and no draft, and needs to find out what they actually think about it
- A draft has stalled because the material underneath it is thin
- The piece has to sound like a particular person, so the raw phrasing must come from that person
- The user asks to brainstorm, freewrite, or dump notes before writing anything

## Procedure

1. Write the subject at the top of the fragment file in one sentence. That sentence is the only structure this stage allows.
2. Tell the author that nothing captured here will be judged, and hold to it. Editing while generating kills material before it exists: the inner critic and the generator cannot run at the same time, and the critic is faster.
3. Interview the author instead of writing for them. Ask what surprised them, what they would argue with, what a specific reader would object to, and what example they keep returning to.
4. Capture each fragment as it arrives, in the author's own words. Half-thoughts, objections, examples, and a phrase that sounds right but is not yet earned all belong in the file; the phrase gets a marker so a later stage knows it is unproven.
5. Keep contradictions rather than resolving them. Record both sides and mark the pair. A contradiction is usually where the real idea is hiding, and resolving it here settles the question before the evidence is in.
6. Push past the first answers. The first three responses to a question are usually the ones the author has already said out loud, and the material worth having sits behind them.
7. Stop when the well runs dry, not when a count is reached. A quota produces filler, and filler is indistinguishable from material until the next stage wastes time on it.
8. Append the trace entry: the subject sentence, how many fragments were captured, which contradictions were kept, and which questions returned nothing.
9. Hand the fragment file to `outline` without sorting it.

## Stop conditions

- The author asks for the fragments to be organized → say that ordering belongs to `outline`, and keep capturing
- A fragment arrives already shaped as prose → keep it as a fragment and do not extend it; prose here commits the piece to a shape nobody has chosen yet
- Two fragments contradict each other → record both, label the pair, and move on rather than asking the author to pick
- Three questions in a row return nothing new → the well is dry; close the file and hand off
- The author has no first-hand material on the subject → stop and say so; supplying the material here produces a piece that sounds like nobody

## Output contract

```yaml
subject: <one sentence>
fragments:
  - id: f1
    text: <the author's words, unedited>
    kind: half-thought | example | objection | unearned-phrase
  - id: f7
    text: <the author's words, unedited>
    kind: objection
contradictions:
  - pair: [f3, f11]
    about: <what the two fragments disagree on>
dry: <the questions that produced nothing>
open: <what the author said they would need to look up>
```

## Sibling skills

- `outline` — the next stage; it groups these fragments into beats and cuts what serves none
- `draft` — the render stage, two steps ahead; do not run it against raw fragments
- `core/TRACE.md` — the trace this skill appends to
