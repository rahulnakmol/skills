---
name: triage
description: User-invoked triage of incoming issues and external pull requests. Use to categorize a report, confirm it reproduces, and leave an agent-ready brief on the issue so a human can decide what the project accepts.
---

# Triage (user-invoked)

Move an incoming report through the repository's triage states, and prepare the accept-or-decline decision a human makes.

## Contract

```yaml
contract:
  invocation: user
  thesis: gate
  verbs: [read, write-tracker]
  trace: triage
```

## When to invoke

- A new issue or an external pull request arrives carrying no role label
- Reports have accumulated faster than anyone has categorized them
- A report is thin — one sentence, a screenshot, no version — and cannot be acted on as written
- A maintainer is about to run an accept-and-prioritize pass and wants each candidate briefed first
- An issue already sitting at a verification state is due for a reproduction attempt

## Procedure

1. Read the label vocabulary from the repository's configuration — the state names, their order, and which states are terminal. Never invent a label. The vocabulary is the same one `raise` publishes with, so a repository keeps one label set and two skills never maintain two that drift apart.
2. Read the report in full, including linked threads, the release or commit the reporter names, and any issue it resembles. A duplicate found now costs one search; found after implementation it costs a pull request.
3. Establish the current state. An issue carries exactly one role label at a time. If it carries two, reduce it to one and record in the trace which label was removed and why, because a state machine with two current states cannot be queried.
4. Categorize the report: defect, feature request, question, documentation gap, or security. Categorization is a claim about what the report is, not about whether the project wants it.
5. Grill a thin report before promoting it. Follow `core/GRILL.md`: ask a short themed round for the facts that are missing — version, environment, exact steps, observed result against expected result. Leave the issue at its current state while a question is open rather than advancing it on assumption.
6. Reproduce the report before any state that claims verification. Run the reporter's steps against the version they named, and record the command, its exit status, and the output actually observed. A report that does not reproduce is not thereby false; record what differed, and ask for the missing condition.
7. Write the agent-ready brief as a tracker comment: what happens, what should happen instead, the reproduction command and its result, the file paths where the behavior appears to live, and what remains unknown. Use the section names in `slice/WORK-ITEM-CONTRACT.md` so every pickup reads the same shape. Write to the tracker only — this skill does not change code.
8. Advance the issue by at most one state per pass, and only when that state's evidence exists. A promotion with no evidence behind it converts a queue into a claim nobody checked.
9. Append the trace entry: the issue, the state before and after, the reproduction evidence, the questions still open, and the recommendation put to the human.
10. Present the prepared decision and stop. The skill never applies a terminal label — declined, duplicate, will-not-fix — on its own judgment. A human names the outcome; the skill records it and updates the label.

## Stop conditions

- The repository publishes no triage label vocabulary → stop and ask a maintainer to define it once, in the configuration this skill and `raise` both read
- The report does not reproduce after the stated steps → leave the state unchanged, record the attempt and the environment difference, and ask the reporter for the missing fact
- The fix looks obvious and small → still stop; this skill writes to the tracker only, and the change belongs to `sdlc` or `tdd`
- A security vulnerability is described in a public issue → stop, and follow the repository's disclosure policy instead of discussing details in the thread
- A human has not yet decided and other work is queued behind the issue → report the brief and wait; acceptance and priority are a human call, never a default

## Output contract

```yaml
issue: <tracker id or URL>
category: defect|feature|question|docs|security
state:
  before: <label read from repository configuration>
  after: <next label in that same vocabulary, or unchanged>
reproduction:
  attempted: true
  command: "npm test -- checkout.spec.ts"
  observed: "exit=1, expected 200, received 504"
brief: <URL of the comment carrying the agent-ready brief>
open_questions:
  - <fact the report still does not supply>
recommendation: accept|decline|duplicate|needs-more-information
decided_by: <human name, or pending>
```

## Sibling skills

- `raise` — publishes issues with the label vocabulary this skill reads; one set, shared
- `slice` — turns an accepted report into a contract-complete work item, per `slice/WORK-ITEM-CONTRACT.md`
- `shakedown` — builds and tests an external pull request in isolation when triage needs more than a read
- `core/TRACE.md` — the trace this skill appends to
