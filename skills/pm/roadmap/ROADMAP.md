# Roadmapping

A roadmap earns its place by showing the sequencing decision, not just a list of initiatives against a calendar — a timeline with no rationale for its order is a wish list wearing a roadmap's clothes.

## Horizons

Work is grouped into three horizons — now, next, and later — rather than committed dates that age badly. Now is what is actively being delivered this cycle; next is scoped and roughly sized, waiting on capacity; later is directional, named but not yet broken down. An item does not move from later to next by being older, only by being ready.

## Outcome linkage

Every item on the roadmap traces to an outcome, not just an output — the OKR or benefit it is meant to move, not merely the feature being shipped. An item with no outcome linkage is a wish, and a roadmap that is mostly wishes cannot tell a sponsor why this sequence and not another.

## Sequencing rules

Sequencing is driven by dependency and by stated capacity, not by whichever stakeholder asked most recently. An item blocked by a dependency on another team's unfinished work moves later regardless of its own priority; an item with no dependency and clear capacity moves earlier. The dependency board itself is maintained in `raid`, and roadmap sequencing reads directly from it rather than keeping a second, silently diverging copy.

## PI planning

Where the practice runs Program Increment planning, the roadmap carries PI objectives tied to outcomes, an iteration-level mapping of the now-horizon work, the same dependency board from `raid` reused rather than re-derived, and stated team capacity per iteration. The PI review at the end of the increment feeds directly into `realize` — what was delivered, what slipped, and why — so the next planning cycle starts from evidence instead of memory.
