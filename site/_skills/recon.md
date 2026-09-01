---
layout: skill
name: recon
title: "Recon — A Read-Only Brief on an Existing Codebase"
description: "Recon is the model-invoked skill that produces a read-only brief on an existing codebase through signal-first, archetype triage before other work begins."
group: developer
invocation: model-invoked
scenario: "Inheriting a payments platform built as event-driven microservices, with no documentation"
lens:
  novice:
    who: 'You have been dropped into a codebase you did not write and do not recognize.'
    value: 'Recon reads the repository and hands back a brief on what it is and how it is put together, without changing a single file.'
  practitioner:
    who: 'You are about to run impact or architect against an existing estate and need real context first.'
    value: 'Recon triages on real signals — manifests, then markers — loads at most three matching pattern cards, and reads only the paths those markers point to, instead of scanning the whole tree.'
  leader:
    who: 'You are wary of "understanding the codebase" turning into an open-ended, token-burning exploration.'
    value: 'The brief format is fixed and bounded — archetype, estate map, modernization seams, risks — so orientation stays a scoped, comparable output rather than a free-form essay every time.'
  csuite:
    who: 'You are weighing a modernization program or an acquisition-integration decision.'
    value: 'The brief states its confidence honestly. An unmatched estate reports as an unknown archetype with suggested manual questions, never a confident guess dressed up as fact.'
journey: deliver-with-evidence
journey_title: "Deliver with evidence"
journey_step: 1
journey_steps: 5
journey_next: impact
---

## What it does

Recon produces a read-only brief on an existing codebase's architecture, and it never edits a single file to get there. It exists because "understanding the codebase" can otherwise turn into an open-ended read of everything. It triages instead: a manifest scan first, then a marker match, then a bounded set of pattern cards, then targeted reads only on the paths those markers actually point to.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Scan manifests</span><span class="step-text">Build files, CI configuration, and deploy configs first — the fastest, cheapest signal.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Match markers</span><span class="step-text">Compare what the manifest scan found against the signal table's marker families.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Load at most three cards</span><span class="step-text">Only the pattern cards that matched a marker, never the whole index.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Read targeted paths</span><span class="step-text">Only the paths those markers point to — targeted reads, not an exploratory sweep of the tree.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Emit the fixed brief</span><span class="step-text">Archetype with confidence, estate map, modernization seams, risks — never a mutated source file.</span></div>
</div>

<ul class="benefits">
  <li>Orientation on an unfamiliar codebase stays a bounded, targeted read instead of an open-ended exploration that burns tokens without a stopping point.</li>
  <li>Every brief carries a stated confidence next to its archetype, so a downstream skill knows how much to trust the label rather than treating a guess as settled fact.</li>
  <li>An unmatched estate reports honestly as an unknown archetype with suggested manual questions, never a confident label invented to fill the field.</li>
  <li>Nothing recon does can change the repository — every step through triage and the brief itself is read-only, by construction, not by discipline someone has to remember.</li>
</ul>

`impact` calls recon first for brownfield work — work against a codebase that already exists, as opposed to greenfield work starting from nothing — and `architect` reads the same brief for design context. The archetype and its confidence travel downstream exactly as recon stated them, never re-guessed by the next skill in line.

- [`TRIAGE.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/recon/TRIAGE.md) covers the five-step signal-first sequence, from manifest scan to the fixed brief.
- [`references/signals/MARKERS.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/recon/references/signals/MARKERS.md) covers the marker families a manifest scan is checked against.
- [`PATTERNS.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/recon/PATTERNS.md) covers the pattern-card index and the signals that load each one.
- [`BRIEF-FORMAT.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/recon/BRIEF-FORMAT.md) covers the fixed heading structure every brief follows.

## When to reach for it

Recon is not typed as a command. The model reaches for it on its own whenever a request needs orientation on an existing codebase before other work proceeds. The real, current line `r018` in this repository's routing evaluation set, `test/eval/routing.jsonl`, is exactly that trigger: "I inherited this codebase and have no idea how it is put together."

You reach for it, indirectly, in three moments. You are handed a repository with no working knowledge of its shape and need a bounded first pass before reading a single implementation file yourself. `impact` is about to draft a brownfield PRD and needs estate context before scope gets written down. `architect` needs a design starting point that names the estate's modernization seams rather than inventing a design with no reference to the estate at all.

| The problem | The skill |
|---|---|
| You have oriented on the codebase and now need a signed PRD for the change itself | [`impact`]({{ '/impact/' | relative_url }}) |
| You need a technical design built from the brief, not the brief itself | `architect` |
| You are choosing execution shape for a change, not orienting on the codebase it touches | [`conduct`]({{ '/conduct/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Recon is model-invoked: nothing is typed to call it. Claude reaches for it on its own when a request matches its description — codebase orientation, or estate context ahead of brownfield work — and it carries no plugin slash command or hook of its own.</p>
<div class="prompt-card">I inherited this payments platform and have no idea how it is put together. Orient me before I touch anything — I need to know the archetype, the estate map, and where the modernization seams are.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Recon returns the fixed brief — archetype with confidence, estate map, modernization seams, and risks — without editing a single file along the way.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode ships no dedicated command for recon. Its catalog install places the skill in <code>.agents/skills/</code> the same as every tool, and an orchestrating agent applies its triage procedure by reading the skill files as instructions when brownfield context is needed, rather than through a command file the way <code>/grit-verify</code> or <code>/press</code> work.</p>
<div class="prompt-card">Before we scope any change, run recon's signal-first triage on this repository and report the archetype, its confidence, and the modernization seams — read-only.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The agent applies `TRIAGE.md`'s steps directly and returns the fixed brief in its reply.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository. The skills land in <code>.agents/skills/</code>, and the agent applies recon's triage by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Apply skills/developer/recon/TRIAGE.md to this repository: manifest scan, marker match, at most three pattern cards, targeted reads only. Report the brief in BRIEF-FORMAT.md's headings.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor states the brief directly in its reply, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus the generated sidecar <code>agents/openai.yaml</code>, so it sees recon's name and description the same way the other tools do. It gets no command layer either: invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">Read skills/developer/recon/SKILL.md and TRIAGE.md, then triage this repository and report the brief — do not edit anything while you look.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex answers with the fixed brief, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog, driven by <code>.github/copilot-instructions.md</code>. This repository ships no hook or command for recon on any tool, so a Copilot request is answered the same way as on Cursor and Codex: by reading the skill files directly as working context.</p>
<div class="prompt-card">Before proposing any change to this repository, orient yourself with recon's read-only triage and report the archetype and its confidence in your plan.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot states the archetype and confidence in its plan before proposing any change.</p>
</div>
</div>

A good ask names what is actually unfamiliar — the whole repository, or one service inside a larger estate — since the triage scope follows from that. Readers who do not have the skill pack installed yet can add recon alone:

```bash
./scripts/link-skills.sh --skill recon
```

See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

## A working example

You have just inherited a payments platform with no documentation and no one left on the team who built it. Before scoping any change, you ask for orientation. Recon's manifest scan finds `docker-compose.yml`, a Kafka broker in the compose file, `openapi.yaml`, and an `events/` directory — the exact signal set this repository ships as a real triage fixture, `test/fixtures/recon/microservices-event-driven/MARKERS.json`, reproduced here in full, byte for byte:

<pre><code>{
  "expected_archetypes": ["microservices-event-driven"],
  "signals": ["kafka", "docker-compose.yml", "openapi.yaml", "events/"]
}</code></pre>

Walking `TRIAGE.md`'s steps against those signals: `docker-compose.yml` matches the Microservices marker family, and `kafka` matches the Event family in `references/signals/MARKERS.md`. Together they load the `microservices-event-driven` pattern card, whose own content — quoted verbatim — names the estate's shape and the exact questions a modernization seam has to answer:

<pre><code># Microservices Event Driven.Md

Kafka/CQRS; sagas; idempotency and schema evolution.

## Questions

- Deployment unit?
- Data ownership?
- Test harness depth?</code></pre>

Filling `BRIEF-FORMAT.md`'s fixed headings from that match is the shape the output contract requires — not a captured real run, since recon has no script of its own to execute:

<pre><code>## Archetypes detected
- microservices-event-driven: high

## Modernization seams
Deployment unit? Data ownership? Test harness depth?

## Suggested next skills
- architect</code></pre>

The brief names its confidence as `high` because all four signals matched cleanly, not because the estate looked broadly familiar. Had only one weak signal matched, the same brief would report a lower confidence, or an unknown archetype with manual questions instead of a label — TRIAGE.md never lets a partial match round up to a confident answer.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A brief that names its confidence</div>
<pre><code>## Archetypes detected
- <span class="tok-ok">microservices-event-driven: high</span>
## Modernization seams
Deployment unit, data ownership, and test harness depth per
the matched pattern card's own questions.
## Suggested next skills
- architect</code></pre>
<div class="compare-card-note">Follows BRIEF-FORMAT.md's exact headings, with a stated confidence level next to the archetype rather than a bare label.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>## Archetypes detected
<span class="tok-warn">- looks like a typical microservices setup, probably fine</span></code></pre>
<div class="compare-card-note">No signals &rarr; the brief states unknown archetype and suggested manual questions, never a confident guess. Recon never mutates source to find out more.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if no marker matches anything in the signal table?</summary>
<div class="qa-body">

The brief says so honestly. TRIAGE.md's stop condition is explicit: no signals means the brief reports an unknown archetype and suggests manual questions instead of guessing at a label. A confident-sounding archetype invented to fill the heading is exactly the failure this stop condition exists to prevent.

</div>
</details>

<details class="qa">
<summary>Can recon load every pattern card to be thorough?</summary>
<div class="qa-body">

No — the cap is at most three, and it is a hard limit, not a suggestion. `PATTERNS.md`'s index lists twelve cards; loading all of them on the chance one might be relevant is exactly the open-ended exploration recon's signal-first triage exists to avoid. A weak signal match is a reason to report lower confidence, not a reason to load a fourth card hoping it clarifies things.

</div>
</details>

<details class="qa">
<summary>Does recon ever change a file to confirm a guess?</summary>
<div class="qa-body">

Never. TRIAGE.md's stop condition states this directly: never mutate source. Every step, from the manifest scan through the targeted reads, is read-only by construction. If confirming an archetype would require running the code or editing a file, that confirmation is out of scope for recon — the brief reports its confidence as it stands, not as a stronger claim earned by touching the repository.

</div>
</details>

<details class="qa">
<summary>Why read only the paths a marker points to, instead of the whole tree?</summary>
<div class="qa-body">

Because the brief format is fixed and bounded on purpose — TRIAGE.md's steps run in order precisely so that a read only happens once a marker has already justified it. A codebase can run to hundreds of thousands of files; an exploratory read with no marker to bound it would burn tokens without producing an answer any more useful than the targeted one.

</div>
</details>

## It's working if

- Every archetype in a brief carries a stated confidence, and a low-confidence or unmatched estate reads as exactly that, never rounded up to sound more certain.
- No brief this skill produces is accompanied by a source-file edit — recon's own output and the repository it read stay separate every time.
- A brownfield `impact` run or an `architect` design consumes the brief's archetype and confidence as stated, rather than re-deriving its own guess about the estate.
- No triage run loads more than three pattern cards, regardless of how many signals matched.

If a brief starts naming an archetype with no matched signal behind it, the discipline has failed even though the brief still renders in the right format.

## Where it fits

**Recon is the first read on an estate nobody on the current team can already explain, and its brief is what the next skill in line builds on rather than re-derives.**

Its nearest neighbor is `impact`: recon is step one of the "Deliver with evidence" journey precisely because a brownfield PRD needs real estate context before scope gets written down, and impact calls recon first for exactly that reason. `architect` is the other consumer, reading the same brief for a design starting point rather than inventing one from nothing. Recon never decides what to build or how — it only reports what is already there.

If none of this settles which skill fits, `ask-fde` routes you to the right one from a plain description of what you need.
