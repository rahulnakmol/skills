---
layout: skill
name: brief
title: "Brief: The Rules Agents Actually Read"
description: "Brief breaks a team's working agreement into always-loaded rules, a glossary, and references, then places each in the file the tool an agent runs actually reads."
group: productivity
invocation: user-invoked
lens:
  novice:
    who: 'Your agent keeps making the same mistake, and you know you told it not to — in a chat last week, or a prompt you can no longer find.'
    value: 'Brief moves that instruction into a file the tool loads on every session, so you stop repeating yourself in chat and start pointing at a rule that already exists.'
  practitioner:
    who: 'You own the CLAUDE.md or AGENTS.md your team’s agents load, and it has grown long enough that nobody is sure which lines still do anything.'
    value: 'You split it into definitions, rules, and references, give every rule a trigger and a checkable result, and cut what a real task shows does not fire.'
  leader:
    who: 'Your team has adopted more than one agent tool, and each one has picked up its own half-remembered version of the rules.'
    value: 'One canonical file holds the working agreement; every other surface points at it, so a rule written once governs every tool your agents run on.'
  csuite:
    who: 'You are accountable for what your organization’s agents are instructed to do, and today that instruction lives in chat history and personal settings.'
    value: 'The working agreement becomes a reviewed file with a named owner and a review date — kept the way any other policy the organization stands behind is kept.'
---

## What it does

Brief writes the rules, definitions, and boundaries a team's AI agents read, and places each part in the file the tool in use actually loads. It splits a working agreement into three layers — definitions the team's words mean, rules stated as a trigger plus an observable result, and references only some tasks need — and keeps one canonical copy, with every other surface pointing at it rather than holding a second. It covers seven surfaces: Claude Code, Claude Desktop, Cowork, OpenCode, Codex, Cursor, and GitHub Copilot, each with its own file and its own way of loading rules. A rule is verified by running a real task against it and checking whether it fired, never by rereading the document.

## How to call it

In Claude Code, type `/brief`. No OpenCode command exists for brief yet, and no other surface has a slash-command adapter for it either; brief is an authoring skill, not a script, so invoking it opens a conversation that produces the written rules themselves — content for the team's own `CLAUDE.md` or `AGENTS.md` — rather than a command's return value.

Readers who do not have the skill pack installed yet can add it first. The second line installs the tool adapters:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A rule that fires reliably</div>
<pre><code><span class="tok-ok">TRIGGER:</span> Before opening a pull request
<span class="tok-ok">DO:</span> Add a changelog entry naming what changed and why
<span class="tok-ok">RESULT:</span> The changelog entry exists and names the PR</code></pre>
<div class="compare-card-note">All three parts are present, and the result is something a reader can actually check.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">RULE:</span> We value clean code
<span class="tok-comment">No trigger, no observable result</span>
<span class="tok-comment">&larr; targets nothing in particular, so nothing in particular happens.</span></code></pre>
<div class="compare-card-note">An untriggered rule is an aspiration. Give it a trigger and a checkable result, or leave it out of the file.</div>
</div>
</div>

## In practice

Brief has no script to run; its output is a written file, not a command's return value. What follows is the shape its own output contract requires, instantiated against this repository's real files — `CLAUDE.md` and `AGENTS.md` — rather than a fabricated terminal run:

```yaml
canonical: CLAUDE.md
surfaces:
  - tool: Claude Code
    file: CLAUDE.md
    role: canonical
  - tool: OpenCode
    file: AGENTS.md
    role: pointer
  - tool: Codex
    file: AGENTS.md
    role: pointer
  - tool: Cursor
    file: <none present in this repository>
    role: not-applicable
  - tool: GitHub Copilot
    file: <none present in this repository>
    role: not-applicable
layers: { definitions: <n>, rules: <n>, references: <n> }
verified: [<surface where a real task confirmed the rule fired>]
owner: "<name>"
review: <YYYY-MM-DD>
```

`CLAUDE.md` and `AGENTS.md` are this repository's own worked example: `CLAUDE.md` holds the invariants Claude Code reads, `AGENTS.md` states the same voice rule for every other tool and points back at `CLAUDE.md` rather than restating its detail, and neither file duplicates the other. This repository has no `.cursor/rules/` directory and no `.github/copilot-instructions.md`, so those two surfaces are marked not-applicable rather than invented. The `layers`, `verified`, `owner`, and `review` fields stay as the contract's own placeholders here, because no brief session has filled them in for this repository yet.

## How it works

1. **Inventory first.** List the surfaces the team actually uses and read every rule file that already exists before writing anything new. See [`SURFACES.md`](https://github.com/tqnonline/skills/blob/main/skills/productivity/brief/SURFACES.md).
2. **Collect the raw material.** Gather the corrections people repeat and the mistakes that have cost rework; label a preference as a preference rather than a rule. See [`SKILL.md`](https://github.com/tqnonline/skills/blob/main/skills/productivity/brief/SKILL.md).
3. **Split into three layers.** Definitions state what a word means, rules state what to do, references hold the deep material only some tasks need. See [`RULES.md`](https://github.com/tqnonline/skills/blob/main/skills/productivity/brief/RULES.md).
4. **Write each rule with a trigger, an instruction, and an observable result.** State the target behavior, not the banned one, except for a genuine hard boundary. See [`RULES.md`](https://github.com/tqnonline/skills/blob/main/skills/productivity/brief/RULES.md).
5. **Place each layer where the tool loads it.** One file is canonical; every other surface points at it instead of holding a second copy. See [`SURFACES.md`](https://github.com/tqnonline/skills/blob/main/skills/productivity/brief/SURFACES.md).
6. **Verify by running work, then name an owner and a review date.** A rule that does not observably fire on a real task gets a sharper trigger, not a longer explanation. See [`RULES.md`](https://github.com/tqnonline/skills/blob/main/skills/productivity/brief/RULES.md).
