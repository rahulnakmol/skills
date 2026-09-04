# Gruvbox profile

This profile adapts the MIT-licensed Gruvbox palette into semantic roles. It is not an official extension of the editor theme. Source warm neutrals and high-chroma accents guide the direction; local role assignments meet the shared contrast contract.

## Visual character

Use warm paper and charcoal, direct block geometry, selective orange or red, and visible typographic rhythm. Texture may suggest ink, newsprint, labels, or old instruments, but the layout remains current and exact. Do not imitate an old terminal as the default composition.

## Machine profile

```json profile
{
  "schemaVersion": 1,
  "skill": "gruvbox-branding",
  "title": "Gruvbox Branding",
  "defaultVariant": "gruvbox",
  "variants": {
    "gruvbox": {
      "provenance": {
        "paletteSource": "https://github.com/morhetz/gruvbox",
        "paletteLicense": "MIT",
        "adaptation": "Gruvbox light and dark values guide semantic roles. Local role choices meet enhanced contrast and are not upstream guidance."
      },
      "typography": {
        "display": {
          "family": "Bricolage Grotesque",
          "stack": "'Bricolage Grotesque', Arial, sans-serif",
          "source": "https://github.com/google/fonts/tree/main/ofl/bricolagegrotesque",
          "license": "OFL-1.1"
        },
        "body": {
          "family": "Newsreader",
          "stack": "'Newsreader', Georgia, serif",
          "source": "https://github.com/google/fonts/tree/main/ofl/newsreader",
          "license": "OFL-1.1"
        },
        "mono": {
          "family": "IBM Plex Mono",
          "stack": "'IBM Plex Mono', Consolas, monospace",
          "source": "https://github.com/google/fonts/tree/main/ofl/ibmplexmono",
          "license": "OFL-1.1"
        },
        "fallbackPolicy": "Use Noto Sans for display and the matching Noto Serif family for body text in the target script."
      },
      "modes": {
        "light": {
          "colors": {
            "canvas": "#fbf1c7",
            "surface": "#ebdbb2",
            "surface-strong": "#d5c4a1",
            "ink": "#3c3836",
            "ink-muted": "#504945",
            "border": "#665c54",
            "accent": "#9d0006",
            "action": "#3c3836",
            "action-ink": "#fbf1c7",
            "focus": "#076678",
            "success": "#427b58",
            "warning": "#8f3f00",
            "error": "#9d0006"
          }
        },
        "dark": {
          "colors": {
            "canvas": "#282828",
            "surface": "#3c3836",
            "surface-strong": "#504945",
            "ink": "#fbf1c7",
            "ink-muted": "#ebdbb2",
            "border": "#a89984",
            "accent": "#fe8019",
            "action": "#fbf1c7",
            "action-ink": "#282828",
            "focus": "#83a598",
            "success": "#b8bb26",
            "warning": "#fabd2f",
            "error": "#fb4934"
          }
        }
      }
    }
  }
}
```
