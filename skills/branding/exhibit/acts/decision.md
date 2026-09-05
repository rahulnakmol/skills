# The decision act

The decision act states the recommendation and asks the reader to mark it. It serves rule 2 of `JOURNEY.md` by tying the recommendation to evidence and naming what would change it. It serves rule 8 because choices and notes enter the export.

## Required structure

1. Use `.act-body` with `x-data="decision(['id', …])"`.
2. Explain the decision and export behavior in `.act-prose`.
3. Add `.x-callout` with the recommendation, accepted trade-off, and condition that would change it.
4. Bind `agree`, `object`, and `open` into `.x-takeaway` with `x-text` and static defaults.
5. Add `.x-decision` with two to four `.x-option[data-option]` articles.
6. Give each option a distinct radio `name`, bind its group to `view.<id>`, and bind a labeled textarea to `note.<id>`.
7. The act usually needs no storyboard motion. If the storyboard adds `reveal`, apply `x-reveal` to the options.

## Primitives

| Primitive | In this act |
|---|---|
| `decision([ids])` | Exposes `view`, `note`, `agree`, `object`, `other`, and `open`. |
| `x-model` | Stores each option's view and note. |
| `.x-option[data-option]` | Receives `data-view` from the component. |
| `x-text` | Prints current counts with static defaults. |
| `.x-callout`, `.x-takeaway` | States the recommendation and summarizes reader responses. |

## Figure

The equally structured options are the figure. State “For” and “Against” for each. Put the recommendation in the callout rather than encoding it only through style.

## Interaction and takeaway

The component marks each option and updates the counts. The default export prefixes controls with the option heading and skips empty notes.

## Failure modes

- The recommendation has no condition that would change it → rule 2 fails. Only a reader catches this.
- Two options share one radio `name` → selecting one clears the other. A reader or interaction test catches it.
- A textarea lacks a label → `structural.controls-labeled` fails.
- A default radio is checked → the export records a view the reader did not give. Only a reader catches this.
- A getter or method mutates `view` while counts are read → Alpine may loop; `render.boots-clean` catches resulting errors.
- Controls are too small → `render.tap-targets` fails.

## Example skeleton

```html
<div class="act-body" x-data="decision(['first','second'])">
  <div class="act-prose">
    <p>Mark each option. The export preserves each mark and note.</p>
    <div class="x-callout"><p><strong>Recommended: the first option.</strong> It accepts added upkeep. This changes if upkeep exceeds the documented benefit.</p></div>
    <p class="x-takeaway"><strong x-text="agree">0</strong> agreed, <strong x-text="object">0</strong> objected, and <strong x-text="open">2</strong> remain open.</p>
  </div>
  <div class="x-decision">
    <article class="x-option" data-option="first"><h3>Choose the first option</h3><p><strong>For:</strong> one review. <strong>Against:</strong> added upkeep.</p>
      <fieldset class="x-control"><legend>Your view</legend><div class="x-choice">
        <label><input type="radio" name="dec-first" value="agree" x-model="view.first"> Agree</label><label><input type="radio" name="dec-first" value="object" x-model="view.first"> Object</label><label><input type="radio" name="dec-first" value="other" x-model="view.first"> Something else</label>
      </div></fieldset><label for="dec-first-note">Note</label><textarea id="dec-first-note" x-model="note.first"></textarea>
    </article>
    <article class="x-option" data-option="second"><h3>Choose the second option</h3><p><strong>For:</strong> less upkeep. <strong>Against:</strong> separate reviews.</p>
      <fieldset class="x-control"><legend>Your view</legend><div class="x-choice">
        <label><input type="radio" name="dec-second" value="agree" x-model="view.second"> Agree</label><label><input type="radio" name="dec-second" value="object" x-model="view.second"> Object</label><label><input type="radio" name="dec-second" value="other" x-model="view.second"> Something else</label>
      </div></fieldset><label for="dec-second-note">Note</label><textarea id="dec-second-note" x-model="note.second"></textarea>
    </article>
  </div>
</div>
```
