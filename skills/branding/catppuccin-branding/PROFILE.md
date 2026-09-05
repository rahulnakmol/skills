# Catppuccin profile

This profile adapts the MIT-licensed Catppuccin palette into semantic roles. It is not an official extension of the palette. Latte guides light mode and Mocha guides dark mode. Cross-flavor assignments and local values preserve the visual family while meeting the shared contrast contract.

## Visual character

Use broad calm surfaces, precise outlines, rounded geometry, and one pastel accent at a time. The palette can carry warmth and personality without turning every control into a different color. Strong dark ink, direct labels, and disciplined spacing keep the system readable.

## Machine profile

The `motion` block states the brand's motion rules for any renderer that animates: the grade (how much movement is permitted), the default register (how a page presents by default), durations and easing by role, the parallax depth, and any effect the brand forbids. Every profile in this repository is graded `expressive` with a `cinematic` register, so a rendered page moves with layered reveals, scroll-linked scenes, and parallax depth; a reader who asks for reduced motion receives the same sequence without movement. Change the grade or the forbid list here to restrain one brand without touching the renderer.

```json profile
{
  "schemaVersion": 2,
  "skill": "catppuccin-branding",
  "title": "Catppuccin Branding",
  "defaultVariant": "catppuccin",
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
    "catppuccin": {
      "provenance": {
        "paletteSource": "https://github.com/catppuccin/palette",
        "paletteLicense": "MIT",
        "adaptation": "Latte and Mocha guide light and dark modes. Cross-flavor and local role assignments meet enhanced contrast and are not upstream guidance."
      },
      "typography": {
        "display": {
          "family": "Syne",
          "stack": "'Syne', Arial, sans-serif",
          "source": "https://github.com/google/fonts/tree/main/ofl/syne",
          "license": "OFL-1.1"
        },
        "body": {
          "family": "Nunito Sans",
          "stack": "'Nunito Sans', Arial, sans-serif",
          "source": "https://github.com/google/fonts/tree/main/ofl/nunitosans",
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
            "canvas": "#eff1f5",
            "surface": "#e6e9ef",
            "surface-strong": "#dce0e8",
            "ink": "#1e1e2e",
            "ink-muted": "#3b3d52",
            "border": "#6c6f85",
            "accent": "#8839ef",
            "action": "#1e1e2e",
            "action-ink": "#eff1f5",
            "focus": "#1e66f5",
            "success": "#287b47",
            "warning": "#8f4f00",
            "error": "#d20f39"
          }
        },
        "dark": {
          "colors": {
            "canvas": "#1e1e2e",
            "surface": "#313244",
            "surface-strong": "#45475a",
            "ink": "#f5e0dc",
            "ink-muted": "#cdd6f4",
            "border": "#9399b2",
            "accent": "#cba6f7",
            "action": "#f5e0dc",
            "action-ink": "#1e1e2e",
            "focus": "#89b4fa",
            "success": "#a6e3a1",
            "warning": "#f9e2af",
            "error": "#f38ba8"
          }
        }
      }
    }
  }
}
```
