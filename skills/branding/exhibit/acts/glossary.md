# The glossary act

The glossary defines terms in plain language and links each term to its first use. It serves rule 7 of `JOURNEY.md` by following the sandbox without adding another claim.

## Required structure

1. Use `.act-body` and a short `.act-prose` note about link targets.
2. Add `dl.x-glossary` with one `<dt>` and `<dd>` per term.
3. Put a link to the term's first-use anchor in each `<dt>`.
4. Use one or two plain sentences per definition.
5. Add no control, takeaway, model, figure, or motion directive. The glossary is the documented exception because it is a reference act.

## Primitives

| Primitive | In this act |
|---|---|
| `dl.x-glossary` | Lays out terms and definitions in one or two columns. |
| `<a href="#…">` | Jumps to the term's first use. |
| `<code>` | Marks a literal file or check name. |

## Figure

There is no figure. The definition list takes its place. This exception keeps the final act focused on reference rather than adding an unsupported claim.

## Interaction and takeaway

The links provide the only interaction. The act has no state to export. The default export therefore records only the scaffolded heading.

## Failure modes

- A link target does not exist → the link goes nowhere. The structural checks do not validate first-use anchors; click each link.
- A definition introduces an undefined term → the reader enters a chain of definitions. Only a reader catches this.
- The glossary appears before the sandbox → rule 7 fails. Only a reader catches this.
- A definition makes a recommendation → it adds a claim after the sandbox. Only a reader catches this.
- Text violates the profile's avoid list → `brand.voice` fails.
- Definition text falls below the minimum size → `brand.min-text-size` or `render.body-text-size` fails.

## Example skeleton

```html
<div class="act-body">
  <div class="act-prose"><p>Each term links to its first use on this page.</p></div>
  <dl class="x-glossary">
    <dt><a href="#term-model">Model</a></dt>
    <dd>A stated set of inputs and rules used to calculate a result.</dd>
    <dt><a href="#term-check">Check</a></dt>
    <dd>One named test that reports pass or fail, such as <code>brand.allowed-colors</code>.</dd>
    <dt><a href="#term-series">Series</a></dt>
    <dd>A related set of chart values shown with one visual role.</dd>
  </dl>
</div>
```
