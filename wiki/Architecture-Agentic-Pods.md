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
