---
name: brief
description: User-invoked authoring of the rules, definitions, and boundaries a team's AI agents read. Breaks a working agreement into always-loaded rules, a shared glossary, and on-demand references, then places each part in the file the tool actually loads — Claude Code, Claude Desktop, Cowork, OpenCode, Codex, Cursor, and Copilot. Use to write or revise CLAUDE.md or AGENTS.md, to set team-wide agent rules, or when agents keep ignoring an instruction the team believes it has already given.
---

# Brief (user-invoked)

Write the brief a team's agents read: what the words mean, what the rules are, and where the detail lives.

## Contract

```yaml
contract:
  invocation: user
  thesis: scaffold
  verbs: [read, write-repo]
  scope: owns
  trace: rule
```

## When to invoke

- A team is adopting agents and has no written rules, or has rules scattered across chats and personal settings
- Agents produce work that violates a convention the team assumed was understood
- The same instruction is being pasted into prompt after prompt
- Rules exist for one tool and the team has added another — Claude Code plus Cowork, or Claude Code plus OpenCode
- An existing `CLAUDE.md` or `AGENTS.md` has grown long enough that it is no longer being followed

## Procedure

1. Inventory. List the surfaces the team actually uses and the rule files that already exist (`SURFACES.md`). Read them before writing anything: most teams already have rules in two places that disagree, and reconciling them is the first deliverable.
2. Collect the raw material. Gather the corrections people repeat, the conventions only one person knows, and the mistakes that have cost rework. A rule with no incident behind it is a preference; label it as one or leave it out.
3. Break the material into three layers. **Definitions** are the team's terms, stated once so an agent and a new hire read them the same way. **Rules** are the behaviors expected on every task. **References** are the deep material — a runbook, a style guide, a checklist — that only some tasks need.
4. Write each rule per `RULES.md`: a trigger that says when it applies, a statement of what to do rather than what to avoid, and an observable result that shows whether it was followed.
5. Place each layer per `SURFACES.md`. One file is canonical; every other surface points at it rather than holding a second copy. Detail behind a pointer costs nothing until it is needed; detail in an always-loaded file costs on every turn of every session.
6. Verify by running the work, not by rereading the file. Give each surface a real task the new rule governs and check whether the rule fired. A rule you cannot observe firing is a wish, and the fix is nearly always sharper trigger wording rather than a longer explanation.
7. Name an owner and a review date. Record removals as deliberately as additions: rules accumulate, and a file half full of dead rules teaches agents that rules are optional.

## Stop conditions

- Two rules contradict each other → resolve the contradiction with the team before either is written; an agent given both will follow the nearer one
- A rule restates what a configuration file, a script name, or a directory layout already says → drop it and let the environment be the source of truth, where it cannot go stale
- A rule has no observable result → rewrite it as a checkable one or leave it out
- An always-loaded file passes roughly 200 lines → move its conditional material behind pointers before adding anything more
- The team has not agreed the rule → write it down as a proposal, not as a rule

## Output contract

```yaml
canonical: <path to the one file holding the brief>
surfaces:
  - tool: <surface name as listed in SURFACES.md>
    file: <the file this tool loads>
    role: canonical|pointer|not-applicable
layers: { definitions: <n>, rules: <n>, references: <n> }
verified: [<surface where a real task confirmed the rule fired>]
owner: "<name>"
review: <YYYY-MM-DD>
```

## Sibling skills

- `constitution` — the pm group's equivalent one level up: what a practice stands for, where this skill covers how its agents work
- `ask-pm`, `ask-fde` — routers whose own descriptions are the clearest worked example of trigger wording
