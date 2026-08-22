# Architecture: Agentic pods

How a work item goes from [Raise](Skill-Raise) publishing it to an agent — or a human — actually implementing it, without ever skipping the moment where someone checks the item makes sense first.

**The contract** — every work item [Slice](Skill-Slice) produces conforms to [WORK-ITEM-CONTRACT.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md): goal, parent links, context, scope and file ownership (what lets multiple pods work in parallel without write contention), non-goals, machine-checkable acceptance criteria, exact verification commands, constraints, an execution profile, a governance section when the PRD's risk tier warrants it, and a headless run block.

**The pickup protocol** — the other half of the contract, and the one most backlog systems skip. An agent picking up a work item never implements on first contact, no matter how complete the contract looks. It critiques first — checking the item against its own contract, the parent PRD, and the current codebase — and posts that critique as a comment on the issue. The state machine:

```
raised → critiqued → clarified → ready → in-progress → done
              ↑____________|
```

Implementation starts only at `ready`. Headless pods honor the identical two-phase shape.

**Headless execution** — the contract's run block generates the exact command per tool: `claude -p`, `opencode run`, `codex exec`, `cursor-agent -p` (or Cursor's own multitask mode), `copilot -p`. Every one of them runs the critique phase first and stops for answers before the implement phase begins.
