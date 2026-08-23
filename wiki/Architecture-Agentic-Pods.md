# Architecture: Agentic pods

This page describes what happens between the moment [Raise](Skill-Raise) publishes a work item and the moment an agent, or a person, actually implements it. The process is designed so that someone always checks the item makes sense before implementation begins.

## The contract

Every work item that [Slice](Skill-Slice) produces follows [WORK-ITEM-CONTRACT.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md). The contract specifies a goal, the item's parent links, its context, its scope and file ownership — which is what allows multiple pods to work in parallel without contending over the same files — its non-goals, acceptance criteria that can be checked by a machine, the exact commands used to verify it, its constraints, an execution profile, a governance section where the PRD's risk tier requires one, and a block of commands for running it without a person present.

## The pickup protocol

This is the other half of the contract, and the part most backlog systems skip. An agent that picks up a work item does not implement it on first contact, no matter how complete the contract appears. It reviews the item first, checking it against its own contract, against the parent PRD, and against the current state of the codebase, and posts that review as a comment on the issue. The item then moves through a defined sequence of states:

```
raised → critiqued → clarified → ready → in-progress → done
              ↑____________|
```

Implementation begins only once the item reaches the `ready` state. A headless run follows the same two-phase sequence.

## Headless execution

The contract's run block generates the exact command for each supported tool: `claude -p`, `opencode run`, `codex exec`, `cursor-agent -p` (or Cursor's own multitask mode), and `copilot -p`. Each of these runs the review phase first and waits for answers to any open questions before it begins implementation.

## The delivery pipeline

The pickup protocol and the delivery itself run as three orchestrated stages, with a human gate between each pair — the workflow runtime allows no user input mid-run, so each gate is a separate run by design. On Claude Code, the stages are dynamic workflows shipped with the plugin: `assess-work-item` fans out three perspective-diverse critics, adversarially verifies their findings, and posts one consolidated critique; `deliver-work-item` refuses any item not at `ready`, plans in layers, implements as a single writer in an isolated worktree, verifies with a separate agent in a bounded fix loop, and raises either one pull request or a dependency-ordered stack; `shakedown-pr` builds, tests, and executes the pull request in a sandbox and submits a review that blocks on a red run. On OpenCode, the same stages run as fixed templates (`assess`, `deliver`, `shakedown`) through the deterministic runner. `scripts/pipeline.sh` launches any stage on either engine, headless or interactively.

A change too large to review as one pull request is raised as a stack: dependency-ordered, single-concern pull requests reviewed bottom-up and merged base-to-tip, following the `gh stack` tooling. The full rule is in [STACKING.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/deliver/STACKING.md).
