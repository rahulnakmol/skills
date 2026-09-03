---
name: prototype
description: Model-invoked throwaway prototype that answers one design question. Use when a state-model, logic, or interface choice needs running evidence before it is committed to, and when the build can be deleted or explicitly graduated once the answer arrives.
---

# Prototype (model-invoked)

Build the smallest running thing that answers one design question, then delete it or graduate it on purpose.

## Contract

```yaml
contract:
  invocation: model
  thesis: evidence
  verbs: [read, write-repo]
  scope: owns
  trace: probe
```

## When to invoke

- A design choice turns on behavior nobody can predict from discussion, such as a state machine's edge cases or a merge rule
- Two or more interface directions are open, and the team is comparing descriptions rather than something it can use
- An unfamiliar dependency or API raises the question of whether it can do the thing at all
- `architect` reaches a decision that needs evidence before an ADR records it
- The user asks for a spike, a mockup, or a proof of concept

## Procedure

1. Write the question in one sentence, and state which decision the answer changes. A prototype without a question has no stopping point, so it keeps growing until someone runs out of time.
2. Choose the form the question calls for. A state model or logic question is answered by one self-contained HTML file that anyone can open and pass around, with the logic visible on the page. An interface question is answered by several variations reachable from a single route through a toggle, so a reviewer can switch between them in seconds.
3. For an interface question, make the variations genuinely opposed. Three cautious versions of one layout answer nothing, because the comparison only tells you which shade of the same idea people prefer. Build directions that differ in structure, and expect at least one to be rejected.
4. Fake the surroundings; never fake the part the question turns on. Stub the network, hard-code the data, skip authentication. The mechanism under examination has to actually run, or the prototype answers a question nobody asked.
5. Let the code be ugly and keep it honest. Throwaway code may skip abstraction, tests, and error handling. It may not mislead: no placeholder that looks like a working feature, and no number presented as measured when it was typed by hand.
6. Run the prototype with the people who own the decision, and write the answer in one sentence: which direction the evidence supports, and which it rules out. Record what surprised you, since that is usually the part worth carrying into the real design.
7. Decide the disposition explicitly, and say so in writing. Either delete the prototype, or graduate it by naming which parts get rebuilt with tests, error handling, and review before they reach production. A prototype that quietly becomes production is the failure this skill exists to prevent, because throwaway trade-offs then sit under code the team believes was designed.
8. Append the trace entry: the question, the form, the variations built, the answer, the disposition, and any question the run raised without settling.

## Stop conditions

- The question cannot be stated in one sentence → split it; two questions in one build produce an answer to neither
- The prototype starts accumulating tests, configuration, or error handling → it is turning into production code by accident, so answer the question and stop, or graduate it deliberately through `tdd`
- The part the question turns on cannot run without the real dependency → use the real dependency, or report the question as unanswered; a faked mechanism gives a confident wrong answer
- The answer is clear → stop building, even with features unbuilt; further polish costs time and cannot change the answer
- No one will decide from the result → do not build it; record the question and name who has to answer it first

## Output contract

```yaml
question: <the one thing this build answers>
form: single-file-html | ui-variations
variations:
  - name: <direction>
    route: /proto/dense-table
    idea: <what makes it structurally different from the others>
faked: [network, auth, seed data]
not_faked: <the mechanism the question turns on>
answer: <direction the evidence supports, and what it rules out>
surprise: <what the run showed that discussion had not, or none>
disposition: deleted
graduation: <what must be rebuilt before production, or none>
open: <question raised and not settled>
```

## Sibling skills

- `architect` — records the decision this evidence informs, as an ADR
- `tdd` — rebuilds a graduated part test first, which throwaway code skipped
- `debug` — use instead when the question is why existing code fails
- `core/TRACE.md` — the trace this skill appends to
