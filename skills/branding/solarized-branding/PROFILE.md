# Solarized profile

This profile adapts the MIT-licensed Solarized palette into semantic roles. It is not an official extension of the palette. The source's related light and dark tones guide the direction; local blue, green, orange, and red values meet the shared contrast contract.

## Visual character

Use parchment and deep blue-green as paired foundations, with measured blue and gold emphasis. Favor rules, columns, editorial captions, and small areas of saturated color. Keep the palette sparse enough that one accent still has meaning.

## Machine profile

The `motion` block states the brand's motion rules for any renderer that animates: the grade (how much movement is permitted), the default register (how a page presents by default), durations and easing by role, the parallax depth, and any effect the brand forbids. Every profile in this repository is graded `expressive` with a `cinematic` register, so a rendered page moves with layered reveals, scroll-linked scenes, and parallax depth; a reader who asks for reduced motion receives the same sequence without movement. Change the grade or the forbid list here to restrain one brand without touching the renderer.

```json profile
{
  "schemaVersion": 2,
  "skill": "solarized-branding",
  "title": "Solarized Branding",
  "defaultVariant": "solarized",
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
    "solarized": {
      "provenance": {
        "paletteSource": "https://github.com/altercation/solarized",
        "paletteLicense": "MIT",
        "adaptation": "Solarized base tones guide both modes. Local accessible accents and semantic assignments meet enhanced contrast and are not upstream guidance."
      },
      "typography": {
        "display": {
          "family": "IBM Plex Serif",
          "stack": "'IBM Plex Serif', Georgia, serif",
          "source": "https://github.com/google/fonts/tree/main/ofl/ibmplexserif",
          "license": "OFL-1.1"
        },
        "body": {
          "family": "IBM Plex Sans",
          "stack": "'IBM Plex Sans', Arial, sans-serif",
          "source": "https://github.com/google/fonts/tree/main/ofl/ibmplexsans",
          "license": "OFL-1.1"
        },
        "mono": {
          "family": "IBM Plex Mono",
          "stack": "'IBM Plex Mono', Consolas, monospace",
          "source": "https://github.com/google/fonts/tree/main/ofl/ibmplexmono",
          "license": "OFL-1.1"
        },
        "fallbackPolicy": "Use the matching Noto Serif or Noto Sans family for the target script, then test real translated copy."
      },
      "modes": {
        "light": {
          "colors": {
            "canvas": "#fdf6e3",
            "surface": "#eee8d5",
            "surface-strong": "#ded6bc",
            "ink": "#002b36",
            "ink-muted": "#073642",
            "border": "#586e75",
            "accent": "#006d9c",
            "action": "#002b36",
            "action-ink": "#fdf6e3",
            "focus": "#006d9c",
            "success": "#527100",
            "warning": "#855400",
            "error": "#b3261e"
          }
        },
        "dark": {
          "colors": {
            "canvas": "#002b36",
            "surface": "#073642",
            "surface-strong": "#0b4552",
            "ink": "#fdf6e3",
            "ink-muted": "#eee8d5",
            "border": "#93a1a1",
            "accent": "#2aa198",
            "action": "#fdf6e3",
            "action-ink": "#002b36",
            "focus": "#2aa198",
            "success": "#859900",
            "warning": "#b58900",
            "error": "#e04a3f"
          }
        }
      }
    }
  }
}
```
