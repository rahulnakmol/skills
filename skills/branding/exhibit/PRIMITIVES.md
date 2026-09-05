# Primitives: what an author writes inside an act

`scaffold.mjs` writes the shell: the brand's tokens, the chrome, the masthead, navigation, the export bar, one empty section per storyboard act, the pinned vendor scripts, and the runtime. The agent writes the acts. This document lists everything the shell provides for that, so an act is written against one documented surface rather than wired by hand.

The page runs on three libraries and one runtime. Alpine.js holds state and binds it to the DOM. GSAP with ScrollTrigger moves things, under the brand's motion rules. htmx is present for a page that later gains a server, but a finished exhibit page fetches nothing, and `structural.single-file` fails an `hx-get` to the network. The runtime (`scripts/runtime.js`) adds the components and directives named below. An author uses Alpine's own directives for state and the runtime's for motion, and never writes a tween or a transition by hand.

## Where an act goes

Each act is a `<section class="act" data-act="<id>" data-type="<type>">` with a header the scaffold wrote: the kicker (`Act N · Type`) and the `<h2>` claim from the storyboard. When the storyboard lists `motion` for the act, the section carries `data-motion="draw count"`; when it names a `frame`, `data-frame-hint`. Between two comments,

```html
<!-- exhibit:begin hook -->
<!-- exhibit:end hook -->
```

the author places the act body. `verify.mjs` fails `structural.acts-authored` when that span is empty and `structural.acts-match-storyboard` when the sections do not match the storyboard in order. Nothing outside the markers is edited; a change to the shell goes through the scaffold.

## Layout

| Class | Use |
|---|---|
| `.act-body` | Grid wrapper for an act's content. One column. |
| `.act-body.x-split` | Two columns from 64rem up: prose left, figure right. Collapses to one column below, and stacks at every width when its figure is `x-wide`. |
| `.act-prose` | Paragraph column, capped at 40em. |
| `.x-callout` | A surface-colored aside with the accent as its left rule. |
| `details.x-more` | Native disclosure for optional depth; works without JavaScript. |
| `.x-button`, `.x-button.x-quiet` | A 44px button in the action color, or an outlined one. |
| `.x-visually-hidden` | Text for assistive technology only, such as a label for a control whose meaning the table header already shows. |

## State: Alpine directives

An act's state lives in an `x-data` object on the act body, or on any wrapper inside it. Controls write to it with `x-model`; text reads it with `x-text`; a figure redraws in `x-effect`. These are Alpine's own directives, listed here because they are the whole state surface an act uses.

| Directive | Behavior |
|---|---|
| `x-data="{ gates: 4, mode: 'independent' }"` | Declares the act's state. Getters (`get risk() { … }`) derive values; a method holds a model. |
| `x-model="gates"` | Two-way binding on an `<input>`, `<select>`, or `<textarea>`. Add `.number` for a range or number input so the model holds a number, not a string. Radios in one group share a name and one `x-model`. |
| `x-text="risk"` | Prints an expression whenever it changes. Write the static default inside the element so the page reads correctly before scripts run. |
| `x-show="mode === 'same'"` | Shows or hides an element. Prefer it to rebuilding markup. |
| `x-effect="draw($refs.scene, gates, mode)"` | Runs whenever anything it reads changes; a figure's redraw goes here. |
| `x-ref="scene"` and `$refs.scene` | A handle on an element, such as the `<g>` a figure draws into. |
| `x-for="row in rows"` on a `<template>` | Repeats markup for a list. |
| `@input`, `@click`, `@keydown.enter` | Event handlers. Runtime components dispatch `step:change`, `act:enter`, and `act:exit` for an act that reacts to them. |
| `x-cloak` | Hides an element until Alpine has initialized it. |

The body carries `x-data="exhibitPage"` (set by the runtime), so a directive placed anywhere in the page has a scope, and `$data.act` names the act in view.

Markup for controls, so `structural.controls-labeled` passes and the export can name each value:

```html
<div class="act-body" x-data="{ gates: 4, mode: 'independent', get risk() { return (4 - this.gates) * (this.mode === 'same' ? 1.5 : 1); } }">
  <div class="x-controls">
    <div class="x-control">
      <label for="hook-gates">Gates kept</label>
      <input id="hook-gates" type="range" min="0" max="4" value="4" x-model.number="gates">
      <span class="x-value"><span x-text="gates">4</span> of 4</span>
    </div>
    <fieldset class="x-control">
      <legend>How the reviewers relate</legend>
      <div class="x-choice">
        <label><input type="radio" name="hook-mode" value="independent" x-model="mode" checked> Independent views</label>
        <label><input type="radio" name="hook-mode" value="same" x-model="mode"> Same model</label>
      </div>
    </fieldset>
  </div>
  <p class="x-takeaway">With <span x-text="gates">4</span> gates kept the risk score is <span x-count="risk" data-decimals="1">0.0</span>.</p>
</div>
```

A model with more than a few lines goes in an inline `<script>` inside the act that registers a component with `Exhibit.data("hookModel", () => ({ … }))`; the act body then uses `x-data="hookModel"`. `Exhibit.data` is available anywhere in the body because the boot shim runs in `<head>`; the runtime registers the component with Alpine before Alpine starts.

## Motion: the runtime's directives

Motion is governed by the brand. The profile's `motion.grade` (`calm`, `fluid`, or `expressive`) decides which effects exist, `motion.forbid` removes named ones, and `prefers-reduced-motion` removes all of them at run time. Durations and curves come from the tokens `--brand-motion-*` and `--brand-ease-*`, which the runtime also registers as GSAP eases `brand-standard`, `brand-enter`, and `brand-exit`. An author names an effect with a directive and never tunes it. `<html>` carries `data-grade`, `data-register`, `data-motion-forbid`, and `data-motion="on|off"`.

| Directive | Effect | Behavior |
|---|---|---|
| `x-reveal`, `x-reveal.stagger` | `reveal` | Opacity and a short rise when the element scrolls in, once. `.stagger` reveals the children in sequence. Before the reveal the element is hidden only while `data-motion="on"`, so a page without scripts still reads. |
| `x-parallax="0.5"` | `parallax` | The element travels the factor times the brand's parallax depth times the viewport height while its container scrolls past. Expressive grade only; the masthead's layers use it. |
| `x-count="risk"` | `count` | The number runs from its last value to the new one. `data-decimals="1"` fixes the precision; otherwise the target's own precision is kept. The first value is set at once. |
| `x-draw`, `x-draw="step"` | `draw` | Every stroked path, line, polyline, circle, ellipse, and rect inside is stroked in when the figure enters; with an expression, again on each change. Uses DrawSVGPlugin when the page carries it, which the scaffold inlines only when an act listed `draw`; otherwise a dash-offset fallback. |
| `x-morph="state"` | `morph` | On an SVG `<path>`, morphs to the `d` held in `data-morph-<state>`; on any other element, sets `data-state="<state>"` and, with Flip present, moves the children to their new places. |
| `x-highlight`, `x-highlight="step === 2"` | `highlight` | A marker sweeps under the text on enter, or while the expression is truthy. The shell draws it from the accent through `--x-highlight`. |
| `x-spotlight="step === 3"` | `spotlight` | While truthy, the page dims except this element; a fixed mask with a cut-out follows it on scroll. Use it for one element at a time. |
| `x-scene` on the act's `<section>`, `data-scene` on children | scene | In the cinematic register at the expressive grade, each `[data-scene]` child appears in turn, tied to scroll position. In other registers the children simply reveal. |

The `motion` list in a storyboard act names the effects the act will use, so the scaffold can inline only the GSAP plugins those effects need and refuse an effect the brand forbids. `brand.motion` in `verify.mjs` fails a directive the grade does not permit and a `data-motion` list the profile forbids.

`Exhibit.allows("draw")` answers whether an effect is live on this page, for an act script that draws differently when it is not. `Exhibit.finish()` brings every animation to rest and writes each control block's settings as a line the print stylesheet shows; the runtime calls it before print, and `verify.mjs --pdf` calls it before printing.

## Figures

```html
<figure class="x-figure" x-draw>
  <svg viewBox="0 0 460 340" role="img" aria-labelledby="chart-title chart-desc">
    <title id="chart-title">One sentence naming what the figure shows</title>
    <desc id="chart-desc">What a reader who cannot see it needs to know</desc>
    <g x-ref="scene" x-effect="draw($refs.scene, gates)"></g>
  </svg>
  <figcaption>What the colors and marks mean.</figcaption>
</figure>
```

The runtime adds a "Copy figure as SVG" button to every `figure.x-figure` that holds an SVG. `structural.svg-titles` requires the `<title>`.

Size the `viewBox` to the width the figure will render at, so that 13px labels stay 13px: about 460 wide for one column of a split layout, about 820 for a full-width figure. On a narrow screen a figure shrinks with its column; add `x-wide` and set `--figure-min` to the width at which the smallest label is still 12px, and the figure scrolls sideways instead of shrinking below it. `.x-figure.x-bleed` runs the figure to the edges of the act.

```html
<figure class="x-figure x-wide" style="--figure-min: 28rem">
```

`--figure-min` is an author knob, not a token; anything named `--x-*` or `--brand-*` defined outside the shell fails `structural.tokens-in-shell`.

SVG classes, each resolving to a brand token:

| Class | Token | Use |
|---|---|---|
| `.x-series-1` … `.x-series-4` | `accent`, `focus`, `success`, `warning` | Fill and stroke for chart series, in the brand system's fixed order. Use 1 before 2; `brand.series-order` checks the sequence. |
| `.x-ink`, `.x-muted`, `.x-border` | `ink`, `ink-muted`, `border` | Fill and stroke. |
| `.x-surface`, `.x-surface-strong`, `.x-canvas`, `.x-action` | the matching color roles | Fill for panels, backgrounds, and the one emphasized shape. |
| `.x-line` | `ink` | 1.5px stroke, no fill: axes and rules. Add `stroke-dasharray` for a reference line. |
| `.x-arrow` | `ink` | As `.x-line`, with an arrowhead. Every `.x-arrow` needs `data-label="verb"` and should carry a `<title>`; `structural.arrows-labeled` checks the attribute. |
| `.x-label`, `.x-label-muted`, `.x-on-fill` | `ink`, `ink-muted`, `action-ink` | Text at 13px, 12px, and 13px. Use `.x-label` for anything the reader must read. |

The arrowhead marker is defined once per page, in the first SVG that needs it:

```html
<defs>
  <marker id="x-arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" class="x-ink" style="stroke: none"></path>
  </marker>
</defs>
```

Color in a figure comes from these classes or from `var(--brand-…)` in an attribute. A literal hex value passes `brand.allowed-colors` only if it is in the variant's light or dark palette. `color-mix()` passes only when every color in it is a brand token or `transparent`.

## Frames: mockups of a surface

A frame renders a figure inside a realistic surface drawn from brand tokens, for an act that shows what a design would look like in place: a screen, a post, a page, a sign. The frame is the container; `.x-frame-screen` is the content area.

```html
<div class="x-frame" data-frame="phone">
  <div class="x-frame-screen">
    <!-- the UI, an SVG, or prose -->
  </div>
</div>
```

| `data-frame` | Surface | Notes |
|---|---|---|
| `phone`, `tablet`, `laptop` | Device screens | Rounded device body, inset screen. |
| `browser` | A browser window | Add `<div class="x-frame-chrome"><span></span><span></span><span></span><div class="x-frame-url">example.com</div></div>` as the first child of the screen. |
| `social-square`, `social-story` | Social posts | `social-story` reserves the platform's safe area; add `<div class="x-safe"></div>` inside the screen to show it. |
| `email` | An email client | `data-images="off"` on the frame hides images and SVGs, the state a client with images blocked shows. |
| `print-a4`, `print-letter` | A printed page | Crop marks and a dashed margin; the screen is the page. |
| `video-16x9`, `video-9x16` | A video still | `<div class="x-safe"></div>` marks the title-safe area; `<div class="x-lower-third"><h3>Name</h3><p>Role</p></div>` is the caption band. |
| `sign` | Signage | The action color as background, display type centered. |

A set of states for one frame goes in `.x-frame-states` above it: buttons that set the state, and `x-morph="state"` or `x-show` on the screen contents. `structural.frames-known` fails a `data-frame` value not in this table.

## Stepper (mechanism acts)

A stepper shows one step of a process at a time. The wrapper is an Alpine component, `stepper(count)`; a figure can read `step` from the same scope.

```html
<div class="x-steps" x-data="stepper(4)">
  <ol class="x-step-list">
    <li class="x-step" data-step="1">
      <h3 class="x-step-title">Read the storyboard</h3>
      <div class="x-step-body"><p>What happens in this step.</p></div>
    </li>
    <li class="x-step" data-step="2">…</li>
  </ol>
  <div class="x-step-nav">
    <button type="button" class="x-button" @click="prev()" :disabled="atStart">Previous</button>
    <button type="button" class="x-button" @click="next()" :disabled="atEnd">Next</button>
    <span class="x-value">Step <span x-text="step">1</span> of 4</span>
  </div>
</div>
```

The component exposes `step`, `count`, `next()`, `prev()`, `go(n)`, `atStart`, `atEnd`, and `title`. The active panel gets `data-active` and `aria-current="step"`; the others hide their `.x-step-body`. Arrow Left and Arrow Right move the step when focus is inside the wrapper. The wrapper receives `data-steps` and `data-step-count`, and dispatches `step:change`. In print every step body is shown. The export names the step shown: `- Step shown: 2 of 4, <title>`.

## Weighted comparison (compare acts)

A compare act is a table the reader can re-weight. The component `compare({ weights, scores, labels })` multiplies each criterion's weight by each option's score, sums the columns, and marks the leader.

```html
<div class="x-compare-wrap" x-data="compare({ weights: { cost: 3, speed: 2 }, scores: { a: { cost: 2, speed: 4 }, b: { cost: 4, speed: 1 } }, labels: { a: 'Option A', b: 'Option B' } })">
  <table class="x-compare">
    <thead><tr><th scope="col">Criterion</th><th scope="col">Weight</th>
      <th scope="col" data-option="a">Option A</th><th scope="col" data-option="b">Option B</th></tr></thead>
    <tbody>
      <tr><th scope="row">Cost</th>
        <td><label class="x-visually-hidden" for="cmp-w-cost">Weight for cost</label>
            <input id="cmp-w-cost" type="range" min="0" max="5" x-model.number="weights.cost"></td>
        <td data-score>2</td><td data-score>4</td></tr>
    </tbody>
    <tfoot><tr><th scope="row">Total</th><td></td>
      <td data-total x-text="totals.a">0</td><td data-total x-text="totals.b">0</td></tr></tfoot>
  </table>
  <p class="x-takeaway">At these weights the leader is <span x-text="leader">Option B</span>.</p>
</div>
```

The component exposes `weights`, `scores`, `labels`, `totals`, `ranked`, `leader` (a label, or `a tie`), and `ranking` (`Option B > Option A`). It sets `data-compare` on the wrapper and `data-leader` on the leading column's header and cells. The export adds `- Ranking at these weights: …`. The `.x-compare-wrap` scrolls sideways on a narrow screen instead of breaking the table.

## Series toggles and legend (evidence acts)

A legend the reader can use to hide a series or look at one on its own is the component `legend(selector)`:

```html
<fieldset class="x-legend" x-data="legend('#evidence-figure')">
  <legend class="x-visually-hidden">Series shown</legend>
  <label><input type="checkbox" data-series="1" checked> <span class="x-swatch x-series-1"></span> Reviewed</label>
  <label><input type="checkbox" data-series="2" checked> <span class="x-swatch x-series-2"></span> Not reviewed</label>
</fieldset>
<figure class="x-figure" id="evidence-figure">…</figure>
```

Unchecking a box sets `data-hidden` on every `.x-series-n` element in the target, which the shell hides. Hovering or focusing a legend item sets `data-focus="n"` on the target, and the shell dims every other series; this is the `focus` effect, and a brand that forbids it keeps the toggles without the dimming. The component exposes `shown`, `focus`, and `visible`, and sets `data-series-toggle` on the fieldset.

## Decision (decision acts)

A decision act asks the reader to mark each option. The component `decision([ids])` holds a view and a note per option; each option carries `data-option="<id>"`, a heading, and a radio group bound to `view.<id>` with the values `agree`, `object`, and `other`.

```html
<div class="x-decision" x-data="decision(['profile', 'exhibit'])">
  <article class="x-option" data-option="profile">
    <h3>Keep the profile beside the brand skill</h3>
    <p>The reasoning the reader is asked to judge.</p>
    <fieldset class="x-control"><legend>Your view</legend>
      <div class="x-choice">
        <label><input type="radio" name="dec-profile" value="agree" x-model="view.profile"> Agree</label>
        <label><input type="radio" name="dec-profile" value="object" x-model="view.profile"> Object</label>
        <label><input type="radio" name="dec-profile" value="other" x-model="view.profile"> Something else</label>
      </div>
    </fieldset>
    <label for="dec-profile-note">Note</label>
    <textarea id="dec-profile-note" x-model="note.profile"></textarea>
  </article>
  <p class="x-takeaway"><span x-text="agree">0</span> agreed, <span x-text="object">0</span> objected, <span x-text="open">2</span> open.</p>
</div>
```

The component mirrors each choice onto its option as `data-view`, which the shell colors on the left rule, and exposes the counts `agree`, `object`, `other`, and `open`. In the export, a control inside an option is prefixed with the option's heading (`- Keep the profile … / Your view: Agree`), and an empty note is skipped.

## Timeline and glossary

| Class | Use |
|---|---|
| `ol.x-timeline` | One `<li>` per event: a `<time>` or `.x-when` in the first column, prose in the second. |
| `dl.x-glossary` | Terms in `<dt>`, definitions in `<dd>`; two columns from 48rem up. |

## Registers and delivery modes

The register sets how much the page moves and how the masthead is built; the mode sets how acts are laid out. Both are attributes on `<html>` the shell's CSS reads; act markup is the same in every combination.

| Register | What changes |
|---|---|
| `document` | A compact masthead, no scene layers, reveals only. The ceiling for a `calm` brand. |
| `product` | The masthead with its layers, reveals with a rise, morphs and draws. The ceiling for a `fluid` brand. |
| `cinematic` | A full-height masthead with parallax layers, scroll-tied scenes, and one act per page in print. Needs the `expressive` grade. |

| Mode | What changes |
|---|---|
| `scroll` | The default. Side navigation, acts in one column, progress bar. |
| `deck` | One act per screen with scroll snapping; the act list becomes a horizontal bar under the masthead; Arrow keys, Page Up and Down, and Space move between acts. Prints one act per page. |
| `explorer` | The figure in each act sticks to the top while the prose scrolls; from 64rem the act body splits with the figure on the wider right column. |

## Takeaway, export, and print

| Class or method | Behavior |
|---|---|
| `.x-takeaway` | The act's one-sentence conclusion, drawn with the accent rule. Bind numbers into it with `x-text` or `x-count` so it states the current model. |
| Default export | For each act, the export bar emits the `<h2>` claim, one line per control (`- <label>: <value>`; a radio group as `- <legend>: <chosen label>`), the step shown, the ranking at the current weights, the series shown, and the takeaway as a quote. |
| `Exhibit.export(id, fn)` | Replaces the default for one act. `fn(sectionElement, Alpine)` returns markdown. |
| `Exhibit.toMarkdown()` | The whole page's export, as the button produces it. |
| `Exhibit.ready(fn)` | Runs `fn(Alpine)` once Alpine has initialized the page. |
| `Exhibit.finish()` | Every animation at rest, `.x-print-settings` written under each control block, `data-finished` on `<html>`. Runs before print. |

The export button copies to the clipboard where the browser allows it and always fills the textarea under it, so the reader has the text either way. In print, controls are hidden and each block's settings line is shown in their place; a page in `deck` mode or the `cinematic` register puts each act on its own page. `verify.mjs --pdf` prints the page and checks the result, which is the file the `press` skill takes for a print edition.

## Page text

Text inside an act follows the brand's voice, not this repository's house voice. When the profile has a `voice.avoid` list, `verify.mjs` checks the page text against it; the rest of the brand's voice guidance is the author's to apply by reading it.
