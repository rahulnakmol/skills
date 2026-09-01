---
layout: page
permalink: /example/
title: "The example: QuenServe"
description: "QuenServe is the one field-inspection product every skill on this site uses for its worked examples, so a page hands off to the next instead of inventing a new scenario."
eyebrow: "Worked example"
heading: "QuenServe"
---

QuenServe is an enterprise field-inspection product used by two kinds of people at the same company: field inspectors who walk a site and record what they find, and the operations managers who track that work across every site the enterprise runs. An inspector completes a structured checklist on a phone or a tablet, attaches photos and measurements, and submits it, even from a site with no signal. A manager sees every open and completed inspection across the whole portfolio of sites without asking anyone for a status update.

Neither of them can do their job if a finished inspection quietly disappears somewhere between the site and the server. That is the problem every worked example on this site is built around, and the reason it is worth following one product all the way through rather than meeting a new one on every page.

## The hierarchy

This site returns to one epic, three features, and a handful of stories so that every skill's example is grounded in the same product rather than a fresh one each time. An **epic** is work large enough to ship on its own and small enough to estimate. A **feature** is a slice of an epic built around one capability. A **story** is one thing a particular kind of user can now do, small enough to build and prove in a single pass.

<pre><code>E1 &middot; offline inspection sync                          epic
├── E1-F1 &middot; offline capture                            feature
│   ├── E1-F1-S1 &middot; complete an inspection with no connectivity
│   │                and it syncs without loss                 &larr; delivery story
│   └── E1-F1-S2 &middot; capture photos and measurements while offline
├── E1-F2 &middot; conflict resolution                          feature
│   ├── E1-F2-S1 &middot; two inspectors edit the same inspection offline,
│   │                and neither answer is silently dropped
│   └── E1-F2-S2 &middot; a sync conflict surfaces for a person to resolve
└── E1-F3 &middot; sync status visibility                       feature
    ├── E1-F3-S1 &middot; an inspector sees which of today's inspections
    │                have not yet reached the server
    └── E1-F3-S2 &middot; a manager sees sync health across every site
</code></pre>

| Id | Name | What it covers |
| --- | --- | --- |
| `E1` | offline inspection sync | An inspector's phone loses signal inside a warehouse or on a rural site, and the inspection still has to complete. |
| `E1-F1` | offline capture | Recording an inspection with no network present. |
| `E1-F2` | conflict resolution | Reconciling what happened when two people touched the same record while disconnected. |
| `E1-F3` | sync status visibility | Showing plainly what has and has not reached the server. |

E1-F1-S1, "complete an inspection with no connectivity and it syncs without loss," is the delivery story this site's worked examples return to. It is the one story small enough to build, verify, and ship in a single pass. Everything above it exists to justify it, and everything below it exists to prove it actually works.

These ids are not decoration. The [work-item contract]({{ '/slice/' | relative_url }}) that `slice` applies requires every work item to carry a parent link: the epic or feature it belongs to, and the PRD it traces back to. A person or an agent picking up E1-F1-S1 cold can therefore trace it to E1-F1 and to E1 without asking anyone. The dashed ids above carry the first half of that link, applied before any of these items exists as a tracked issue; the PRD half is added when the item is raised.

## The altitude map

Different skills work this product at different altitudes. The [pm group]({{ '/group/pm/' | relative_url }}) works at E1 and above; the [developer group]({{ '/group/developer/' | relative_url }}) delivers one story.

| Altitude | Skills that work there | What they produce for QuenServe |
| --- | --- | --- |
| Above the epic | [`discover`]({{ '/discover/' | relative_url }}), [`map`]({{ '/map/' | relative_url }}) | The connectivity problem, surfaced from field reports and turned into the understanding document. |
| The epic | [`carve`]({{ '/carve/' | relative_url }}), [`prd-draft`]({{ '/prd-draft/' | relative_url }}) | E1 carved out of that document, and the product requirements document that describes it. |
| Inside the epic | [`recon`]({{ '/recon/' | relative_url }}), [`impact`]({{ '/impact/' | relative_url }}), [`slice`]({{ '/slice/' | relative_url }}) | An agent briefed on QuenServe's existing sync code, the engineering PRD, and E1-F1 through E1-F3 cut into stories. |
| The story | [`grit`]({{ '/grit/' | relative_url }}), [`sdlc`]({{ '/sdlc/' | relative_url }}), [`deliver`]({{ '/deliver/' | relative_url }}), [`shakedown`]({{ '/shakedown/' | relative_url }}) | The gates that decide when E1-F1-S1 is done, the gated build, the release check, and the review before merge. |
| After the release | [`press`]({{ '/press/' | relative_url }}), [`brief`]({{ '/brief/' | relative_url }}) | The branded page stakeholders read, and the instruction files QuenServe's own engineering agents read, kept current as the product changes. |

Every scenario on this site is a piece of QuenServe. A page hands off to the next one the way the skills themselves do, instead of each page inventing its own product to explain.

## Where to pick it up

Two routes follow this same product end to end, and one map holds both.

- [Run a product org]({{ '/journey/run-a-product-org/' | relative_url }}) starts at the field-connectivity problem and ends at a leadership pack that says whether the money was well spent.
- [Deliver with evidence]({{ '/journey/deliver-with-evidence/' | relative_url }}) starts at QuenServe's existing sync code and ends at a merged, independently reviewed change.
- [How it fits]({{ '/how-it-fits/' | relative_url }}) lays both out together, naming the artifact each step writes and the person who signs it.
