# The hook act

The hook opens every page. It gives the reader one direct experience before it explains the subject. It serves rule 1 of `JOURNEY.md`, which says to open with the question and a first experience, and prepares rule 7 by introducing the model that the sandbox later opens up.

## Required structure

1. Use `.act-body`, usually with `x-data="{ … }"`. For a larger model, use `x-data="<name>"` and register it with `Exhibit.data("<name>", () => ({ … }))`.
2. Put no more than two short paragraphs in `.act-prose`. State the model's assumptions in numbers.
3. Put one labeled control in `.x-controls`. Bind numeric inputs with `x-model.number`; use a `<label for>` or `<legend>`.
4. Add `.x-takeaway`. Bind its live values with `x-text` or `x-count`, and write static defaults inside those elements.
5. Add `figure.x-figure` with an SVG `<title>` and `<desc>`. A generated figure uses `<g x-ref>` and draws from `x-effect`.
6. The storyboard commonly declares `motion: [reveal, count, draw, highlight]`. Use only the declared effects except `x-reveal`, which every grade permits.

## Primitives

| Primitive | In this act |
|---|---|
| `x-data` or `Exhibit.data` | Holds the input, derived getters, and a figure method in one Alpine model. |
| `x-model.number` | Keeps a range or number input numeric. |
| `x-text`, `x-count` | Prints current values; `data-decimals` fixes counter precision. |
| `x-ref`, `x-effect` | Gives the model an SVG group and redraws it when read state changes. |
| `x-reveal.stagger`, `x-draw`, `x-highlight` | Applies the storyboard's governed reveal, stroke, and emphasis effects. |
| `.x-takeaway` | States the result at the current setting. |

## Figure

Use a small, literal figure: a row of nodes, a grid, or one bar. Show state, not history. Use about 460 viewBox units in a split layout. Add `.x-wide` and `--figure-min` only when labels would otherwise shrink below 12px.

## Interaction and takeaway

The control, figure, and takeaway must read the same Alpine state. The default export records the control and takeaway. Use `Exhibit.export("hook", fn)` only when the default export omits a result the reader needs.

## Failure modes

- The act opens with a definition → it breaks rule 1. Only a reader catches this.
- The control changes appearance but not the stated result → it breaks rule 5. Only a reader catches this.
- A range uses `x-model` without `.number` → arithmetic can concatenate strings and print the wrong result; `render.boots-clean` may catch a thrown error, but a reader must check the math.
- A getter mutates state → Alpine can re-evaluate in a loop; `render.boots-clean` catches resulting runtime errors.
- An `x-count` target has no static default → the page reads empty before scripts run. Only a reader catches this.
- A motion directive is used but absent from storyboard `motion:` → its plugin can fall back and `brand.motion` may fail when the grade forbids it. A declared effect that is unused adds a plugin for no purpose.
- The control lacks a label → `structural.controls-labeled` fails.
- The SVG lacks a `<title>` → `structural.svg-titles` fails.

## Example skeleton

```html
<script>
Exhibit.data("hookModel", () => ({
  kept: 4,
  get result() { return this.kept * 3; },
  draw(scene) { scene.setAttribute("data-state", String(this.kept)); }
}));
</script>
<div class="act-body x-split" x-data="hookModel">
  <div class="act-prose" x-reveal.stagger>
    <p>Each kept review catches three claims in this small model.</p>
    <div class="x-controls"><div class="x-control">
      <label for="hook-kept">Reviews kept</label>
      <input id="hook-kept" type="range" min="0" max="4" value="4" x-model.number="kept">
      <span class="x-value"><span x-text="kept">4</span> of 4</span>
    </div></div>
    <p class="x-takeaway">With <span x-count="kept">4</span> reviews, <strong x-count="result">12</strong> claims are checked.</p>
  </div>
  <figure class="x-figure" x-draw="kept">
    <svg viewBox="0 0 460 240" role="img" aria-labelledby="hook-title hook-desc">
      <title id="hook-title">Claims checked by the reviews kept</title>
      <desc id="hook-desc">The figure changes as reviews are removed.</desc>
      <g x-ref="scene" x-effect="draw($refs.scene)"></g>
    </svg>
    <figcaption>The model and figure use the same setting.</figcaption>
  </figure>
</div>
```
