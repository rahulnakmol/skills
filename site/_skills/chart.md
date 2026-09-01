---
layout: skill
name: chart
title: "Chart — Decision Tickets for Oversized Initiatives"
description: "Chart turns an initiative too large for one pass into decision tickets on a tracker, resolved one at a time by a PM and an agent team."
group: pm
invocation: user-invoked
scenario: "Charting epic E1's remaining decision tickets before Commitment"
lens:
  novice:
    who: "You have inherited an initiative with no plan, just a folder of notes and a sponsor asking when it will be done."
    value: "Chart turns that into a tracker issue with a stated destination and a first pass of decisions to make, so you start from a plan instead of a blank page."
  practitioner:
    who: "You run initiatives that outlast any single agent session, and your plan currently lives half in your head and half in stale notes."
    value: "The chart survives the session that wrote it. Resolving a decision ticket is the same act as updating the plan, so nothing drifts out of sync with what you actually decided."
  leader:
    who: "You have several PMs running concurrent agent sessions against the same initiative, and you need to know what is actually claimed versus just sitting open."
    value: "Ready, blocked, claimed, and closed are readable straight off the tracker, so a sponsor's status question stops requiring anyone to write an update."
  csuite:
    who: "You fund transformation work whose scope is too large to plan in one sitting and want confidence the plan itself is disciplined."
    value: "More than roughly 25 open tickets at once is a stop condition, not a target — chart says the destination is too wide rather than quietly ballooning the plan."
---

## What it does

Chart is the pm group's planner for work no single agent session can hold. It turns an oversized initiative into a chart of decision tickets, one tracker issue with every open question filed underneath it as a child, then resolves those tickets one at a time until nothing is left to decide. Chart mode names the destination and sorts what it finds; advance mode claims a ready ticket and resolves it through whichever pm skill owns that kind of decision.

The chart is deliberately an index, not a store. Each decision lives in exactly one place — the ticket that resolved it — and the chart body carries only a one-line summary plus a link back to it. This matters because the chart is read at the start of every session working against it, so its length is a running cost paid on every turn.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Name the destination</span><span class="step-text">One or two sentences stating what has to exist for the effort to be over, the hat, and the gate it feeds.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">One breadth pass, not a deep one</span><span class="step-text">A single grill pass across the whole initiative surfaces the open decisions without answering any of them.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Sort into three buckets</span><span class="step-text">A precisely stated question becomes a ticket; a gestured-at one becomes a known unknown; anything past the destination is out of scope.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Type and route each ticket</span><span class="step-text">Evidence, option, alignment, or enablement decide who resolves it and whether it runs in parallel.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Advance one ticket per session</span><span class="step-text">Claim it, run the pre-gate blind-spot checklist, record the answer as a one-line index entry with a link.</span></div>
</div>

<ul class="benefits">
  <li>A sponsor's status question — what has been settled, what is being settled now — is answered by reading the tracker, not by asking anyone to write an update.</li>
  <li>Resolving a decision and updating the plan are the same act, so a chart cannot drift the way a document nobody updates does.</li>
  <li>Ready, blocked, claimed, and closed are readable straight off the tracker, so several PMs can run concurrent sessions without colliding on the same decision twice.</li>
  <li>More than roughly 25 open tickets is a stop condition, not a target — chart says the destination is too wide instead of quietly growing the plan to fit it.</li>
</ul>

`CHART.md` states plainly why the chart never restates a ticket's reasoning in its own body: "the chart is read at the start of every session, so its length is a running cost paid on every turn of every session. A chart that restates its tickets grows without bound and drifts from them."

- [`CHART.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/chart/CHART.md) covers the chart body's shape, the three places a question can sit, and where a chart lives when no tracker is configured.
- [`TICKETS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/chart/TICKETS.md) covers how a ticket is sized, the four types, and the claim protocol that keeps concurrent sessions from colliding.
- [`HATS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/HATS.md) and [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/GATES.md) fix the hat and the gate a chart's destination feeds.

## When to reach for it

Type `/chart` in Claude Code, or name the skill directly in a session. Chart is user-invoked, so nothing reaches for it on its own: a person decides that a plan is too large to hold in one pass.

You reach for chart in four moments. An initiative is too large or too uncertain for `discover` → `map` → `carve` to run in one pass. The work spans several teams, systems, or quarters, and the order of the decisions is not yet known. An agent team needs a shared plan that survives the end of any one session and tolerates concurrent work. A sponsor asks for status on work whose plan currently lives only in people's heads.

Chart is not the only skill that touches planning at scale. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| The initiative fits inside one linear pass — discover, map, carve | [`discover`]({{ '/discover/' | relative_url }}) |
| The chart's decisions are already settled and it is time to cut epics | [`carve`]({{ '/carve/' | relative_url }}) |
| A question cannot be settled by anyone in this chart at all | [`raid`]({{ '/raid/' | relative_url }}) |
| You only need the execution shape for one round, not a multi-session plan | [`arrange`]({{ '/arrange/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

Install once, and every tool below reaches the same chart skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want chart can skip the rest of the catalog with `./scripts/link-skills.sh --skill chart`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and enforces it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command</span></div>
<div class="tool-group-body">
<p>Chart is user-invoked: type <code>/chart</code>, or name it directly in a session. The three dynamic workflows this repository ships as plugin slash commands — <code>assess-work-item</code>, <code>deliver-work-item</code>, <code>shakedown-pr</code> — are built for the developer group's work-item pipeline; chart does not call on either, and reads its ticket state from whichever tracker the initiative already uses.</p>
<div class="prompt-card">Epic E1, offline inspection sync, is approved but still carries several open technical and product questions — which offline storage engine, how a sync conflict surfaces to a person, what sync status a manager sees. Run chart mode: name the destination, classify the hat, and give me a first pass of decision tickets on the tracker.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Claude Code returns the destination statement, the hat and gate it feeds, and creates the chart issue with its first-pass tickets filed underneath it.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command &mdash; catalog read</span></div>
<div class="tool-group-body">
<p>OpenCode's installed command layer wraps the developer group's tools; no command wraps chart or any pm skill. The agent reads the shared <code>.agents/skills/</code> catalog directly, the same route Cursor and Codex use, and applies chart's procedure when a request names an oversized initiative.</p>
<div class="prompt-card">Read skills/pm/chart/CHART.md and TICKETS.md, then chart epic E1's remaining decisions: which offline storage engine, how a sync conflict surfaces to a person, what sync status a manager sees — too many open questions for one pass. Name the destination, classify the hat, and file a first pass of decision tickets.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode states the destination and ticket list directly in its reply, since no command wraps the tracker calls.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply chart's procedure as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Cursor routes model choice through its own <code>auto</code> mode. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees chart's name and description the way the other four tools do. GitHub Copilot applies the same catalog through <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<div class="prompt-card">Following skills/pm/chart/CHART.md, chart mode for epic E1's remaining decisions: which offline storage engine, how a sync conflict surfaces to a person, what sync status a manager sees. Name the destination in one or two sentences, classify the hat, and sort the open questions into tickets.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three write the destination and the ticket list directly in their reply, since none has a command's output to parse it from.</p>
</div>
</div>

A good ask names the tracker the initiative already uses — GitHub, Linear, or Azure DevOps — since three operations differ by tracker: how a child issue is created, how blocking is expressed, and how the ready set is queried.

## A working example

Epic E1, offline inspection sync, belongs to [QuenServe]({{ '/example/' | relative_url }}), the field-inspection product every scenario on this site returns to. You type the prompt above about epic E1's remaining decisions. Chart mode runs first, and it decides nothing beyond naming the shape of the work:

<pre><code>chart: specs/chart/e1-offline-sync-chart.md
destination: "Decide every open implementation question inside
  epic E1, offline inspection sync, and get sign-off from
  mobile, sync-service, and platform engineering before
  Commitment."
hat: product
gate: commitment
tickets: { ready: 3, blocked: 2, claimed: 1, closed: 0 }
known_unknowns: 2
mode: chart</code></pre>

The gate named there, Commitment, is where the backlog is raised and delivery takes over.

A week later, you return with the chart in hand and no ticket named. Advance mode reads the chart body — the destination, the standing notes, the decisions already made — then chooses the ready ticket "Which conflict-resolution strategy." It claims that ticket by assigning it to your session, and resolves it by routing into `case`, the skill that owns option decisions. The blind-spot checklist runs before anything is recorded: did the option set seriously weigh doing nothing, and did three agents converging on the same strategy do so independently, or only because they share one underlying model.

The resolution posts as a ticket comment, the ticket closes, and one line is added to the chart's decision list:

<pre><code>chart: specs/chart/e1-offline-sync-chart.md
destination: "Decide every open implementation question inside
  epic E1, offline inspection sync, and get sign-off from
  mobile, sync-service, and platform engineering before
  Commitment."
hat: product
gate: commitment
tickets: { ready: 4, blocked: 1, claimed: 0, closed: 1 }
known_unknowns: 1
mode: advance
decided: "Chose a field-level merge with a manual
  review queue over last-write-wins: neither
  inspector's answer is silently dropped, and a true
  conflict surfaces for a person to resolve."</code></pre>

Resolving that ticket opened one that was blocked on it — the offline storage engine choice could not be finalized until the conflict-resolution strategy was — and cleared one known unknown, since the residual sync-status-visibility question is now precise enough to state.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A ticket sized to one decision</div>
<pre><code><span class="tok-ok">Ticket: "Which conflict-resolution strategy"</span>
One question. One resolution comment.
Claimed before work starts, closed with
the answer as a comment.</code></pre>
<div class="compare-card-note">The single-answer test: the resolution can be written as one decision.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Ticket: "Which conflict-resolution strategy,</span>
<span class="tok-warn">        and how do we roll it out"</span>
Two decisions in one ticket — the second
usually depends on the first.</code></pre>
<div class="compare-card-note">This is the most common sizing failure, and it fails quietly: the session runs out of room and records a partial answer.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if the breadth pass finds no open decisions?</summary>
<div class="qa-body">

`SKILL.md` treats this as a stop condition, not a failed chart: the work fits one pass, so say so and run the linear pipeline instead of charting it. Charting an initiative that does not actually need charting just adds a tracker layer around a plan that was never too big to hold in one session.

</div>
</details>

<details class="qa">
<summary>The chart has grown past 25 open tickets. Now what?</summary>
<div class="qa-body">

`SKILL.md` names this stop condition directly: more than roughly 25 open tickets at once means the destination is too wide. The fix is to split it into two charts or narrow it, not to keep charting into one document that has quietly become a program.

</div>
</details>

<details class="qa">
<summary>How does a decision ticket differ from a piece of the build?</summary>
<div class="qa-body">

`TICKETS.md` draws the line directly: a decision ticket's resolution is a decision, not a piece of the build. The chart is finished when nothing is left to decide, and the doing starts after that, through `carve`, `prd-draft`, and the delivery seam at Commitment, the gate where the backlog is raised and delivery takes over. When a session feels pulled toward building the thing rather than deciding about it, that is usually the signal the chart has reached its destination.

</div>
</details>

<details class="qa">
<summary>What happens when no tracker is configured?</summary>
<div class="qa-body">

`SKILL.md` names this as a stop condition with a stated fallback: the chart falls back to the markdown file at `specs/chart/{prefix}-chart.md` in the initiative repository. The fallback's cost is said plainly — concurrent sessions have no claim protocol, so two sessions can resolve the same ticket twice.

</div>
</details>

<details class="qa">
<summary>Can a question that never gets settled just sit open forever?</summary>
<div class="qa-body">

No. `CHART.md` is explicit that a question nobody can settle becomes a Risk, Assumption, or Dependency in `raid`, never a ticket left open indefinitely. `SKILL.md`'s stop conditions carry the same rule for a stale claim: release it rather than leaving the edge falsely blocked.

</div>
</details>

## It's working if

- The ready set on the tracker is small enough that a PM can see, without opening every ticket, what can start today.
- Every closed ticket's resolution names what was decided, what it was decided against, and what evidence supports it — not just the answer on its own.
- A stalled alignment ticket shows up in `raid` with a named owner and a date, rather than sitting open with no visible reason.
- A sponsor's status question gets answered from the tracker directly, with nobody writing a status update to answer it.

If the chart keeps growing past 25 tickets because each new one gets narrowed just enough to avoid tripping the stop condition, the discipline has failed while the count still reads clean.

## Where it fits

Chart sits ahead of the linear pipeline, not inside it: an initiative small enough for one pass never needs it, and `discover` → `map` → `carve` runs directly. Once a chart's decisions are settled, `carve` takes over to cut the work into epics, the same way it would from a Business Understanding Document that never went through a chart at all.

Its nearest neighbor for the shape of one round is `arrange` — arrange decides how a single grill round or research commission should run, while chart decides how an entire initiative's worth of decisions gets planned and claimed across many sessions. `report` reads status straight off a chart's decision list and blocked or claimed tickets, so a leadership pack never has to ask anyone what is open.

If none of this settles which skill fits at all, `ask-pm` routes you — plain-language intent goes in, one skill name and a one-line reason come back out.
