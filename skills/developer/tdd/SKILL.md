---
name: tdd
description: Model-invoked test-first discipline. Use to build a feature or fix a bug one vertical slice at a time, writing a failing test that fails for the right reason before the implementation exists, and refactoring only under green.
---

# TDD (model-invoked)

Write the test that fails, make it pass, then improve the code without changing what it does.

## Contract

```yaml
contract:
  invocation: model
  thesis: evidence
  verbs: [read, write-repo]
  scope: owns
  trace: red-green
```

## When to invoke

- A work item's acceptance criterion describes behavior a test can observe
- A bug is reproducible, and the reproduction belongs in the suite before the fix
- `sdlc` or `deliver` reaches implementation on a slice with a testable contract
- The user asks for test-first work, red-green-refactor, or a regression test

## Procedure

1. Pick one vertical slice: the smallest change that a user of the interface could observe. A slice that spans three layers is still one slice if it delivers one observable behavior.
2. Write the test first, and name it for the behavior rather than the function — `rejects an expired session` over `test refresh`. See `TESTS.md` for what separates a test that holds from one that only passes.
3. Run it and read the failure. It must fail for the reason the test exists; a test that fails on a missing import or a typo has proven nothing yet. Record the red in the trace with the assertion message it actually produced.
4. Write the least implementation that turns it green. Not the design intended for the finished feature — the least code that satisfies this assertion.
5. Run the whole suite, not only the new test. Green here means nothing else moved.
6. Refactor under green, running the suite after each step. Change structure or names; never change behavior, because the tests that would catch a behavior change are the ones being relied on.
7. Append the trace entry: the seam chosen, the red message, the file and line that made it green, and what the slice left open.
8. Repeat from step 1 until the criterion is met, then hand the evidence to the gate ledger `grit` keeps for this scope.

## Stop conditions

- The test passes the first time it runs → the test does not test what it claims; fix the test before writing any implementation
- No test can observe the criterion → say so and record it as a manual gate, never a weakened assertion that always passes
- The suite was already red before the slice started → stop and report the pre-existing failure; a slice built on a red suite cannot show it worked
- Refactoring turns a test red → revert the refactor, not the test
- The implementation grows past the slice → the slice was too large; split it and start again

## Output contract

```yaml
slice: <one observable behavior>
seam: <interface the test drives>
red:
  test: test/session-store.test.mjs:41
  message: "expected 401, received 200"
green:
  implementation: src/session-store.ts:88
  suite: 214 passed, 0 failed
refactored: <what changed, or none>
open: <what the slice did not cover>
```

## Sibling skills

- `debug` — diagnose first when the failure is not yet understood; return here to lock the fix in a test
- `grit` — turns the acceptance criteria into the gates this evidence closes
- `refactor` — structural change larger than a green-to-green step
- `core/TRACE.md` — the trace this skill appends to
