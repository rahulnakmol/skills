# Nord profile

This profile adapts the MIT-licensed Nord palette into semantic roles. It is not an official extension of the palette. Polar Night, Snow Storm, Frost, and Aurora guide the direction; local adjustments meet the shared contrast contract.

## Visual character

Use cool gray structure, clean blue focus, wide margins, flat planes, and selective soft color. The composition should feel calm because it is ordered, not because it removes necessary detail. Keep photographs and physical materials neutral enough to remain credible.

## Machine profile

```json profile
{
  "schemaVersion": 1,
  "skill": "nord-branding",
  "title": "Nord Branding",
  "defaultVariant": "nord",
  "variants": {
    "nord": {
      "provenance": {
        "paletteSource": "https://github.com/nordtheme/nord",
        "paletteLicense": "MIT",
        "adaptation": "Nord families guide semantic roles. Local dark-mode error and light-mode status values meet enhanced contrast and are not upstream guidance."
      },
      "typography": {
        "display": {
          "family": "Space Grotesk",
          "stack": "'Space Grotesk', Arial, sans-serif",
          "source": "https://github.com/google/fonts/tree/main/ofl/spacegrotesk",
          "license": "OFL-1.1"
        },
        "body": {
          "family": "Source Sans 3",
          "stack": "'Source Sans 3', Arial, sans-serif",
          "source": "https://github.com/google/fonts/tree/main/ofl/sourcesans3",
          "license": "OFL-1.1"
        },
        "mono": {
          "family": "JetBrains Mono",
          "stack": "'JetBrains Mono', Consolas, monospace",
          "source": "https://github.com/google/fonts/tree/main/ofl/jetbrainsmono",
          "license": "OFL-1.1"
        },
        "fallbackPolicy": "Use the matching Noto Sans family for the target script, then test real translated copy."
      },
      "modes": {
        "light": {
          "colors": {
            "canvas": "#eceff4",
            "surface": "#d8dee9",
            "surface-strong": "#c5ccd8",
            "ink": "#2e3440",
            "ink-muted": "#3b4252",
            "border": "#4c566a",
            "accent": "#4c6f9d",
            "action": "#2e3440",
            "action-ink": "#eceff4",
            "focus": "#4c6f9d",
            "success": "#49663f",
            "warning": "#805500",
            "error": "#9b2c2c"
          }
        },
        "dark": {
          "colors": {
            "canvas": "#2e3440",
            "surface": "#3b4252",
            "surface-strong": "#434c5e",
            "ink": "#eceff4",
            "ink-muted": "#d8dee9",
            "border": "#9aa7bd",
            "accent": "#88c0d0",
            "action": "#eceff4",
            "action-ink": "#2e3440",
            "focus": "#88c0d0",
            "success": "#a3be8c",
            "warning": "#ebcb8b",
            "error": "#e3898f"
          }
        }
      }
    }
  }
}
```
