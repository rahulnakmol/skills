# Alternate palette fixture

A palette with values that appear nowhere in the shipped `PALETTE.md`, so a test
can tell whether the token in the artifact came from the palette file or from a
hardcoded default in the renderer.

## Machine tokens

```json
{
  "name": "Fixture palette",
  "colors": {
    "page": "#0a0b0c",
    "surface": "#101112",
    "text": "#f0e1d2",
    "heading": "#fedcba",
    "muted": "#998877",
    "accent": "#ff0066",
    "border": "#445566",
    "code-surface": "#112233",
    "code-text": "#ddeeff",
    "quote-surface": "#223344"
  },
  "typography": {
    "body-font": "Palatino, serif",
    "heading-font": "Futura, sans-serif",
    "mono-font": "Courier, monospace",
    "base-size": "13pt",
    "line-height": "1.9"
  },
  "page": {
    "margin": "7mm",
    "max-width": "133mm"
  }
}
```
