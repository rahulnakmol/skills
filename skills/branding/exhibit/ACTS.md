# The act grammar

A storyboard is built from nine act types. Each type has a fixed job, a typical figure, and a form of interaction, and each has a playbook under `acts/` that states its required structure, the primitives it uses, and the ways it commonly goes wrong. This file is the index. Load the playbook for each act type the storyboard uses before authoring that act.

## The nine types

| Act | What it carries | Typical figure | Interaction | Playbook |
|---|---|---|---|---|
| `hook` | The opening question and a first concrete experience | A small live model or one striking number | One direct manipulation | `acts/hook.md` |
| `map` | The whole territory in one view, before any detail | A labeled overview diagram | Hover or focus previews each region | `acts/map.md` |
| `mechanism` | How one part works | A stepped diagram | Step forward and back | `acts/mechanism.md` |
| `compare` | Two to four options against stated criteria | A criteria matrix | Re-weight the criteria; the ranking updates | `acts/compare.md` |
| `evidence` | The data behind a claim | A bar, line, or dot chart with a stated takeaway | Hide or isolate a series | `acts/evidence.md` |
| `timeline` | Change over time or a sequence of decisions | A dated list or a horizontal line with the forcing dependency marked | Select a point; the figure follows | `acts/timeline.md` |
| `decision` | The point of view as a recommendation, with what would change it | Options with trade-offs; the recommended one marked | The reader marks agreement or objections | `acts/decision.md` |
| `sandbox` | The model, opened up | The hook's model with every parameter exposed | Free play, presets, reset | `acts/sandbox.md` |
| `glossary` | Terms defined in plain language | A definition list | Jump from a term to its first use | `acts/glossary.md` |

## What every act shares

Each act, whatever its type, has the same four parts. `verify.mjs` checks the first two; the author checks the rest against the playbook.

1. A claim: the storyboard's `claim`, which the scaffold writes as the act's `<h2>`.
2. A body between the `exhibit:begin` and `exhibit:end` markers, written only with the primitives in `PRIMITIVES.md`.
3. A figure with a `<title>` that says what it shows, or, for `glossary`, a definition list in the figure's place.
4. A takeaway (`.x-takeaway`) that states the current result in one sentence, with the numbers the model produced bound into it.

An act whose control changes nothing the takeaway states has broken rule 5 of `JOURNEY.md`. A `glossary` is the one type allowed no control.

## Storyboard fields per act

```yaml
- type: compare            # one of the nine
  id: renderers            # optional; defaults to the type, or type-2 for a repeat
  claim: One sentence the takeaway states at the default settings.
  figure: criteria matrix, three options, four criteria     # optional note for the author
  interaction: weight sliders per criterion                # optional note for the author
  export: ranking at the reader's weights                  # optional note for the author
  motion: [draw, count]    # optional; the effects this act's figure uses
  frame: laptop            # optional; a mockup frame the figure sits in
```

The `figure`, `interaction`, and `export` fields are notes the author reads; the scripts carry them into the page as data attributes and do not check them.

`motion` lists the named effects the act will use, from the eight in `PRIMITIVES.md`: `reveal`, `focus`, `count`, `highlight`, `morph`, `draw`, `spotlight`, `parallax`. The scaffold refuses an effect the brand's grade does not permit or its `forbid` list names, writes the rest to the section's `data-motion`, and inlines only the GSAP plugins those effects need. `verify.mjs` fails a page whose acts use a directive the grade does not permit or the brand forbids, and a page that declares an effect without carrying its plugin. An effect used but not declared has no plugin to run on: `x-draw` falls back to a dash-offset stroke, and `x-morph` falls back to swapping the path without a tween. An act with no `motion` line may still use `x-reveal`, which every grade permits.

`frame` names a mockup frame from the table in `PRIMITIVES.md` (`phone`, `tablet`, `laptop`, `browser`, `social-square`, `social-story`, `email`, `print-a4`, `print-letter`, `video-16x9`, `video-9x16`, `sign`). It is a hint carried to `data-frame-hint`; the author places the `.x-frame` element.

## Storyboard fields at the top level

```yaml
storyboard:
  title: ...
  question: ...            # the question the page answers; the masthead shows it
  thesis: ...              # the point of view, attributed to evidence
  audience: ...
  mode: scroll             # scroll, deck, or explorer; default scroll
  register: cinematic      # optional; document, product, or cinematic
  acts: [...]
```

`register` names how much the page performs. The brand's profile sets a default and a ceiling: a `calm` brand renders any storyboard as a `document`, a `fluid` brand as a `product` page at most, and only an `expressive` brand reaches `cinematic`. `--register` on the scaffold overrides the storyboard; neither can exceed the ceiling.

| Register | Reader's experience | When to ask for it |
|---|---|---|
| `document` | Copy and figures reveal once on entry; no parallax, no scene beats; prints as written | A reference page, a brief, anything a reader will print first |
| `product` | Reveals with stagger, counters, drawn figures, a spotlight on the active step; shapes behind the masthead hold still | A product explainer or a tool the reader will use more than once |
| `cinematic` | Everything in `product`, plus parallax depth, scene beats scrubbed by scroll, and a masthead that moves with the reader | A launch, a talk, a topic the page has to make someone care about |

Every profile in this group defaults to `cinematic`; a storyboard asks for less when the topic calls for it.

## Delivery modes

The storyboard's `mode` wraps the acts without changing their markup.

| Mode | Fits | Reader's experience |
|---|---|---|
| `scroll` | Most topics; the default | One long page with side navigation and a progress bar |
| `deck` | A meeting or a talk | One act per screen; arrow keys and Page Up and Down move between acts; prints one act per page |
| `explorer` | A topic that is mostly a sandbox | The figure stays in view while the prose scrolls; controls beside the model |

The mode does not choose the brand variant. A brand with more than one variant renders in its `defaultVariant` unless `--variant` names another; a storyboard that belongs to a secondary identity says so in its notes, and the agent passes the flag.

## Repeats and omissions

A type may repeat when two parts of the topic each need it; give the second a distinct `id`. A page may omit any type except `hook`, which opens every page, and `sandbox` or `decision`, one of which closes the argument. `glossary`, when present, is last.
