# Everforest profile

This profile adapts the MIT-licensed Everforest palette into semantic roles. It is not an official extension of the upstream editor theme. The source colors establish the direction; local assignments and a small number of adjusted values meet the shared contrast contract.

## Visual character

Use warm mineral neutrals, forest greens, restrained blue-green focus, and modest corner radii. Favor texture that resembles paper, uncoated stock, wood, stone, or matte paint. Keep the grid precise so the natural palette does not become rustic decoration.

## Machine profile

The `motion` block states the brand's motion rules for any renderer that animates: the grade (how much movement is permitted), the default register (how a page presents by default), durations and easing by role, the parallax depth, and any effect the brand forbids. Every profile in this repository is graded `expressive` with a `cinematic` register, so a rendered page moves with layered reveals, scroll-linked scenes, and parallax depth; a reader who asks for reduced motion receives the same sequence without movement. Change the grade or the forbid list here to restrain one brand without touching the renderer.

```json profile
{
  "schemaVersion": 2,
  "skill": "everforest-branding",
  "title": "Everforest Branding",
  "defaultVariant": "everforest",
  "motion": {
    "grade": "expressive",
    "register": "cinematic",
    "duration": { "micro": 160, "reveal": 640, "scene": 1200 },
    "easing": {
      "standard": "cubic-bezier(0.22, 1, 0.36, 1)",
      "enter": "cubic-bezier(0.16, 1, 0.3, 1)",
      "exit": "cubic-bezier(0.7, 0, 0.84, 0)"
    },
    "parallax": 0.12,
    "forbid": []
  },
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
