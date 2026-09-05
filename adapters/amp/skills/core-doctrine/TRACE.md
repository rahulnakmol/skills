# The run trace

A trace is the record a skill writes while it works: what it was given, what it decided, what evidence it saw, and how it ended. It is the fifth layer of the agent harness this repository builds on, and the one that makes the other layers auditable after the fact rather than only while a session is open.

Doctrine that every group may read. It defines the trace, the contract block each skill carries, and the replay protocol a later session uses to resume work it did not start.

## Why a trace, when a ledger already exists

`grit`'s gate ledger records whether the work met its acceptance criteria. It is a verdict. It does not record how the work reached that verdict — which files were read, which hypothesis was discarded, which command produced the number in the evidence line. When a session ends and another begins, the second session inherits the verdict and loses the reasoning, so it re-derives what the first one already established, and sometimes re-derives it differently.

A trace closes that gap. The ledger says the gate is met; the trace says how the work got there. The two are written by the same run, live in the same scope directory, and are read together.

## The trace is not a second state root

A trace lives with the artifacts of the scope it belongs to. One rule, two shapes, because the two groups keep their records in different places.

Software delivery keeps its trace at `.grit/<scope>/TRACE.md`, in the same scope directory as that scope's `GATES.md` and dispatch state. A solo task that keeps its ledger at the repository root as `GATES.md` keeps its trace at `TRACE.md` alongside it.

An initiative keeps its trace at `specs/{prefix}-trace.md`, beside the analysis, the case, and the registers that carry the same prefix. The pm group's system of record is the initiative repository's `specs/` tree, and it has no gate ledger to sit beside: its gates are human sign-offs rather than runnable checks. Putting an initiative's trace in a hidden directory next to `specs/` would create exactly the second state root this section forbids, and it would be the less-read of the two, because the sponsor opens `specs/`.

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

Every skill built on this spine carries one `## Contract` section, a fenced YAML block of five keys, placed directly under the skill's title:

```yaml
contract:
  invocation: model      # model | user — the axis, never both
  thesis: evidence       # gate | evidence | scaffold
  verbs: [read, write-repo]
  scope: owns            # owns | guest
  trace: red-green       # a kind, or none
```

`invocation` restates the axis in a form the harness can check against the skill's title line. `thesis` names which limb of the repository's promotion test the skill satisfies: `gate` sharpens a human decision at a gate, `evidence` makes delegated work verifiable by leaving an audit artifact, and `scaffold` is what the first two require.

`verbs` is the skill's permission surface, drawn from a closed set. `read` reads the repository and its history. `write-repo` writes files in the working tree. `write-tracker` writes to an issue tracker. `publish` sends anything outward — a comment, a page, a message. `write-host` writes outside version control, into a user's home directory or a tool's own settings. `execute` runs commands the skill did not author. A skill declares the narrowest set that lets it work.

The last two exist because the first four cannot express the two largest capabilities in the catalog, and a permission surface that cannot name its biggest exposure is decorative.

`write-host` is not a stronger `write-repo`; it is a different kind of write. A file in the working tree is reviewed in a pull request and undone by a revert. A file in a home directory is neither. `grit` keeps its approval store at `~/.grit/approved` and its checker refuses to run when that path resolves inside the repository, because a pull request that edits files in the repository must not be able to grant itself execution rights.

`execute` means the command arrives as data rather than being written by the skill's author. `grit` runs the CHECK line a ledger supplies; the skill did not write that command and cannot know it in advance. A skill that invokes fixed project tooling — a test runner, a build, a generator — is not executing in this sense, and `press` spawning a browser with arguments its own script wrote is not either. Kept that narrow, the verb marks the one place where approval is doing real work; widened to mean "runs anything", it would mark almost every skill and discriminate nothing. Approval is consent to run one reviewed command, not a sandbox: a check that runs holds the ambient access of whoever ran it.

`scope` says whether the run belongs to this skill. A skill that `owns` a scope is invoked to carry a piece of work end to end, can be interrupted, and writes its own trace into its scope directory. A `guest` runs inside a scope another skill owns — a router, a lookup, a sub-step — and reports its entry for the owning session to record rather than writing one itself. The distinction is not cosmetic: a guest holding only `read` cannot write anything, so without it a contract can declare a trace the skill has no way to produce.

`trace` is the kind of entry the run contributes, or `none`.

## Charter skills and their adapters

Some skills are charters: their procedure names an adapter and defers the execution detail to it, because tool-native bodies live under `adapters/` rather than being restated in every skill. That raises a fair objection — a contract on the charter appears to declare verbs for work the adapter performs, which a reader of the `SKILL.md` alone cannot check.

The objection dissolves once the adapter is read. Every agent adapter carries a `permission` block naming what it may read, edit, and run, and that block is enforced by the tool rather than merely described. It is a far narrower statement than the contract's verbs: a security adapter may deny every edit except two report directories, deny every command except a named list of scanners, and deny access outside the working directory entirely.

So the two are not rivals, and the contract does not move. The skill's verbs are the union of what the skill may do across every tool that runs it; the adapter's permission block is one tool's tightening of that union. A reader who wants the precise surface opens the adapter the procedure names.

The relationship is checked in one direction only, because only one direction is dangerous. **No adapter may grant a capability its skill's contract does not declare.** An adapter permitting writes outside the working directory under a skill that never declared `write-host` is an undeclared capability, and the contract has become a description of something other than what runs. The reverse — an adapter narrower than the contract — is a deliberate per-tool tightening and is correct, so flagging it would punish the safest adapters in the catalog.

## When a trace is warranted, and when it is not

`none` is a claim, not an exemption. It says the run's decisions are recoverable from the artifact the skill's own `## Output contract` names, and it is dishonest wherever that artifact does not in fact carry them.

The test is not whether a skill writes a document. It is whether the discard fits inside that document without deforming it.

Where the artifact's form structurally excludes what was rejected, a trace is warranted. An epic manifest lists the epics that passed. A product constitution lists the principles that survived. A grill round cannot contain the hypothesis it rejected. No amount of care in the document closes that gap, because the shape of the document is what excludes them.

Where the discard is a handful of lines a reader would want beside the conclusion anyway, it belongs in the artifact and not in a second file. One record beats two that can disagree, which is the same argument this document makes against a second state root. A business case with no rejected options is not a business case: its discards are its content, and a trace beside it would restate them less visibly.

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
