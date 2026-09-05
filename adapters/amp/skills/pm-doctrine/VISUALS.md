# Visual compression

A leadership pack full of paragraphs is not a briefing, it is a report pretending to be one. This doctrine is what `map`, `roadmap`, and `report` each reference before they ship: compress the complex problem or decision at hand into one figure that carries the argument, not just the topic.

## Compress the mechanism

Draw the mechanism the decision actually turns on, not a decorative restatement of the topic. A current-state-to-target-state flow should show where the bottleneck sits and where it moves to, not just two boxes labeled "current" and "target." A roadmap figure should show the dependency that forces a sequencing choice, not just a list of initiatives on a timeline. The rule is one figure, one claim: if a figure tries to carry two arguments at once, it is two figures that have not yet been separated.

## The house system

Every PM visual uses the same visual system as the rest of `tqnonline/skills`: canvas `#FAF9F5`, ink `#262625`, coral `#C96442` for the element carrying the decision or the human node, slate `#40668C` for agent or in-progress elements, arrows labeled with what they mean rather than left bare. Consistency here is not decoration — a reader who has seen one PM figure should be able to read the next one without relearning the encoding.

## Formats

SVG is the native format, hand-authored and inspectable, used directly wherever a figure can render inline. Where a raster copy is needed for a deck or an email, PNG is produced by conversion where the tooling exists. Where a full leadership pack needs to ship as a deck, the pptx skill assembles it where installed. Each of these is a capability, not a guarantee: when a conversion path is unavailable, the skill states the degradation and ships the SVG on its own rather than silently failing or producing a lower-quality substitute without saying so.
