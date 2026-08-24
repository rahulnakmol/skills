# Research and intuition agents

A frontier PM does not wait for a clean brief. They arrive with meeting notes, a rough transcript, a spreadsheet someone forwarded, a deck from last quarter's steering committee. This doctrine covers how that raw material becomes evidence, how agents go get more of it, and how a PM's own intuition earns a place in the pipeline alongside the evidence rather than instead of it.

## Raw inputs

`discover` and `case` accept whatever a PM actually shows up with. Meeting notes and transcripts are read directly. Raw data in CSV is read natively. Raw data in `.xlsx` is read through the xlsx skill where it is installed, or converted to CSV first where it is not — and when neither path is available, the skill states the degradation plainly rather than guessing at spreadsheet contents from a description. Decks and screenshots are described and cited, never silently summarized away. Every raw input, once accepted, is normalized into a file under `specs/research/` so it survives past the conversation that produced it.

## Deep research agents

When the evidence in hand does not answer the question a gate is about to require, a PM commissions deep research rather than guessing or waiting. The preferred path is Claude Code's `/deep-research` where the environment supports it; the OpenCode `research` agent serves the same role in that environment; a disciplined round of web-search queries is the floor when neither is available. Every commissioned brief lands in `specs/research/` with its sources cited, so a research agent's output is held to the same evidentiary bar as a human's notes — no brief enters the corpus unsourced.

## Intuition agents

Evidence answers what is known; intuition agents provoke what has not yet been considered. This is the grill's provoke mode: two or three contrasting candidate framings, pushed deliberately toward star-7 or star-8 ambition, always labeled as a hypothesis rather than a finding, handed back to the PM through the grill for a reaction. An intuition agent is not asked to be right — it is asked to be provocative enough that the PM's response, agreement or rejection, becomes information in its own right.

## From research to corpus

Evidence gathered and evidence interrogated are the same artifact, not two separate systems. Everything that lands in `specs/research/` — raw inputs, commissioned briefs, and the hypotheses provoke mode generates — becomes the citation corpus the grill's with-docs mode draws from: every grill question in that mode names the document and the passage that motivated it, and a gap between what an artifact claims and what the corpus actually supports is itself a finding worth raising, not a detail to paper over.
