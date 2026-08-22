# Skill: Raise

**Group:** developer · **Invocation:** model-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/raise/SKILL.md)

Raise publishes a sliced backlog to the tracker a project has configured, whether that is GitHub, using native sub-issues and labels or Projects v2, or Linear. It applies the `raised` label and a stable idempotency key, so a later run updates an existing item rather than creating a duplicate.

## When to invoke

- [Slice](Skill-Slice) has produced work items that satisfy the contract.
- The user has confirmed which tracker is the publishing target.

## How it fits

Raise closes out the Backlog stage of the [role journey](Architecture-Role-Journey). What it publishes is not an ordinary issue. It is a work item that already carries the full [WORK-ITEM-CONTRACT.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md), so the pickup protocol — `raised`, `critiqued`, `clarified`, `ready`, `in-progress`, `done` — can begin the moment anyone, a person or an agent, opens the issue.

## Key references

- [trackers/github.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/raise/trackers/github.md) covers sub-issues with labels, or Projects v2, detected automatically per project.
- [trackers/linear.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/raise/trackers/linear.md) covers Linear projects and parent issues through its MCP server or API.

## Sibling skills

Raise consumes a backlog from [Slice](Skill-Slice). The items it publishes are picked up by [SDLC](Skill-SDLC), or by a headless pod, according to the execution profile named in the contract.
