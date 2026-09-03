---
name: wait-what
description: User-invoked re-pitch of a message that did not land, which diagnoses why the explanation failed and rebuilds it from what the reader already understands — use it the moment you read something and do not follow it.
---

# Wait-what (user-invoked)

Diagnose why an explanation failed, then take a different route to the same point.

## Contract

```yaml
contract:
  invocation: user
  thesis: scaffold
  verbs: [read]
  scope: guest
  trace: repitch
```

## When to invoke

- You read a message, a plan, or a review comment and did not follow it
- The words parsed but the point did not; you could repeat the sentence and still not act on it
- You asked once, received more detail, and understood less than before
- A handoff assumes a step you never saw anyone take
- A term is used as though it were already agreed, and you have not seen it defined

## Procedure

1. Quote the exact span that failed — the sentence, the paragraph, or the term. A whole document reported as unclear gives nothing to work with, and the failure is nearly always narrower than it feels.
2. Diagnose the cause before rewriting a word. Four causes account for most failures: an unexplained term, an assumed step, an inverted structure that put the conclusion after the reasoning meant to support it, and a claim resting on context the reader never had. Name the one that applies.
3. Ask what specifically did not land when the failure point is genuinely unclear. One question costs less than re-explaining a document the reader had mostly followed, and it keeps the second attempt from aiming at the wrong sentence.
4. Establish the floor. State what the reader does already understand, in their words. The re-pitch starts there and moves one step at a time, because a step the reader cannot take is where a second attempt fails the same way the first did.
5. Take a different route to the same point. A re-pitch is not the same words rearranged, and it is not the same words louder. Change the entry point, the order, or the example. Do not change the claim: a clearer explanation of a different claim is a new problem, not a fix.
6. Use the vocabulary the project already established. A new term introduced to rescue a failed term adds a second thing to learn, and the reader now has to map between the two.
7. Add no detail the original lacked. Answering confusion with more detail is the reflex, and it usually makes matters worse, because it lengthens the route that already failed instead of replacing it.
8. Check the result against the diagnosed cause. If the diagnosis was an assumed step, the re-pitch has to contain that step. If it was an inverted structure, the conclusion now comes first. A re-pitch that does not answer the diagnosis is only a rewrite.
9. Report the trace entry for the session to append under the `repitch` kind: the span, the cause, the route taken, and whether it landed. This skill reads only. It writes no file in the working tree, so the session that owns the trace records the entry.

## Stop conditions

- The reader cannot point at where it failed → ask what the last part was that made sense, rather than re-explaining from the top
- The diagnosis comes out as "they should read it again" → that is not a diagnosis; the message already failed once and will fail the same way
- The re-pitch needs a term the original never defined → define it while establishing the floor, or drop the term
- The original claim turns out to be wrong → stop and say so; a clearer route to a wrong conclusion is worse than the confusion it replaced
- Two re-pitches have failed → the gap is a missing prerequisite rather than wording, so name the prerequisite and teach that instead

## Output contract

```yaml
span: <the exact sentence, term, or passage that did not land>
cause: unexplained-term | assumed-step | inverted-structure | missing-context
floor: <what the reader already understood, stated in their words>
route: <how this explanation differs from the original, in one line>
vocabulary_reused: [<terms the project had already established>]
terms_introduced: <new terms, or none>
landed: yes | no | unverified
open: <what remains unclear, or none>
```

## Sibling skills

- `teach` — use when the gap is a missing prerequisite rather than a failed explanation, because a re-pitch cannot substitute for a lesson
- `brief` — where one term fails message after message, define it once where the team's agents read it rather than re-pitching it each time
- `core/TRACE.md` — defines the `repitch` kind this run reports and the session appends
