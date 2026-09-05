# The evidence act

The evidence act shows the data behind an earlier claim. It serves rule 2 of `JOURNEY.md` by attributing the point of view to evidence, and rule 4 by placing support after the claim it supports.

## Required structure

1. Use `.act-body` with prose that states what was measured, how, and when.
2. Add `details.x-more` with the values and source.
3. Add `.x-takeaway` that states the finding and its limit. Bind computed numbers with `x-text` or `x-count` and include defaults.
4. Give the figure an `id`. Put a labeled `fieldset.x-legend` nearby with `x-data="legend('#id')"` and checked `data-series` boxes.
5. Add an SVG `<title>` and `<desc>`, readable labels, and series classes in order.
6. The storyboard commonly declares `motion: [focus, draw]`. Static data needs no custom model.

## Primitives

| Primitive | In this act |
|---|---|
| `legend(selector)` | Exposes `shown`, `focus`, and `visible`; hides or focuses target series. |
| `input[data-series]` | Toggles one numbered series. |
| `.x-swatch.x-series-n`, `.x-series-n` | Connects legend keys and marks in fixed series order. |
| `x-draw` | Draws stroked chart marks when declared and allowed. |
| `.x-line`, `.x-label`, `.x-label-muted` | Draws axes and readable chart text. |

## Figure

Use bars for category counts, lines for change over time, and dots for paired measures. Label values directly. Draw zero values rather than omitting them.

## Interaction and takeaway

The legend changes the view, not the finding. The default export records visible series through the component's `visible` getter and quotes the takeaway.

## Failure modes

- Series 2 appears before series 1 → `brand.series-order` fails.
- A literal mark color is outside the palette → `brand.allowed-colors` fails.
- The root SVG has no title → `structural.svg-titles` fails.
- SVG labels are too small → `brand.min-text-size` can catch CSS sizes; a reader must also inspect scaled SVG text.
- Legend controls are too small to tap → `render.tap-targets` fails.
- The finding generalizes past the source → rule 2 fails. Only a reader catches this.
- `x-draw` is forbidden by the grade → `brand.motion` fails.

## Example skeleton

```html
<div class="act-body x-split">
  <div class="act-prose">
    <p>A dated source counted both series.</p>
    <details class="x-more"><summary>The counts</summary><p>Group A contains 9 reviewed and 4 unreviewed items.</p></details>
    <p class="x-takeaway"><strong>9</strong> of <strong>13</strong> items were reviewed in this sample.</p>
  </div>
  <div>
    <fieldset class="x-legend" x-data="legend('#evidence-figure')">
      <legend class="x-visually-hidden">Series shown</legend>
      <label><input type="checkbox" data-series="1" checked> <span class="x-swatch x-series-1"></span> Reviewed</label>
      <label><input type="checkbox" data-series="2" checked> <span class="x-swatch x-series-2"></span> Unreviewed</label>
    </fieldset>
    <figure class="x-figure" id="evidence-figure" x-draw>
      <svg viewBox="0 0 460 280" role="img" aria-labelledby="ev-title ev-desc">
        <title id="ev-title">Reviewed and unreviewed items</title><desc id="ev-desc">Two bars show 9 reviewed and 4 unreviewed items.</desc>
        <line x1="40" y1="230" x2="430" y2="230" class="x-line"></line>
        <g><title>Group A: 9 reviewed and 4 unreviewed</title><rect x="100" y="50" width="80" height="180" class="x-series-1"></rect><rect x="220" y="150" width="80" height="80" class="x-series-2"></rect></g>
        <text x="140" y="42" text-anchor="middle" class="x-label">9</text><text x="260" y="142" text-anchor="middle" class="x-label">4</text>
      </svg>
      <figcaption>Toggle a series to inspect the other.</figcaption>
    </figure>
  </div>
</div>
```
