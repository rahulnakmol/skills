---
layout: skill
name: brief
title: "Brief: The Rules Agents Actually Read"
description: "Brief breaks a team's working agreement into always-loaded rules, a glossary, and references, then places each in the file the tool an agent runs actually reads."
group: productivity
invocation: user-invoked
scenario: "Keeping QuenServe's own CLAUDE.md and AGENTS.md current for its engineering team"
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
    who: 'What your organization’s agents are instructed to do is your responsibility, and today that instruction lives in chat history and personal settings.'
    value: 'The working agreement becomes a reviewed file with a named owner and a review date — kept the way any other policy the organization stands behind is kept.'
---

## What it does

Brief keeps a team's working agreement from existing only in chat history and one person's memory. It is the productivity group's one shipped skill: it turns a repeated correction into a rule, and places that rule in the file the tool an agent actually runs reads, not the file that happens to be open. "A rule that describes what an agent already does by default spends attention to change nothing" — RULES.md's own test for whether a line belongs in the file at all.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Inventory</span><span class="step-text">List the surfaces the team uses and read every rule file that already exists before writing anything new.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Collect the raw material</span><span class="step-text">The corrections people repeat and the mistakes that have cost rework — labeled a preference if no incident backs it.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Split into three layers</span><span class="step-text">Definitions state what a word means, rules state what to do, references hold the deep material.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Write each rule</span><span class="step-text">A trigger that says when it applies, an instruction, and an observable result a reader can check.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Place each layer</span><span class="step-text">One file is canonical; every other surface points at it instead of holding a second copy.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Verify, then name an owner</span><span class="step-text">Run a real task and check whether the rule fired; record a review date, not just a starting one.</span></div>
</div>

<ul class="benefits">
  <li>A rule fires the same way on every run, because a trigger and an observable result replace a preference nobody can check.</li>
  <li>No two files silently disagree, because one canonical copy exists and every other surface points at it instead of holding a second.</li>
  <li>A line that only restates what a config file, a script name, or a directory layout already says gets dropped, so the environment stays the one source of truth.</li>
  <li>An always-loaded file stops growing without limit: once it passes roughly 200 lines, conditional material moves behind a pointer instead of piling up front.</li>
</ul>

- [`RULES.md`](https://github.com/tqnonline/skills/blob/main/skills/productivity/brief/RULES.md) covers the anatomy of a rule that fires — a trigger, an instruction, an observable result — and why a positive instruction outperforms a prohibition except at a genuine hard boundary.
- [`SURFACES.md`](https://github.com/tqnonline/skills/blob/main/skills/productivity/brief/SURFACES.md) covers where each of seven tools reads its rules, which file should be canonical, and what to do when a surface has no repository file at all.

Brief reads each one only when the moment calls for it: collecting raw material and testing a rule read RULES.md, deciding where a layer lives reads SURFACES.md. Its nearest sibling is `constitution`, the pm group's equivalent one level up: what a practice stands for, where brief covers how its agents behave. SKILL.md names `ask-pm` and `ask-fde` too, but as the clearest worked example of trigger wording, not as routers that currently point here.

## When to reach for it

Type `/brief` in Claude Code, or name the skill directly in a session. Brief is user-invoked, so nothing reaches for it on its own: a person decides the team's agents need a rule written down.

You reach for brief in four moments. Your team is adopting agents with no written rules, or its rules are scattered across chats and personal settings. An agent keeps violating a convention the team assumed was already understood, or the same correction is being pasted into prompt after prompt. Your team has added a second agent tool, and its rules have not caught up with the first. An existing `CLAUDE.md` or `AGENTS.md` has grown long enough that nobody can say which lines still do anything.

Brief is not the only skill that touches how a team works. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need a practice's principles and prioritization framework, one level above how its agents behave | [`constitution`]({{ '/constitution/' | relative_url }}) |
| You are not sure which skill fits at all, on the engineering side | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |
| You are not sure which skill fits at all, on the product side | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

Install once, and every tool below reaches the same brief skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want brief can skip the rest of the catalog with `./scripts/link-skills.sh --skill brief`, which links just this skill into the default buckets without pulling in the rest of the productivity group. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command</span></div>
<div class="tool-group-body">
<p>Brief is user-invoked: type <code>/brief</code>, or name it directly in a session — nothing routes to it automatically. Claude Code reads <code>CLAUDE.md</code> at the repository root, plus a <code>CLAUDE.md</code> in a subdirectory when work happens there, so a rule written here is the one most teams make canonical, since it sits in the repository and is reviewed like code.</p>
<div class="prompt-card">QuenServe's own engineering repo already has CLAUDE.md and AGENTS.md. Before adding anything, inventory both files, tell me which layer each line belongs to — definition, rule, or reference — and flag any rule with no observable result. Do not rewrite either file yet.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Brief returns the inventory and the layer classification first, and waits for you before writing a single new line.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command yet, plain ask</span></div>
<div class="tool-group-body">
<p>No OpenCode command exists for brief yet. OpenCode reads <code>AGENTS.md</code> at the project root, plus a global <code>AGENTS.md</code> in its own configuration directory, so the conversation still produces a written file — <code>AGENTS.md</code> itself, or the file it points at — rather than a command's return value.</p>
<div class="prompt-card">Read QuenServe's AGENTS.md and CLAUDE.md. I want AGENTS.md to keep pointing at CLAUDE.md rather than repeating its rules — tell me if either file has grown past the point a rule can still be trusted to fire, and why.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode answers in the same conversation, reading both files as context since no installed command exists to parse them for it.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply brief as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Cursor's own rule files live in <code>.cursor/rules/</code>, each markable as always-apply or scoped to a file pattern — the one surface among the five built to scope a rule to part of a repository natively. Codex reads the same <code>AGENTS.md</code> convention as OpenCode, plus the generated sidecar <code>agents/openai.yaml</code>, so it sees brief's name and description the way the other four tools do. GitHub Copilot reads <code>.github/copilot-instructions.md</code> as its pointer to the canonical brief, plus scoped instruction files under <code>.github/instructions/</code> for conventions limited to part of a repository.</p>
<div class="prompt-card">QuenServe's engineering repo already has CLAUDE.md and AGENTS.md. Read both, tell me if either has grown past the point where a rule can still be trusted to fire, and flag any line that only restates something a script name or a directory layout already makes obvious.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three answer in the same conversation, reading both files as context since no installed command exists here to parse them for it. Cursor alone can write a scoped rule file directly when a convention applies to only part of the repository, since path-scoping is native to that surface.</p>
</div>
</div>

A good ask includes:

- Which surfaces the team actually uses today, and where their existing rule files already live.
- The corrections people repeat and the mistakes that have cost rework — raw material, not polished rules yet.
- Which file should be canonical, or a request for brief's own recommendation given how the team works.
- An owner's name and a review date, so the file does not go stale without anyone noticing.

## A working example

This example follows [QuenServe]({{ '/example/' | relative_url }})'s own engineering practice, where a CLAUDE.md and an AGENTS.md govern the offline-sync epic's codebase. You type:

<pre><code>QuenServe's own engineering repo already has CLAUDE.md and AGENTS.md. Before adding anything, inventory both files, tell me which layer each line belongs to — definition, rule, or reference — and flag any rule with no observable result. Do not rewrite either file yet.</code></pre>

Brief's first step is always inventory, so it reads both files before proposing anything. QuenServe's `CLAUDE.md` runs to about 60 lines and `AGENTS.md` to about 20 — both well under the roughly 200-line point where SKILL.md's own stop condition says conditional material should move behind a pointer, so neither file has yet earned that treatment.

QuenServe's `AGENTS.md` already follows the shape `SURFACES.md` prescribes, without anyone having run a brief session on it before. Its "Repository rules" section, quoted here in full:

<pre><code>See CLAUDE.md for the offline-sync module's conventions: the offline-store
schema, the sync client's retry policy, and the ingestion endpoint's
idempotency contract. Every rule there applies regardless of which tool
you are.</code></pre>

states one rule and points at the file that already holds the detail, rather than repeating it. That is exactly the pattern `SURFACES.md` names as this very repository's own worked example: `CLAUDE.md` holds the invariants Claude Code reads, and `AGENTS.md` states the shared voice rule once, pointing back instead of duplicating it. QuenServe's team reached the same shape on its own, so nothing here needs rewriting.

Classifying `CLAUDE.md`'s own lines against `RULES.md`'s three-part anatomy turns up a mix. "Before merging a change to the offline store, run the sync-fidelity suite against it" already carries a trigger — before merging a change to the offline store — and an observable result, the suite passing or failing. "Every inspection record carries a client-generated UUID" is a standing invariant with a result anyone can check, but no stated trigger, because `RULES.md` does not require one for a constraint that holds at all times.

One line is a genuine finding. The conflict-resolution rule is a hard boundary, correctly written as a prohibition — "Never resolve a sync conflict by silently discarding either inspector's answer" — which `RULES.md` allows for a real boundary, since a discarded answer cannot be recovered once it is gone. But `RULES.md` also asks for "a positive twin that says what to do instead" beside a prohibition like that one, and the line after it names the story it traces to, E1-F2-S2, rather than stating the paired instruction. That gap is worth naming to QuenServe's team, not silently fixed, since only the team can decide the wording it wants. E1-F2-S2 is one of two conflict-resolution stories, alongside E1-F2-S1.

The session stops here, at inventory and classification, because you asked for nothing rewritten yet. Placing a new rule, writing its trigger and result, and verifying it against a real task are the steps a follow-up session would take next.

## What good looks like

The same anatomy would govern any rule QuenServe's team writes down, once a correction gets repeated enough to earn a place in the file rather than another retyped prompt.

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A rule that fires reliably</div>
<pre><code><span class="tok-ok">TRIGGER:</span> before merging a change to the offline store
<span class="tok-ok">DO:</span> run the sync-fidelity suite against it
<span class="tok-ok">RESULT:</span> the suite passed on the merged commit</code></pre>
<div class="compare-card-note">RULES.md calls a trigger, an instruction, and a checkable result the three parts a rule needs. All three are present here, and the result is something a reader can actually check.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">RULE:</span> write clean code
<span class="tok-comment">No trigger, no observable result</span>
<span class="tok-comment">&larr; RULES.md names this exact line as one that changes nothing.</span></code></pre>
<div class="compare-card-note">An untriggered rule is an aspiration. Give it a trigger and a checkable result, or leave it out of the file.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if two rules in the brief contradict each other?</summary>
<div class="qa-body">

SKILL.md's stop conditions treat this directly: resolve the contradiction with the team before either rule is written, rather than shipping both. An agent handed two contradictory rules will follow whichever one sits nearer in context, and which one that is changes from run to run.

</div>
</details>

<details class="qa">
<summary>What if a rule just restates what a config file or a directory layout already says?</summary>
<div class="qa-body">

Drop it. SKILL.md's stop conditions and RULES.md agree on this: the environment is a source of truth too, and a rule that restates a script name, a directory layout, or a linter's own configuration is a copy that can go stale in a way the original cannot.

</div>
</details>

<details class="qa">
<summary>Does a router send requests here automatically?</summary>
<div class="qa-body">

Not yet. Brief is user-invoked, and neither `ask-fde`'s nor `ask-pm`'s routing map names it today. SKILL.md cites both routers instead as the clearest worked example of how to write a trigger, a different kind of reference than a routing entry. A person currently has to recognize the need and name brief directly.

</div>
</details>

<details class="qa">
<summary>Is there a script or command that runs brief itself?</summary>
<div class="qa-body">

No. Brief has no script to run; its output is a written file — a team's own `CLAUDE.md` or `AGENTS.md` — not a command's return value. No adapter in this repository ships a `/brief`-style command for any tool beyond Claude Code's own slash-command convention.

</div>
</details>

<details class="qa">
<summary>What happens once an always-loaded file grows too long?</summary>
<div class="qa-body">

SKILL.md's stop conditions set the point at roughly 200 lines: once an always-loaded file passes that, its conditional material moves behind a pointer before anything more gets added, rather than growing further first and reorganizing later.

</div>
</details>

<details class="qa">
<summary>Can a rule be written as a flat prohibition?</summary>
<div class="qa-body">

Yes, for a genuine hard boundary — around production data, credentials, or an irreversible action — where the boundary matters more than the phrasing. RULES.md still asks for a positive twin beside it, stating what to do instead, so the rule leaves the agent with an action rather than only a warning.

</div>
</details>

## It's working if

- A rule can be pointed to as evidence that it fired, not only reread and trusted.
- Every surface a team actually uses loads a file that either is the canonical brief or points straight at it — never a second copy.
- A trigger that keeps missing gets sharpened, not wrapped in a longer explanation.
- A removal is recorded as deliberately as an addition, with the owner and the review date beside it.

If the same correction keeps getting pasted into a fresh prompt, the discipline has failed even though a file with that exact sentence already exists somewhere in the repository.

## Where it fits

**Brief is a standalone authoring skill that produces the file every other skill and every other tool then reads, not a step inside either pipeline.**

Its nearest neighbor is `constitution`, the pm group's equivalent one level up: constitution states what a practice stands for and how it prioritizes; brief states how the agents working inside that practice behave, day to day.

If none of this settles which skill fits, `ask-fde` and `ask-pm` route between the two pipelines' own skills. Neither names brief yet, so a request for "the rules our agents should follow" still depends on a person recognizing brief by name, not on a router sending it here.
