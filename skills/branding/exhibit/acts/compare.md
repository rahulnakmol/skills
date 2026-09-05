# The compare act

The compare act puts two to four options against stated criteria and lets the reader change each criterion's weight. It serves rule 3 of `JOURNEY.md` by making one ranking claim, rule 5 by making the ranking respond, and rule 2 by identifying scores as judgments.

## Required structure

1. Use `.act-body`; the table is the figure.
2. Explain the options, criteria, scale, and source of the scores in `.act-prose` and `details.x-more`.
3. Put `x-data="compare({ weights, scores, labels })"` on `.x-compare-wrap`.
4. Use `table.x-compare`, option headers with `data-option`, score cells with `data-score`, and totals bound with `x-text`.
5. Give every weight range a `<label for>` and `x-model.number`.
6. Bind `leader` and `ranking` into `.x-takeaway` with static defaults. The storyboard commonly declares `motion: [count]` when totals count to new values.

## Primitives

| Primitive | In this act |
|---|---|
| `compare({weights,scores,labels})` | Exposes `weights`, `scores`, `labels`, `totals`, `ranked`, `leader`, and `ranking`. |
| `x-model.number` | Reweights a criterion as a number. |
| `x-text`, `x-count` | Prints totals and ranking with static defaults. |
| `data-option`, `data-score`, `data-total` | Identifies columns and cells that the component marks. |
| `.x-compare-wrap` | Lets the table scroll on narrow screens. |

## Figure

Keep three to five criteria and two to four options. Word every criterion so a higher score is better. The component marks the leader's column and the default export adds the current ranking.

## Interaction and takeaway

Changing a weight recomputes all totals. The takeaway reads `leader` and `ranking`, so the visible conclusion and export agree.

## Failure modes

- Score cells do not follow header order → totals describe the wrong options. Only a reader checking the matrix catches it.
- A weight lacks a label → `structural.controls-labeled` fails.
- A range omits `.number` → weighted arithmetic can use string values; a reader catches wrong totals, while `render.boots-clean` catches thrown errors.
- Scores have no source → rule 2 fails. Only a reader catches this.
- Series colors appear out of order → `brand.series-order` fails.
- Text is compressed below the profile floor → `brand.min-text-size` or `render.body-text-size` fails.

## Example skeleton

```html
<div class="act-body">
  <div class="act-prose"><p>Two options are scored from 1 to 5. Higher is better.</p><details class="x-more"><summary>Where the scores come from</summary><p>The scores are stated judgments.</p></details></div>
  <figure class="x-figure"><div class="x-compare-wrap" x-data="compare({ weights: { cost: 3, fit: 2 }, scores: { a: { cost: 2, fit: 4 }, b: { cost: 4, fit: 1 } }, labels: { a: 'Option A', b: 'Option B' } })">
    <table class="x-compare">
      <caption class="x-visually-hidden">Two options on two weighted criteria</caption>
      <thead><tr><th scope="col">Criterion</th><th scope="col">Weight</th><th scope="col" data-option="a">Option A</th><th scope="col" data-option="b">Option B</th></tr></thead>
      <tbody>
        <tr><th scope="row">Cost</th><td><label class="x-visually-hidden" for="cmp-cost">Weight for cost</label><input id="cmp-cost" type="range" min="0" max="5" value="3" x-model.number="weights.cost"></td><td data-score>2</td><td data-score>4</td></tr>
        <tr><th scope="row">Fit</th><td><label class="x-visually-hidden" for="cmp-fit">Weight for fit</label><input id="cmp-fit" type="range" min="0" max="5" value="2" x-model.number="weights.fit"></td><td data-score>4</td><td data-score>1</td></tr>
      </tbody>
      <tfoot><tr><th scope="row">Total</th><td></td><td data-total x-text="totals.a">14</td><td data-total x-text="totals.b">14</td></tr></tfoot>
    </table>
    <p class="x-takeaway">The leader is <strong x-text="leader">a tie</strong>. Ranking: <span x-text="ranking">Option A = Option B</span>.</p>
  </div><figcaption>Each total is score times weight, summed by column.</figcaption></figure>
</div>
```
