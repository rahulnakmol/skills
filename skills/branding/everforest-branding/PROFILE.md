# Everforest profile

This profile adapts the MIT-licensed Everforest palette into semantic roles. It is not an official extension of the upstream editor theme. The source colors establish the direction; local assignments and a small number of adjusted values meet the shared contrast contract.

## Visual character

Use warm mineral neutrals, forest greens, restrained blue-green focus, and modest corner radii. Favor texture that resembles paper, uncoated stock, wood, stone, or matte paint. Keep the grid precise so the natural palette does not become rustic decoration.

## Machine profile

```json profile
{
  "schemaVersion": 1,
  "skill": "everforest-branding",
  "title": "Everforest Branding",
  "defaultVariant": "everforest",
  "variants": {
    "everforest": {
      "provenance": {
        "paletteSource": "https://github.com/sainnhe/everforest",
        "paletteLicense": "MIT",
        "adaptation": "Everforest light and dark values are mapped by semantic role. Local surface and contrast values are an accessibility adaptation, not upstream guidance."
      },
      "typography": {
        "display": {
          "family": "Fraunces",
          "stack": "'Fraunces', Georgia, serif",
          "source": "https://github.com/google/fonts/tree/main/ofl/fraunces",
          "license": "OFL-1.1"
        },
        "body": {
          "family": "Atkinson Hyperlegible Next",
          "stack": "'Atkinson Hyperlegible Next', Arial, sans-serif",
          "source": "https://github.com/google/fonts/tree/main/ofl/atkinsonhyperlegiblenext",
          "license": "OFL-1.1"
        },
        "mono": {
          "family": "Atkinson Hyperlegible Mono",
          "stack": "'Atkinson Hyperlegible Mono', Consolas, monospace",
          "source": "https://github.com/google/fonts/tree/main/ofl/atkinsonhyperlegiblemono",
          "license": "OFL-1.1"
        },
        "fallbackPolicy": "Use the matching Noto Sans or Noto Serif family for the target script, then test real translated copy."
      },
      "modes": {
        "light": {
          "colors": {
            "canvas": "#fdf6e3",
            "surface": "#f3ead3",
            "surface-strong": "#e4d5b7",
            "ink": "#2d353b",
            "ink-muted": "#3d484d",
            "border": "#5c6a72",
            "accent": "#5c7a29",
            "action": "#2d353b",
            "action-ink": "#fdf6e3",
            "focus": "#356a78",
            "success": "#4f6f29",
            "warning": "#8a4b00",
            "error": "#a63b2e"
          }
        },
        "dark": {
          "colors": {
            "canvas": "#2d353b",
            "surface": "#343f44",
            "surface-strong": "#3d484d",
            "ink": "#fdf6e3",
            "ink-muted": "#d3c6aa",
            "border": "#9da9a0",
            "accent": "#a7c080",
            "action": "#fdf6e3",
            "action-ink": "#2d353b",
            "focus": "#83c092",
            "success": "#a7c080",
            "warning": "#dbbc7f",
            "error": "#e67e80"
          }
        }
      }
    }
  }
}
```
