# The sandbox act

The sandbox opens every parameter in the model introduced by the hook. It serves rule 7 of `JOURNEY.md`, which says to end in a sandbox, and rule 8 because the exported controls preserve the reader's settings.

## Required structure

1. Use `.act-body`, usually with `x-data="<name>"` registered through `Exhibit.data` because this model is larger.
2. Explain which assumptions earlier acts fixed.
3. Put every parameter in a labeled `.x-control`. Numeric controls use `x-model.number`; displayed settings use `x-text` or `x-count` with defaults.
4. Define presets and reset as methods in the `x-data` object. Buttons call them with `@click`.
5. Bind all current results into `.x-takeaway` and add one challenged assumption in `.x-callout`.
6. Draw the full figure through `<g x-ref>` and `x-effect`. The storyboard commonly declares `motion: [count, morph, draw]`.
7. The default export covers labeled controls. Register `Exhibit.export(id, fn)` only when it would omit a result or preset state. `Exhibit.finish()` settles motion and writes print settings.

## Primitives

| Primitive | In this act |
|---|---|
| `Exhibit.data`, `x-data` | Registers and instantiates the full model. |
| `x-model.number`, `x-text`, `x-count` | Keeps inputs numeric and outputs current. |
| `@click` methods | Applies named presets and reset through the same Alpine state as controls. |
| `x-ref`, `x-effect` | Redraws the full figure from model state. |
| `Exhibit.export(id, fn)`, `Exhibit.finish()` | Handles exceptional export data and stable print output. |

## Figure

Show every stage, series, and reference line the claim depends on. Use series classes in order. Add `.x-wide` and `--figure-min` when labels would shrink below 12px.

## Interaction and takeaway

Every control changes an input. Presets assign those same properties, so controls, figure, takeaway, export, and print remain aligned.

## Failure modes

- A fixed parameter remains hidden → this is a second hook, not a sandbox; rule 7 fails.
- A preset changes private state instead of Alpine properties → controls and export diverge, breaking rule 8.
- There is no reset → the reader cannot recover the stated defaults. Only a reader catches this.
- A range omits `.number` → arithmetic can concatenate strings; `render.boots-clean` catches errors, while a reader checks wrong math.
- An `x-count` has no default → the page is empty before boot. Only a reader catches this.
- The figure uses an off-palette color or reversed series order → `brand.allowed-colors` or `brand.series-order` fails.
- Motion exceeds the storyboard or grade → `brand.motion` fails.

## Example skeleton

```html
<script>
Exhibit.data("sandboxModel", () => ({
  amount: 12, rate: 0.6,
  get result() { return Math.round(this.amount * this.rate); },
  preset(name) { Object.assign(this, name === 'stress' ? { amount: 20, rate: 0.3 } : { amount: 12, rate: 0.6 }); },
  draw(scene) { scene.setAttribute("data-state", String(this.result)); }
}));
</script>
<div class="act-body x-split" x-data="sandboxModel">
  <div class="act-prose">
    <p>The earlier acts fixed both inputs. Change them here.</p>
    <div class="x-controls">
      <div class="x-control"><label for="sb-amount">Items</label><input id="sb-amount" type="range" min="1" max="30" value="12" x-model.number="amount"><span class="x-value" x-text="amount">12</span></div>
      <div class="x-control"><label for="sb-rate">Rate</label><input id="sb-rate" type="range" min="0.1" max="1" step="0.1" value="0.6" x-model.number="rate"><span class="x-value"><span x-count="rate * 100">60</span> percent</span></div>
    </div>
    <div class="x-controls" aria-label="Model presets"><button type="button" class="x-button x-quiet" @click="preset('stress')">Stress case</button><button type="button" class="x-button x-quiet" @click="preset('reset')">Reset</button></div>
    <p class="x-takeaway"><strong x-count="result">7</strong> items pass at these settings.</p>
    <div class="x-callout"><p>The rate is an assumption, not a measured constant.</p></div>
  </div>
  <figure class="x-figure x-wide" style="--figure-min: 28rem">
    <svg viewBox="0 0 460 300" role="img" aria-labelledby="sb-title sb-desc"><title id="sb-title">Items passing at current settings</title><desc id="sb-desc">A bar updates from both controls.</desc><g x-ref="scene" x-effect="draw($refs.scene)"></g></svg>
    <figcaption>The figure uses every exposed input.</figcaption>
  </figure>
</div>
```
