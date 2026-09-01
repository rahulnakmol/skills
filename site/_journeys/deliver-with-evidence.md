---
layout: journey
name: deliver-with-evidence
title: "Deliver with evidence"
description: "Five AI-native SDLC skills in delivery order: read the codebase, pressure-test the idea, run the gated build, prove it is done, then review before merge."
audience: engineers
steps:
  - skill: recon
    title: "Map what you inherited"
    blurb: "A quick map of a codebase you do not know — it only reads."
  - skill: impact
    title: "Pressure-test the idea"
    blurb: "From raw idea to a requirements doc that survived hard questions."
  - skill: sdlc
    title: "Run the gated build"
    blurb: "The full loop: sign-off points, a separate checker, human approval."
  - skill: grit
    title: "Prove done is done"
    blurb: "Checks written first; a final count before anyone says finished."
  - skill: shakedown
    title: "Review before merge"
    blurb: "Build, test, and review the change in a sandbox before it merges."
---

This is the engineer's shortcut through the full map — see [How it fits]({{ '/how-it-fits/' | relative_url }}) for the whole system.

This path is for an engineer who has not yet run a change through The Quentin's agent-led delivery pipeline. It follows QuenServe's own delivery story, E1-F1-S1: an inspector completes an inspection with no connectivity, and it syncs without loss once the connection returns. It starts before a line of code is written, with reading QuenServe's existing sync code and pressure-testing that raw idea, and it ends at the merge, with a pull request that has already been built, tested, and reviewed in an isolated sandbox.

These five are a route through the developer group, not the whole of it. The pipeline also carries `slice`, which cuts E1-F1-S1's parent feature, E1-F1, from the engineering PRD, and `raise`, which publishes it to the tracker between a signed requirements document and a tracked backlog. `conduct` runs ahead of all of them to decide the execution shape; each page names its own handoffs where they fall.

By the end, an engineer can brief a codebase they have never seen — QuenServe's own offline-sync code, for this journey — and turn an idea into a requirements document that survived hard questions. They can carry a build through its sign-off points, prove every acceptance criterion for E1-F1-S1 was met with recorded evidence, and merge a change that has already passed an independent review.
