---
name: handoff
description: User-invoked compaction of an in-flight run into a handoff document a cold reader can pick up. Use when a session ends with work unfinished, when the context window is nearly full, or when work passes to another agent or person who was not present for it. Where the tool keeps session history across threads, record the thread link in the document; the document still stands alone for a cold reader.
---

# Handoff (user-invoked)

Compact the run into a document another agent or person can pick up with no prior context.

## Contract

```yaml
contract:
  invocation: user
  thesis: scaffold
  verbs: [read, write-repo]
  scope: owns
  trace: handoff
```

## When to invoke

- A session is ending with work unfinished and someone else will continue it
- The context window is close to full, so the run has to restart from a written record
- Work moves from one agent to another, or from an agent to a person
- A run pauses for a day or more, long enough that the reasoning will not be recalled
- The user asks for a handoff, a status document, or a resumption note

## Procedure

1. Read the trace at `.grit/<scope>/TRACE.md` first, then the gate ledger beside it in the same scope directory. The handoff is a projection of that record, not a recollection of the session. A summary written from memory at the end of a run captures what the agent remembers, which is the exact failure the trace exists to prevent.
2. Say so plainly when no trace exists. Reconstruct what the ledger, the diff, and the tracker support, and label the document as reconstructed. A diff shows what changed and never shows what was tried and abandoned.
3. Write the goal in one sentence, taken from the ledger rather than the conversation. The ledger was written before implementation began, so it states what done means here.
4. Write the current state: which gates are met, which are unmet, and what evidence was last recorded. Cite the command and its exit status, or the file and line, as the trace recorded it.
5. Collect every DECIDED line into a decisions section, each with the reason it carried. A decision carried forward without its reason gets reopened, and the next session loses the ground the first one gained.
6. Give what was tried and abandoned its own section. This is the highest-value part of the document, because a failed approach leaves no mark in the diff, and a reader who does not find it here will spend a session rediscovering it.
7. List what remains open, drawn from the OPEN field of the last entry and from every unmet gate, ordered so the next action comes first.
8. List the exact files and commands: repository-relative paths, and each command with the arguments it was actually run with. A reader who has to guess a path has not been handed the work.
9. Strip the session shorthand. Remove "as discussed", remove references to earlier turns, and expand any name coined mid-session into what it denotes. Read the draft as someone who has never seen the conversation would read it.
10. Append the trace entry: the scope handed off, the entries the projection covers, and what the handoff could not resolve.
11. Write the document beside the trace in the scope directory and tell the user its path.

## Stop conditions

- No trace and no ledger exist → say so, reconstruct from the diff and the tracker, and mark every unverified line as unverified
- The last trace entry predates the newest commit → report the gap; the run stopped recording before it stopped working, and the handoff cannot cover the difference
- A decision appears with no recorded reason → carry it forward as a decision of unknown basis rather than inventing one
- The draft cannot be understood without the session that produced it → rewrite it; a handoff that needs its author is not a handoff
- The run has produced no evidence yet → write the goal and current state only, and state that the remaining sections are empty

## Output contract

```yaml
scope: <scope directory this handoff covers>
document: .grit/<scope>/HANDOFF.md
source:
  trace: .grit/<scope>/TRACE.md
  entries: <count projected, first and last timestamps>
  ledger: <gates met> / <gates total>
goal: <one sentence, from the ledger>
state: <what works now, with the evidence line that shows it>
decisions:
  - <decision> — <reason it carried>
abandoned:
  - <approach tried> — <what ruled it out>
open:
  - <remaining work, next action first>
artifacts:
  files: [<repository-relative path>]
  commands: [<command as run>]
reconstructed: <true when no trace existed, otherwise false>
```

## Sibling skills

- `questionnaire` — when the block is a decision only another person can settle, not a missing record
- `grit` — keeps the gate ledger this document reads for its goal and current state
- `brief` — durable rules a team's agents read, as opposed to the state of one run
- `core/TRACE.md` — the record this document projects, and the spec for the entry it appends
