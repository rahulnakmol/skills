---
name: retro
description: User-invoked improvement loop, the sixth layer of the harness. Use to read accumulated run traces, find the failure patterns that repeat across three or more runs, and propose changes to the skills themselves as a pull request a human reviews before it merges.
---

# Retro (user-invoked)

Read the traces past runs left behind, find what fails repeatedly, and propose the fix for a person to approve.

## Contract

```yaml
contract:
  invocation: user
  thesis: gate
  verbs: [read, write-repo, publish]
  trace: retro
```

## When to invoke

- Several runs have accumulated trace entries in a scope, and nobody has read them together
- The same correction keeps being made by hand across sessions
- A skill produced work that had to be redone, and the reason should be known before the next run
- A milestone or a release closes, and the harness should be revised before the next one starts
- The user asks for a retrospective, or asks which instructions are earning their tokens

## Procedure

1. Collect the traces in scope. A trace sits beside the ledger it accompanies, at `.grit/<scope>/TRACE.md`; a solo task keeps its trace at the repository root. Read every entry in the range rather than a sample, because a sample selects for what was memorable.
2. Extract the failures from each entry's DECIDED, EVIDENCE, and OPEN fields: what the run expected, what it observed, and which skill wrote the entry. Keep the entry timestamp with each row; it is the citation the rest of the run depends on.
3. Count repetitions before naming anything a finding. One occurrence is an anecdote: record it and act on nothing. A pattern that appears in three or more runs is a finding, and only a finding earns a proposed change. The threshold exists because a skill that grows a rule for every one-off failure gets long, and a long skill is read less carefully than a short one.
4. Classify each finding as a skill defect or an execution defect. A skill defect means the instructions were wrong, missing, or ambiguous, and the fix belongs in the skill text. An execution defect means the instructions were right and were not followed, and the fix belongs in the run — routing, the context supplied, or a stop condition that fires earlier. The two look alike in a transcript and take opposite repairs, and treating an execution defect as a skill defect is how a skill accumulates rules nobody needed.
5. Write each proposed change next to the trace entries that evidence it, named by timestamp and by the skill that wrote them, so a reviewer reads the same evidence rather than trusting the summary.
6. Consider deletion alongside addition. A rule that no trace shows anyone using is a candidate for removal, and removing it is as legitimate a proposal as adding one.
7. Open a pull request holding the proposed edits and the evidence table, and stop there. A human reads every proposed change and approves it before it merges. This loop proposes and a person signs off; it never merges its own improvements, because a system that both writes and accepts its own rules has no gate left.
8. Append the trace entry: the range read, each finding with its occurrence count and classification, the anecdotes recorded but not acted on, the pull request, and what stayed unresolved.

## Stop conditions

- Fewer than three runs of trace exist in the scope → report the anecdotes and stop; there is not enough evidence to change a skill
- A failure appears exactly once → record it in the trace and leave the skills untouched
- The finding is an execution defect → propose the routing or stop-condition change, not a new rule in the skill body
- Traces are missing for part of the range → say so plainly and do not reconstruct the history from the diff, which shows what changed and never what was tried and abandoned
- A proposed change has no human approval → it stays open in the pull request, unmerged, for as long as that takes

## Output contract

```yaml
scope: <scope directory read>
range: <first entry timestamp> .. <last entry timestamp>
runs_read: 11
findings:
  - pattern: <what repeated>
    occurrences: 4
    entries: [<timestamp · skill>, <timestamp · skill>, <timestamp · skill>]
    defect: skill | execution
    proposal: <the change, in one line>
    target: <file the change edits>
anecdotes:
  - <single occurrence, recorded and not acted on>
pull_request: <branch or url>
approval: pending human review
open: <what the retro could not decide>
```

## Sibling skills

- `TRACE.md` — defines the entries this skill reads, the fields it mines, and where a trace lives
- `grit` — the gate ledger in the same scope directory; unmet and abandoned gates are evidence a retro reads next to the trace
- `VERIFICATION.md` — read the proposed diff against the traces that motivated it before opening the pull request
- `GRILL.md` — the interrogation a proposed change faces when a reviewer asks what it is worth
