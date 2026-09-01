---
layout: default
permalink: /example/
title: "The example: QuenServe"
description: "QuenServe is the one field-inspection product every skill on this site uses for its worked examples, so a page hands off to the next instead of inventing a new scenario."
---

# QuenServe

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

Epic E1 is offline inspection sync: an inspector's phone loses signal inside a warehouse or on a rural site, and the inspection still has to complete. Feature E1-F1, offline capture, records an inspection with no network present. Feature E1-F2, conflict resolution, reconciles what happened when two people touched the same record while disconnected. Feature E1-F3, sync status visibility, shows plainly what has and has not reached the server. E1-F1-S1, "complete an inspection with no connectivity and it syncs without loss," is the delivery story this site's worked examples return to. It is the one story small enough to build, verify, and ship in a single pass; everything above it exists to justify it, and everything below it exists to prove it actually works.

These ids are not decoration. The [work-item contract]({{ '/slice/' | relative_url }}) that `slice` applies requires every work item to carry a parent link: the epic or feature it belongs to, and the PRD it traces back to. A person or an agent picking up E1-F1-S1 cold can therefore trace it to E1-F1 and to E1 without asking anyone. The dashed ids above carry the first half of that link, applied before any of these items exists as a tracked issue; the PRD half is added when the item is raised.

## The altitude map

Different skills work this product at different altitudes. The [pm group]({{ '/group/pm/' | relative_url }}) works at E1 and above: [`discover`]({{ '/discover/' | relative_url }}) surfaces the connectivity problem from field reports, [`map`]({{ '/map/' | relative_url }}) turns that analysis into the understanding document, [`carve`]({{ '/carve/' | relative_url }}) carves E1 from that document as an epic, and [`prd-draft`]({{ '/prd-draft/' | relative_url }}) writes its PRD. Delivering E1-F1-S1 runs the developer group's chain: [`recon`]({{ '/recon/' | relative_url }}) briefs an agent on QuenServe's existing sync code, [`impact`]({{ '/impact/' | relative_url }}) turns the signed epic into the engineering PRD, and [`slice`]({{ '/slice/' | relative_url }}) cuts that PRD into E1-F1 through E1-F3 and the story above. From there [`grit`]({{ '/grit/' | relative_url }}) writes the gates that decide when it is done, [`sdlc`]({{ '/sdlc/' | relative_url }}) runs the gated build, [`deliver`]({{ '/deliver/' | relative_url }}) checks that it is ready to release, and [`shakedown`]({{ '/shakedown/' | relative_url }}) reviews the pull request before merge. Once E1 ships, [`press`]({{ '/press/' | relative_url }}) turns the signed release note into the branded page stakeholders read, and [`brief`]({{ '/brief/' | relative_url }}) is what keeps the instruction files QuenServe's own engineering agents read — a CLAUDE.md, an AGENTS.md — current as the product changes.

Every scenario on this site is a piece of QuenServe. A page hands off to the next one the way the skills themselves do, instead of each page inventing its own product to explain.

## Where to pick it up

Two routes follow this same product end to end, and one map holds both.

- [Run a product org]({{ '/journey/run-a-product-org/' | relative_url }}) starts at the field-connectivity problem and ends at a leadership pack that says whether the money was well spent.
- [Deliver with evidence]({{ '/journey/deliver-with-evidence/' | relative_url }}) starts at QuenServe's existing sync code and ends at a merged, independently reviewed change.
- [How it fits]({{ '/how-it-fits/' | relative_url }}) lays both out together, naming the artifact each step writes and the person who signs it.
