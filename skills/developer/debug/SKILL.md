---
name: debug
description: Model-invoked diagnosis loop for hard bugs and performance regressions. Use when a defect resists a quick fix, when a failure is intermittent, or when a measurement has moved the wrong way and the cause is not yet known.
---

# Debug (model-invoked)

Find the cause of a failure by evidence, fix that cause, and leave a test that catches it if it returns.

## Contract

```yaml
contract:
  invocation: model
  thesis: evidence
  verbs: [read, write-repo]
  scope: owns
  trace: hypothesis
```

## When to invoke

- A test or a user report describes a failure whose cause is unknown
- A failure is intermittent, and the first attempt to reproduce it did not
- A benchmark, a latency figure, or a memory figure moved the wrong way
- `tdd` produced a red test that fails for a reason nobody can explain
- A previous fix was applied and the symptom came back

## Procedure

1. Build a feedback loop that goes red on this bug, and run it before anything else. A command, script, or test that fails on demand is the instrument every later step reads. You cannot diagnose a failure you cannot produce, so this step is a gate: do not change code while the loop is green.
2. Minimize the reproduction. Remove inputs, configuration, and code paths one at a time until the failure disappears, then restore the last thing removed. What remains is the smallest set of conditions the bug needs, and it is usually much smaller than the original report.
3. State one hypothesis, in a form evidence can refute. "The cache serves an entry after its expiry" can be tested; "something is wrong with caching" cannot. Write it down before looking for support, because a hypothesis assembled after the evidence tends to fit whatever the evidence happened to be.
4. Instrument to test that hypothesis. Add the log line, counter, assertion, or profiler run that reports the value the hypothesis predicts. Measure rather than reason from the source alone: reading code shows what it should do, and the defect is the gap between should and does.
5. For a performance regression, record the measurement before any change, on the same input and the same machine, and repeat it enough times to see the spread. An "after" number without a matching "before" proves nothing, and a single run of a noisy benchmark is not a measurement.
6. Change one thing at a time. Two simultaneous changes make the result unattributable: if the symptom clears, you will not know which change cleared it, and the unnecessary change travels forward into the codebase.
7. Rerun the loop and record the reading. Evidence that refutes the hypothesis is a result, not a setback — it removes a branch of the search — so record it and return to step 3. Evidence that supports it lets you name the cause in one sentence.
8. Fix the named cause. A guard that hides a value which should never have existed leaves the defect in place and moves the failure to a later, less visible point.
9. Append the trace entry: the minimized reproduction, each hypothesis with the evidence that supported or refuted it, the named cause, the measurement on both sides of the fix, and what remains open.
10. Hand off to `tdd` for the regression test, which must fail before the fix and pass after it. Without that test, the next refactor can undo the fix silently.

## Stop conditions

- The failure will not reproduce after a bounded effort → report what was tried and name the missing input, environment, or log, rather than fixing on speculation
- The symptom disappears without a named cause → leave the bug open; "it works now" records a change in behavior, not a diagnosis
- Two hypotheses look equally likely → test the cheaper one first, and still only one at a time
- The cause sits in code you cannot change → record the cause and its evidence, report it to that component's owner, and note any workaround as a workaround
- The fix requires a design change wider than the defect → stop and take the decision to `architect` before writing it

## Output contract

```yaml
symptom: <the failure as reported>
reproduction:
  command: <what fails on demand>
  minimized: <smallest conditions that still fail>
hypotheses:
  - claim: <falsifiable statement>
    evidence: <measurement, file and line, or exit status>
    verdict: refuted
  - claim: <falsifiable statement>
    evidence: <measurement, file and line, or exit status>
    verdict: supported
cause: <one sentence, or unknown>
fix:
  change: src/session-cache.ts:64
  measurement: "p95 412ms before, 96ms after, same 10k-row input, 5 runs"
regression_test: <handed to tdd, or none>
open: <what this run did not settle>
```

## Sibling skills

- `tdd` — locks the fix in a test that fails before it and passes after
- `recon` — read the estate first when the failure sits in unfamiliar code
- `grit` — carries this diagnosis as evidence against the gate the bug blocks
- `core/TRACE.md` — the trace this skill appends to
