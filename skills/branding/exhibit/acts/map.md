# The map act

The map shows the whole territory before examining one part. It serves rule 4 of `JOURNEY.md`, which requires the argument to climb in order, and rule 6, which says diagrams argue by shape.

## Required structure

1. Use `.act-body`, usually with `x-data="{ selected: 'a', facts: { … } }"`.
2. Put one paragraph in `.act-prose`. Name regions in the order the figure presents them.
3. Add one labeled radio group bound with `x-model`.
4. Add `.x-takeaway` with static defaults and live facts bound through `x-text`.
5. Add `figure.x-figure` with an SVG `<title>` and `<desc>`. Give every `.x-arrow` a `data-label` and a `<title>`.
6. The storyboard commonly declares `motion: [focus, spotlight]`. A `frame:` hint may name a mockup such as `browser`; implement it with `.x-frame[data-frame]`.

## Primitives

| Primitive | In this act |
|---|---|
| `x-data`, `x-model`, `x-text` | Stores the selected region and prints its facts. |
| `x-show` | Shows region-specific detail without rebuilding markup. |
| `x-spotlight` | Dims the page around one selected region when the storyboard declares it. |
| `.x-arrow[data-label]` | Names each handoff in the overview. |
| `.x-frame[data-frame]` | Places a surface mockup named by the storyboard's `frame:` hint. |

## Figure

Match the shape to the relationship: a line for a pipeline, a tree for a hierarchy, or a ring for a cycle. Keep labels at `.x-label` size. Prefer a vertical flow in an explorer layout.

## Interaction and takeaway

Selecting a region changes its emphasis and the takeaway's facts. The control must change information the reader can carry away, as rule 5 requires.

## Failure modes

- Prose and figure use different orders → rule 4 fails. Only a reader catches this.
- An arrow lacks `data-label` → `structural.arrows-labeled` fails.
- A frame name is not documented → `structural.frames-known` fails.
- A literal color falls outside the profile palette → `brand.allowed-colors` fails.
- Series classes appear out of order → `brand.series-order` fails.
- A spotlight is used without a permitted storyboard declaration → `brand.motion` may fail.
- The takeaway stays static → the control breaks rule 5. Only a reader catches this.

## Example skeleton

```html
<div class="act-body x-split" x-data="{
  stage: 'source',
  facts: { source: ['Source','provides rules'], page: ['Page','presents the result'] }
}">
  <div class="act-prose">
    <p>The source provides rules before the page presents the result.</p>
    <div class="x-controls"><fieldset class="x-control">
      <legend>Stage to inspect</legend><div class="x-choice">
        <label><input type="radio" name="map-stage" value="source" x-model="stage" checked> Source</label>
        <label><input type="radio" name="map-stage" value="page" x-model="stage"> Page</label>
      </div>
    </fieldset></div>
    <p class="x-takeaway"><strong x-text="facts[stage][0]">Source</strong> <span x-text="facts[stage][1]">provides rules</span>.</p>
  </div>
  <figure class="x-figure">
    <svg viewBox="0 0 460 240" role="img" aria-labelledby="map-title map-desc">
      <title id="map-title">The path from source to page</title>
      <desc id="map-desc">Two labeled boxes are joined by an arrow.</desc>
      <defs><marker id="x-arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" class="x-ink" style="stroke: none"></path></marker></defs>
      <rect x="30" y="80" width="130" height="60" class="x-series-1"></rect>
      <path d="M160 110 H295" class="x-arrow" data-label="produces"><title>produces</title></path>
      <g x-spotlight="stage === 'page'"><rect x="295" y="80" width="130" height="60" class="x-surface x-line"></rect></g>
    </svg>
    <div class="x-frame" data-frame="browser"><div class="x-frame-screen"><p>Finished page</p></div></div>
    <figcaption>The selected stage receives emphasis.</figcaption>
  </figure>
</div>
```
