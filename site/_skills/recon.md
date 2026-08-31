---
layout: skill
name: recon
title: "Recon — A Read-Only Brief on an Existing Codebase"
description: "Recon is the model-invoked skill that produces a read-only brief on an existing codebase through signal-first, archetype triage before other work begins."
group: developer
invocation: model-invoked
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

Recon produces a read-only brief on an existing codebase's architecture, without editing a single file. It follows signal-first triage: a manifest scan, a marker match against the signal table, at most three matching pattern cards loaded, and targeted reads limited to the paths those markers point to. The output is a fixed-format brief — archetypes with confidence, an estate map, modernization seams, and risks — that `impact` or `architect` then consume for brownfield context. Where no signal matches, the brief says so honestly and suggests manual questions instead of guessing an archetype.

## How to call it

Recon is not typed as a command. The model reaches for it whenever a request needs orientation on an existing codebase before other work proceeds. A prompt like "I inherited this codebase and have no idea how it is put together" is enough to trigger it.

Readers who do not have the skill pack installed yet can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

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

## In practice

`test/fixtures/recon/microservices-event-driven/MARKERS.json` ships in the repository as a real triage fixture. Reproduced here in full, byte for byte:

<pre><code>{
  "expected_archetypes": ["microservices-event-driven"],
  "signals": ["kafka", "docker-compose.yml", "openapi.yaml", "events/"]
}</code></pre>

Walking `TRIAGE.md`'s steps against those signals: `docker-compose.yml` matches the Microservices marker family and `kafka` matches the Event family in `references/signals/MARKERS.md`; together they load the `microservices-event-driven.md` pattern card, whose own questions are deployment unit, data ownership, and test harness depth. Filling `BRIEF-FORMAT.md`'s headings from that match is the shape the output contract requires — not a captured real run, since recon has no script of its own to execute:

<pre><code>## Archetypes detected
- microservices-event-driven: high
## Modernization seams
Deployment unit? Data ownership? Test harness depth?
## Suggested next skills
- architect</code></pre>

## How it works

1. Run signal-first triage, starting with a manifest scan of build files, CI, and deploy configs. See [`TRIAGE.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/recon/TRIAGE.md).
2. Match markers against the signal table. See [`references/signals/MARKERS.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/recon/references/signals/MARKERS.md).
3. Load at most three matching pattern cards from the index — never the whole set. See [`PATTERNS.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/recon/PATTERNS.md).
4. Read only the paths those markers point to — targeted, not exploratory. See [`TRIAGE.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/recon/TRIAGE.md).
5. Emit the brief in the fixed format; never mutate a source file. See [`BRIEF-FORMAT.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/recon/BRIEF-FORMAT.md).
