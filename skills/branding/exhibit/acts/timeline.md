# The timeline act

The timeline act shows change over time or a sequence of decisions. It serves rule 4 of `JOURNEY.md` by making order the subject, and rule 6 because the line or dated list makes sequence visible.

## Required structure

1. Use `.act-body` with an Alpine `x-data` object for the selected point and its facts.
2. Explain the dependency that forced the order.
3. Add one labeled radio group bound with `x-model`.
4. Add `ol.x-timeline` with one `<time>` or `.x-when` and one explanation per event.
5. Bind the selected consequence into `.x-takeaway` with `x-text` and static defaults.
6. Use `x-morph="state"` on the figure. Its non-SVG form writes `data-state`; an SVG path uses `data-morph-<state>` values.
7. The storyboard commonly declares `motion: [morph]`. Label any dependency arrow with `data-label` and `<title>`.

## Primitives

| Primitive | In this act |
|---|---|
| `ol.x-timeline`, `.x-when`, `<time>` | Keeps the full sequence readable in document order. |
| `x-data`, `x-model`, `x-text` | Stores the selected event and prints its consequence. |
| `x-morph="state"` | Changes a path or applies `data-state`, using the motion plugin when present. |
| `.x-arrow[data-label]` | Marks the one forcing dependency. |

## Figure

Use a horizontal line for up to four points and a vertical line for longer sequences or explorer mode. Mark one forcing dependency. More than one dependency usually calls for a map.

## Interaction and takeaway

Selecting a point changes the figure and takeaway while the complete list remains visible. The control's legend and selected label enter the default export.

## Failure modes

- List and figure order differ → rule 4 fails. Only a reader catches this.
- A dependency arrow lacks a label → `structural.arrows-labeled` fails.
- Duplicate arrowhead ids make malformed markup. Only document review catches this reliably.
- A morph is used but not permitted → `brand.motion` fails or the runtime swaps without a tween.
- A path omits a `data-morph-<state>` value → the figure stays at its prior shape. Only a reader catches this.
- Labels shrink below the profile floor → `brand.min-text-size` or `render.body-text-size` fails.

## Example skeleton

```html
<div class="act-body x-split" x-data="{ phase: 'first', facts: { first: ['Foundation','made the build possible'], second: ['Delivery','made the result usable'] } }">
  <div class="act-prose">
    <p>The foundation had to exist before delivery.</p>
    <div class="x-controls"><fieldset class="x-control"><legend>Phase</legend><div class="x-choice">
      <label><input type="radio" name="phase" value="first" x-model="phase" checked> Foundation</label>
      <label><input type="radio" name="phase" value="second" x-model="phase"> Delivery</label>
    </div></fieldset></div>
    <ol class="x-timeline">
      <li><span class="x-when">Phase 1</span><div><strong>Foundation.</strong> Establish the rules.</div></li>
      <li><span class="x-when">Phase 2</span><div><strong>Delivery.</strong> Apply the rules.</div></li>
    </ol>
    <p class="x-takeaway"><strong x-text="facts[phase][0]">Foundation</strong> <span x-text="facts[phase][1]">made the build possible</span>.</p>
  </div>
  <figure class="x-figure">
    <div x-morph="phase" data-state="first"><article class="x-callout"><h3 x-text="facts[phase][0]">Foundation</h3><p x-text="facts[phase][1]">Made the build possible.</p></article></div>
    <figcaption>The selected phase changes the figure.</figcaption>
  </figure>
</div>
```
