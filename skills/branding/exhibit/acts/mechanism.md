# The mechanism act

The mechanism explains how one part works after the map establishes its place. It serves rules 3, 4, 5, and 6 of `JOURNEY.md` by revealing one causal step at a time while one figure follows the current step.

## Required structure

1. Use `.act-body` with `.act-prose` and one `figure.x-figure`.
2. Wrap an ordered `.x-step-list` in `.x-steps` with `x-data="stepper(count)"`.
3. Give each `.x-step` a sequential `data-step`, `.x-step-title`, and `.x-step-body`.
4. Use `@click="prev()"` and `@click="next()"`; bind disabled states with `:disabled="atStart"` and `:disabled="atEnd"`.
5. Print `step` with a static default through `x-text` or `x-count`.
6. Let the figure read the same scope, or place its redraw under an outer model. The storyboard commonly declares `motion: [count, draw, spotlight]`.
7. State the current result in `.x-takeaway`. The default export adds “Step shown,” its position, and `title`.

## Primitives

| Primitive | What it does in this act |
|---|---|
| `stepper(count)` | Exposes `step`, `count`, `next()`, `prev()`, `go(n)`, `atStart`, `atEnd`, and `title`. |
| `.x-step[data-step]` | Defines each numbered panel; the component marks the active one. |
| `@click`, `:disabled`, `x-text` | Operates navigation and reports the current position. |
| `x-draw="step"`, `x-spotlight="…"` | Redraws or emphasizes the active stage when declared. |
| `.x-figure`, `.x-takeaway` | Shows and states the current result. |

## Figure

Use a line for sequence, convergence for aggregation, or fan-out for one-to-many. Keep surrounding stages visible enough to preserve context. Every SVG needs `<title>` and `<desc>`. Every `.x-arrow` needs `data-label`.

## Interaction and takeaway

Previous and next change the component's `step`. The figure and takeaway read that value. This shared state keeps the visible stage aligned with the default export.

## Failure modes

- Steps are numbered out of order → navigation and process order diverge. Only a reader catches the causal error.
- The figure uses private state → visible state and exported state diverge, breaking rule 8.
- A button has no visible text or accessible name → `structural.controls-labeled` fails.
- The SVG lacks a title or an arrow label → `structural.svg-titles` or `structural.arrows-labeled` fails.
- `x-draw` or `x-spotlight` is used outside the permitted motion list → `brand.motion` fails when the grade forbids it.
- A step change leaves the takeaway unchanged → rule 5 fails. Only a reader catches this.

## Example skeleton

```html
<div class="act-body x-split">
  <div class="act-prose">
    <p>Move through the stages to see how one result forms.</p>
    <div class="x-steps" x-data="stepper(2)">
      <ol class="x-step-list">
        <li class="x-step" data-step="1"><h3 class="x-step-title">Collect</h3><div class="x-step-body"><p>Gather the inputs.</p></div></li>
        <li class="x-step" data-step="2"><h3 class="x-step-title">Combine</h3><div class="x-step-body"><p>Produce one result.</p></div></li>
      </ol>
      <div class="x-step-nav">
        <button type="button" class="x-button x-quiet" @click="prev()" :disabled="atStart">Previous</button>
        <button type="button" class="x-button" @click="next()" :disabled="atEnd">Next</button>
        <span class="x-value">Step <span x-text="step">1</span> of 2</span>
      </div>
      <p class="x-takeaway">Step <span x-count="step">1</span> shows the current stage.</p>
      <figure class="x-figure" x-draw="step">
        <svg viewBox="0 0 460 220" role="img" aria-labelledby="mech-title mech-desc">
          <title id="mech-title">Two stages produce one result</title>
          <desc id="mech-desc">The current stage is emphasized.</desc>
          <g x-morph="step" data-state="1"><circle cx="120" cy="110" r="30" class="x-series-1"></circle><circle cx="340" cy="110" r="30" class="x-series-2"></circle></g>
        </svg>
        <figcaption>The figure follows the selected step.</figcaption>
      </figure>
    </div>
  </div>
</div>
```
