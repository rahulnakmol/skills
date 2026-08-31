# Press palette

The renderer reads its design tokens from this file. `scripts/render.mjs` parses
the fenced `json` block below and writes each value into a CSS custom property,
so changing a value here changes every artifact the skill produces. Nothing in
the renderer hardcodes a color, a font, or a page measurement.

To brand a document set, copy this file, edit the values, and pass the copy with
`--palette <file>`. The defaults below are a starting point, not a house style.

## Tokens

### Colors

| Token | Default | Where it lands |
|-------|---------|----------------|
| `page` | `#eff1f5` | The area around the document block on screen |
| `surface` | `#ffffff` | The document block itself, and the printed page |
| `text` | `#3c3f52` | Body text |
| `heading` | `#1e2030` | Headings, bold runs, table header text |
| `muted` | `#6c7086` | The masthead line, level-four headings, quoted text |
| `accent` | `#8aadf4` | The rule above the document, links, the quote bar |
| `border` | `#ccd0da` | Table cell borders, rules, the level-two heading underline |
| `code-surface` | `#24273a` | The background of a fenced code block |
| `code-text` | `#cad3f5` | The text inside a fenced code block |
| `quote-surface` | `#e6e9f0` | Blockquote background, table header fill, inline code fill |

The earlier version of this file listed three tokens — a dark `base`, a light
`text`, and a blue `accent` — drawn from the Catppuccin Macchiato scheme. Those
same two dark-scheme values now name the fenced code block, and the document
body is light, because a full-page dark background costs ink and reads poorly
in print. The accent is unchanged.

### Typography

| Token | Default | Notes |
|-------|---------|-------|
| `body-font` | Georgia stack | A serif for running text, which prints well |
| `heading-font` | Helvetica stack | A sans-serif for headings and table headers |
| `mono-font` | SFMono stack | Code spans and code blocks |
| `base-size` | `11pt` | Point sizes are used because the artifact is a page |
| `line-height` | `1.55` | Unitless ratio |

Font values name system font stacks. The renderer produces a self-contained
file and does not fetch a web font, so a font that is not installed on the
machine doing the rendering falls back to the next entry in the stack.

### Page

| Token | Default | Notes |
|-------|---------|-------|
| `margin` | `18mm` | The printed page margin, and the screen padding |
| `max-width` | `180mm` | The measure of the document block on screen |

## Validation

Every value is checked before it becomes CSS, because a palette file is data
that turns into a stylesheet and an unchecked value could add rules of its own.
Colors must be a hex value or a CSS color keyword. `base-size`, `margin`, and
`max-width` must be a number with a CSS unit. `line-height` must be a plain
number. Font values are restricted to letters, digits, spaces, quotes, commas,
periods, hyphens, and underscores. A value that fails its check is replaced by
the built-in fallback and the substitution is reported on standard error.

## Machine tokens

```json
{
  "name": "Press default",
  "colors": {
    "page": "#eff1f5",
    "surface": "#ffffff",
    "text": "#3c3f52",
    "heading": "#1e2030",
    "muted": "#6c7086",
    "accent": "#8aadf4",
    "border": "#ccd0da",
    "code-surface": "#24273a",
    "code-text": "#cad3f5",
    "quote-surface": "#e6e9f0"
  },
  "typography": {
    "body-font": "Georgia, 'Times New Roman', serif",
    "heading-font": "'Helvetica Neue', Helvetica, Arial, sans-serif",
    "mono-font": "'SFMono-Regular', Menlo, Consolas, monospace",
    "base-size": "11pt",
    "line-height": "1.55"
  },
  "page": {
    "margin": "18mm",
    "max-width": "180mm"
  }
}
```
