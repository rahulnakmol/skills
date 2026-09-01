---
layout: default
title: "For leaders"
description: "What The Quentin's skill library changes for a delivery organization: human gates, agent-run work between them, and evidence-backed completion."
permalink: /leaders/
---

# For leaders

The Quentin's skill library is built around one operating rule, applied the same way on the delivery side and the product side. This page states what that rule changes for people who are accountable for outcomes, not for the work itself.

## The operating model

Human judgment holds the gates; trusted agents do the work in between ([README](https://github.com/tqnonline/skills/blob/main/README.md)). On the delivery side, a change moves through four human gates — design, build, secure, and release — with a single agent writer per checkout and a separate verifier wherever an agent's output feeds a consequential decision. On the product side, the same pattern repeats as four gates of its own: Framing, Investment, Quality, and Commitment ([`skills/pm/GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/GATES.md)). Nothing moves to the next gate until a person reads what the agent fleet produced and approves it.

## What changes for delivery

A completion claim stops being a sentence in a chat transcript. Before implementation starts, every acceptance criterion becomes a gate a script can check, and work is not called done while a gate is unmet ([`grit`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/SKILL.md)). Every gate closes as met, unmet, or abandoned, with the evidence that was measured recorded alongside it. A build that finishes without error is treated as evidence that nothing visibly broke, not as evidence that the right thing shipped ([`VERIFICATION.md`](https://github.com/tqnonline/skills/blob/main/skills/core/VERIFICATION.md)). Grit's audit — the met, unmet, and abandoned count — is what a leader now reads instead of asking whether something is actually done.

## What changes for product

Each of the four pm gates carries its own evidence requirement, not a general sign-off. Framing closes only when the problem owner can state, in their own words, what problem is being solved and for whom. Investment requires at least two real options plus the do-nothing option, each costed in full, including the agent fleet's own run cost. Quality is informed by an agent-scored review but decided by a human regardless of the score. Commitment hands the backlog to the same delivery pipeline the developer group uses — one tracker, one set of work-item contracts ([`skills/pm/GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/GATES.md)). Every gate opens with a blind-spot review a human runs and never delegates back to an agent.

## Where to start

An engineer new to this model can follow [Deliver with evidence]({{ '/journey/deliver-with-evidence/' | relative_url }}), five skills in the order a change actually moves through the pipeline, worked against [QuenServe]({{ '/example/' | relative_url }}), the example product every scenario on this site returns to. A product or program leader can follow [Run a product org]({{ '/journey/run-a-product-org/' | relative_url }}), four skills from a raw problem to a leadership pack. Both start from [the home page]({{ '/' | relative_url }}).
