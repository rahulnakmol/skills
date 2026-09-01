# The run trace

A trace is the record a skill writes while it works: what it was given, what it decided, what evidence it saw, and how it ended. It is the fifth layer of the agent harness this repository builds on, and the one that makes the other layers auditable after the fact rather than only while a session is open.

Doctrine that every group may read. It defines the trace, the contract block each skill carries, and the replay protocol a later session uses to resume work it did not start.

## Why a trace, when a ledger already exists

`grit`'s gate ledger records whether the work met its acceptance criteria. It is a verdict. It does not record how the work reached that verdict — which files were read, which hypothesis was discarded, which command produced the number in the evidence line. When a session ends and another begins, the second session inherits the verdict and loses the reasoning, so it re-derives what the first one already established, and sometimes re-derives it differently.

A trace closes that gap. The ledger says the gate is met; the trace says how the work got there. The two are written by the same run, live in the same scope directory, and are read together.

## The trace is not a second state root

A trace lives beside the ledger it accompanies: `.grit/<scope>/TRACE.md`, in the same scope directory as that scope's `GATES.md` and dispatch state. A solo task that keeps its ledger at the repository root as `GATES.md` keeps its trace at `TRACE.md` alongside it.

This placement is deliberate and it is a constraint, not a convenience. A repository that accumulates a second, unrelated state directory has not gained an audit trail; it has gained two partial records that disagree. A skill that needs durable state uses the scope directory, or it does not have durable state.

## Anatomy of a trace

A trace is an append-only Markdown file. Each run appends one entry, newest last, and no run rewrites an earlier entry — a correction is a new entry that says what it corrects.

```
# Trace: <scope>

## 2026-09-01T14:22Z · tdd · red-green
INPUT: work item AUTH-14, acceptance criterion 3
DECIDED: seam at the session store interface, not the HTTP handler
EVIDENCE: test/session-store.test.mjs:41 red (exit=1, "expected 401"); green after src/session-store.ts:88
OPEN: refresh-token path untested, criterion 4 not started
```

Five fields, each one line where it fits on one. INPUT is what the run received. DECIDED is the choice a later reader would otherwise have to reconstruct, and it is recorded whether or not it turned out well. EVIDENCE is what was actually observed — a command's exit status, a file and line, a measured number — never a restatement of the intent. OPEN is what remains, and it is the field the replay protocol reads first. The heading carries a UTC timestamp, the skill that wrote the entry, and that skill's declared trace kind.

An entry that records a discarded approach is worth more than one that records only the successful path, because the discarded approach is what a later session would otherwise try again.

## The contract block

Every skill built on this spine carries one `## Contract` section, a fenced YAML block of four keys, placed directly under the skill's title:

```yaml
contract:
  invocation: model      # model | user — the axis, never both
  thesis: evidence       # gate | evidence | scaffold
  verbs: [read, write-repo]
  trace: red-green
```

`invocation` restates the axis in a form the harness can check against the skill's title line. `thesis` names which limb of the repository's promotion test the skill satisfies: `gate` sharpens a human decision at a gate, `evidence` makes delegated work verifiable by leaving an audit artifact, and `scaffold` is what the first two require. `verbs` is the skill's permission surface, drawn from a closed set: `read` reads the repository and its history, `write-repo` writes files in the working tree, `write-tracker` writes to an issue tracker, and `publish` sends anything outward — a comment, a page, a message. A skill declares the narrowest set that lets it work. `trace` is the kind of entry the skill appends, and it is the heading a reader scans for.

The block is short on purpose. It is loaded on every invocation, so each key has to earn its tokens, and four do.

## The replay protocol

A session resuming work it did not start reads the trace before it reads anything else, in this order:

1. Read the last entry's OPEN field. That is the work remaining, stated by the run that stopped.
2. Read the ledger in the same scope directory. That is what done means here, and it was written before implementation began.
3. Scan the DECIDED lines of earlier entries. These are the choices already made, and re-opening one without cause is how a resumed session loses the ground the first one gained.
4. Append a new entry before acting, with INPUT recording that this is a resumption and of which entry.

A session that cannot find a trace states that plainly and starts one. It does not infer the missing history from the diff, because a diff shows what changed and never shows what was tried and abandoned.

## What a trace is not

It is not a transcript. A trace that records every tool call is a log, and a log is not read. Each entry holds the decisions and evidence a later reader needs, and nothing that reader could recover from the diff, the ledger, or the tracker.

It is not a summary written from memory at the end of a run. An entry is appended when the decision is made, while the evidence is in front of the agent. A trace assembled at the close of a session records what the agent remembers, which is the failure the trace exists to prevent.
