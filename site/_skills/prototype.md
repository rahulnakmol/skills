---
layout: skill
name: prototype
title: "Prototype: One Question, One Throwaway Build"
description: "Prototype builds the smallest running thing that answers one design question, then deletes it or graduates it on purpose with a named rebuild list."
group: developer
invocation: model-invoked
scenario: "Answering the sync-status design question inside QuenServe feature E1-F3 before any of it is built"
lens:
  novice:
    who: 'You have watched a team argue about two interface directions for a week using only descriptions, because nobody built either one.'
    value: 'Prototype builds the directions instead of describing them, so the argument ends with something people actually used rather than with whoever spoke last.'
  practitioner:
    who: 'You are the engineer who reaches for a spike when a design choice turns on behavior nobody can predict from discussion.'
    value: 'You get a spike with a stated question, a form that matches it, an explicit ban on faking the mechanism under examination, and a written disposition when the answer arrives.'
  leader:
    who: 'Your team produces prototypes that quietly become production code, carrying throwaway tradeoffs under features people believe were designed.'
    value: 'Every prototype ends with a written disposition: deleted, or graduated with a named list of what gets rebuilt with tests, error handling, and review first.'
  csuite:
    who: 'You fund exploratory work and want to know it ended somewhere, rather than drifting into the product unreviewed.'
    value: 'Exploration is bounded by one question and closed by one recorded answer, and the code it produced is either removed or deliberately rebuilt before it ships.'
---

## What it does

Prototype is the model-invoked charter for throwaway builds. A prototype here is not an early version of the product. It is an experiment with one question attached, built to be run once with the people who own a decision, and then removed. The skill exists because a build with no stated question has no stopping point, so it keeps growing until someone runs out of time.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">State the question</span><span class="step-text">Write the question in one sentence, and name the decision the answer changes. Two questions in one build produce an answer to neither, so a compound question is split first.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Choose the form</span><span class="step-text">A state-model or logic question becomes one self-contained HTML file anyone can open and pass around. An interface question becomes several variations behind one route, switchable in seconds.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Oppose the variations</span><span class="step-text">Interface variations differ in structure, not in shade. Three cautious versions of one layout only reveal which version of the same idea people prefer, so at least one direction is expected to be rejected.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Fake around, never through</span><span class="step-text">Stub the network, hard-code the data, skip authentication. The mechanism the question turns on has to actually run, because a prototype that fakes the hard part answers a question nobody asked.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Answer and dispose</span><span class="step-text">Run it with the people who own the decision, write the answer in one sentence, and record the disposition: deleted, or graduated with a named rebuild list.</span></div>
</div>

<ul class="benefits">
  <li>A prototype has a stopping point, because the question it answers was written down before any code existed.</li>
  <li>Comparison happens between structurally different directions, not between three shades of one layout that were never going to disagree.</li>
  <li>The part under examination genuinely runs, so the evidence is about the real mechanism rather than about a placeholder that behaved better than the real thing would.</li>
  <li>The build ends on the record. It is deleted, or it is graduated with a named list of what must be rebuilt with tests, error handling, and review before it reaches production.</li>
  <li>What the run showed that discussion had not is written down as a separate finding, because the surprise is usually the part worth carrying into the real design.</li>
</ul>

The skill states its central prohibition in one line: "Fake the surroundings; never fake the part the question turns on." Its rule on honesty is just as direct: throwaway code "may skip abstraction, tests, and error handling. It may not mislead: no placeholder that looks like a working feature, and no number presented as measured when it was typed by hand."

- [`SKILL.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/prototype/SKILL.md) covers the procedure, the five stop conditions, and the output contract every run fills in.
- [`TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md) covers the run record prototype appends a `probe` entry to when the question is answered.
- [`architect`](https://github.com/tqnonline/skills/blob/main/skills/developer/architect/SKILL.md) covers the design decision this evidence informs, and the ADR that records it.
- [`tdd`](https://github.com/tqnonline/skills/blob/main/skills/developer/tdd/SKILL.md) covers the test-first rebuild a graduated part goes through, which the throwaway code skipped.

Prototype reads each one only when the moment calls for it: writing the run record reads TRACE.md, handing evidence to a decision reads architect, graduating a part reads tdd.

## When to reach for it

Nothing types `/prototype` in Claude Code. Prototype is model-invoked, reached three ways. A design choice that turns on behavior nobody can predict from discussion reaches it, such as a state machine's edge cases or a merge rule. The `architect` skill reaching a decision that needs running evidence before an ADR records it reaches it. And a request whose wording matches the skill's own description reaches it directly, including a plain ask for a spike, a mockup, or a proof of concept.

You reach for prototype in three moments. Two or more interface directions are open, and the team is comparing descriptions rather than something it can use. An unfamiliar dependency or API raises the question of whether it can do the thing at all. A design argument has run long enough that the cheapest way to settle it is to build the disputed part and watch it run.

Prototype is not the only skill that produces running code. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need the design decision itself recorded, with its context and consequences, not the evidence behind it | [`architect`]({{ '/architect/' | relative_url }}) |
| You need production code built test first, one vertical slice at a time | [`tdd`]({{ '/tdd/' | relative_url }}) |
| You need to know why existing code fails, not which of two designs to pick | [`debug`]({{ '/debug/' | relative_url }}) |
| You need the requirement cut into stories with acceptance criteria before anyone builds | [`slice`]({{ '/slice/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

Install once, and every tool below reaches the same prototype skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want prototype can skip the rest of the catalog with `./scripts/link-skills.sh --skill prototype`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Plain ask, no slash command</span></div>
<div class="tool-group-body">
<p>Prototype has no slash command of its own. Claude reaches for it when a request's wording matches the skill's description — a spike, a mockup, a proof of concept, or a design choice that needs running evidence — and when a design pass hands over a question that discussion has stopped resolving.</p>
<div class="prompt-card">Feature E1-F3 is sync status visibility, and we cannot agree how an inspector should see what has and has not reached the server. Build three structurally opposed variations behind one route, and run the real three-state model including the state where we genuinely do not know yet. Stub the network and seed the data, but do not fake that state.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Prototype returns the question, the form, the variations and their routes, what was faked, what was not, and the disposition it recommends once the run is over.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command &mdash; catalog read</span></div>
<div class="tool-group-body">
<p>OpenCode's installed command layer wraps a handful of developer skills — <code>architect</code>, <code>impact</code>, <code>operate</code>, <code>quality</code>, <code>security</code>, <code>sdlc</code>, and <code>grit-verify</code> among them. No command wraps prototype. The agent reads the shared <code>.agents/skills/</code> catalog directly, the same route Cursor and Codex use, and applies the procedure when a request matches the skill's description.</p>
<div class="prompt-card">Read skills/developer/prototype/SKILL.md, then answer one question for feature E1-F3: how should an inspector be shown work that has not reached the server, including the case where the app has handed an inspection to the network and no acknowledgment has come back. Build opposed variations, not three versions of one layout.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode states the question and the form in its reply before writing any files, since no command wraps the build step for it.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply prototype as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads a generated companion file, <code>agents/openai.yaml</code>, built by <code>scripts/gen-openai-yaml.mjs</code> from every skill's frontmatter, so it sees prototype's name and description the same way the other tools do. GitHub Copilot applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<div class="prompt-card">Following skills/developer/prototype/SKILL.md, build a throwaway spike for story E1-F3-S1. The question: how does an inspector read the difference between sent, waiting, and unknown. Hard-code the inspections and stub the transport, but run the real state transitions. Tell me at the end what to delete.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three write the variations and state the disposition directly in the session, since none has a command output to parse.</p>
</div>
</div>

A good ask includes:

- The one question, in a sentence, and the decision its answer changes.
- Which mechanism must genuinely run, so the skill knows what it is not allowed to stub.
- Who will be in the room when the prototype is run, since a build nobody will decide from should not be built at all.
- Whether the result may be graduated, or whether it is deleted regardless of how good it looks.

## A working example

The question here sits inside E1-F3, sync status visibility, one of the three features of epic E1 on [QuenServe]({{ '/example/' | relative_url }}) — the field-inspection product every scenario on this site returns to. Story E1-F3-S1 says an inspector sees which of today's inspections have not yet reached the server. The design argument is about the third state. An inspection can be confirmed on the server, or plainly still on the device, or handed to the network with no acknowledgment back, which means the honest answer is that nobody knows yet. You type:

<pre><code>Feature E1-F3 is sync status visibility, and we cannot agree how an inspector
should see what has and has not reached the server. Build three structurally
opposed variations behind one route, and run the real three-state model
including the state where we genuinely do not know yet. Stub the network and
seed the data, but do not fake that state.</code></pre>

Prototype writes the question down first, because that is what gives the build a stopping point. The form follows from it: this is an interface question, so it is answered by variations behind one route rather than by a single HTML file. The three directions are built to disagree, and the unacknowledged state runs for real in all three.

The completed run, shown here as the shape the skill's own output contract produces, filled with this scenario's values rather than a captured session:

<pre><code>question: how should an inspector read the difference between sent,
          waiting, and not-yet-known, on today's inspections
form: ui-variations
variations:
  - name: row-badge
    route: /proto/row-badge
    idea: status lives on each inspection row; no new screen at all
  - name: queue-screen
    route: /proto/queue-screen
    idea: a separate screen listing only unsent work, oldest first,
          empty when everything is through
  - name: global-banner
    route: /proto/global-banner
    idea: one line for the whole app; no per-inspection detail
faked: [network transport, auth, seed inspections]
not_faked: the three-state model, including the timeout that moves an
           inspection from waiting to not-yet-known
answer: the queue screen; it rules out the global banner, which cannot
        say which inspection is stuck
surprise: inspectors read "not yet known" as "failed" unless the screen
          also says what happens next
disposition: deleted
graduation: none
open: whether E1-F3-S2's manager view needs the same third state</code></pre>

That block is filled in after the run, not before it. The three variations were opened in front of the people who own the decision, and each one was used rather than described. The global banner failed within a minute: one line cannot name which inspection is stuck, so an inspector standing on a site still has nowhere to look. The row badge survived longer, and lost to the queue screen because status spread across a long list is harder to scan than a screen that holds only the work still outstanding.

The field names — `question`, `form`, `variations`, `faked`, `not_faked`, `answer`, `surprise`, `disposition`, `graduation`, `open` — are the skill's own output contract. Two of them carry most of the value. The `surprise` line is the finding discussion had not produced, and it changed the story: the third state needs an action attached, not only a label. The `open` line records a question the run raised and did not settle, so it reaches E1-F3-S2 rather than being lost.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">Variations that can disagree</div>
<pre><code>/proto/row-badge      <span class="tok-comment"># status on the row, no new screen</span>
/proto/queue-screen   <span class="tok-comment"># unsent work as its own object</span>
/proto/global-banner  <span class="tok-comment"># one line for the whole app</span>

<span class="tok-comment"># stubbed: transport, auth, seed data</span>
<span class="tok-comment"># real: the waiting -&gt; not-yet-known transition</span></code></pre>
<div class="compare-card-note">Three structures, not three layouts. At least one was expected to lose, and the mechanism the argument was about ran in every one of them.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Three tidy versions of the same list view</span>
<span class="tok-warn">The unknown state hard-coded to look resolved</span>
<span class="tok-warn">Tests and error handling accumulating quietly</span>
<span class="tok-warn">No disposition written; the branch just stays</span></code></pre>
<div class="compare-card-note">From the skill: a faked mechanism "gives a confident wrong answer," and a prototype that quietly becomes production "is the failure this skill exists to prevent."</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>How does the skill choose between one HTML file and several variations?</summary>
<div class="qa-body">

By the kind of question. A state-model or logic question — what a merge rule does at its edges, what a state machine does on an unexpected transition — becomes one self-contained HTML file with the logic visible on the page, so anyone can open it and pass it around. An interface question becomes several variations reachable from a single route through a toggle, so a reviewer can switch between them in seconds.

</div>
</details>

<details class="qa">
<summary>Why must the variations be opposed rather than similar?</summary>
<div class="qa-body">

Because a comparison between three cautious versions of one layout only tells you which shade of the same idea people prefer. That is not the question anybody asked. The skill asks for directions that differ in structure and expects at least one to be rejected, since a set where every option survives was not testing anything.

</div>
</details>

<details class="qa">
<summary>What is allowed to be faked?</summary>
<div class="qa-body">

The surroundings. Stub the network, hard-code the data, skip authentication. What may never be faked is the part the question turns on. In the E1-F3 run above, the transport was stubbed and the inspections were typed in by hand, but the transition into the not-yet-known state ran for real, because that state was the entire argument.

</div>
</details>

<details class="qa">
<summary>Is throwaway code allowed to be ugly?</summary>
<div class="qa-body">

Yes, and it is allowed to skip abstraction, tests, and error handling. It is not allowed to mislead. No placeholder may look like a working feature, and no number may be presented as measured when a person typed it. Ugly and honest is the standard; polished and misleading fails it.

</div>
</details>

<details class="qa">
<summary>What happens when the prototype starts growing tests and configuration?</summary>
<div class="qa-body">

That is a stop condition, not a sign of progress. The build is turning into production code by accident. The skill's instruction is to answer the question and stop, or to graduate the work deliberately through `tdd` rather than letting throwaway tradeoffs settle underneath a feature the team believes was designed.

</div>
</details>

<details class="qa">
<summary>What does graduating a prototype actually require?</summary>
<div class="qa-body">

A named list, written down, of which parts get rebuilt with tests, error handling, and review before they reach production. The E1-F3 run above recorded `disposition: deleted` and `graduation: none`, which is the ordinary outcome. A run that keeps something writes the opposite: the parts that survive, and what each one still needs.

</div>
</details>

<details class="qa">
<summary>What if the question is whether an unfamiliar dependency can do the thing at all?</summary>
<div class="qa-body">

That is one of the cases the skill is written for, and it narrows what may be stubbed. The dependency is the mechanism the question turns on, so it has to be the real one. If the real dependency cannot be reached — no credentials, no sandbox, no account — the skill reports the question as unanswered rather than substituting a stand-in, because a stand-in would produce a confident answer about software nobody ran.

</div>
</details>

<details class="qa">
<summary>When should a prototype not be built at all?</summary>
<div class="qa-body">

When nobody will decide from the result. The skill records the question and names who has to answer it first, rather than building. It also declines two other cases: a question that cannot be stated in one sentence is split, and a mechanism that cannot run without the real dependency either uses the real dependency or is reported as unanswered.

</div>
</details>

## It's working if

- Every prototype has a question written in one sentence, and a named decision that its answer changes.
- Interface variations differ in structure, and at least one gets rejected on the evidence rather than surviving by default.
- The mechanism the question turns on runs for real in the build, and the list of what was stubbed is stated alongside it.
- Every run ends with a written disposition, so the code is deleted or deliberately graduated, never left to drift into the product.

If a branch from a prototype is still open weeks later with no disposition recorded, the skill has stopped doing the one job it exists for.

## Where it fits

**Prototype is the evidence lane beside the design lane: it answers one open design question with something running, then removes itself.**

Its nearest neighbor is `architect`, which owns the decision this evidence informs and records it as an ADR. Prototype supplies the observation; architect supplies the ruling. `tdd` is where a graduated part goes to be rebuilt test first, since the throwaway version skipped that on purpose. `debug` is the skill to use instead when the question is why existing code fails, rather than which of several designs to choose. Each run appends a `probe` entry to the trace described in `core/TRACE.md`, so a later session inherits the question, the answer, and the open item rather than re-deriving them.

If none of this settles which skill fits, `ask-fde` routes you by intent rather than by skill name.
