# AI branding profile

This skill carries two separate profiles. Anthropic is the default. OpenAI is an explicit option. Neither profile grants permission to use a provider mark, reproduces a provider's voice, or claims the local accessibility, surface, and motion rules are official guidance.

## Visual character

The Anthropic variant uses warm paper, near-black structure, clay accents, editorial serif text, and clean geometric display type. The OpenAI variant uses sharp monochrome structure with a restrained local teal accent and open-source substitute fonts. Do not combine the variants in one identity.

## Machine profile

The `motion` block states the brand's motion rules for any renderer that animates: the grade (how much movement is permitted), the default register (how a page presents by default), durations and easing by role, the parallax depth, and any effect the brand forbids. Every profile in this repository is graded `expressive` with a `cinematic` register, so a rendered page moves with layered reveals, scroll-linked scenes, and parallax depth; a reader who asks for reduced motion receives the same sequence without movement. Change the grade or the forbid list here to restrain one brand without touching the renderer.

```json profile
{
  "schemaVersion": 2,
  "skill": "ai-branding",
  "title": "AI Branding",
  "defaultVariant": "anthropic",
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
    "anthropic": {
      "provenance": {
        "paletteSource": "https://github.com/anthropics/skills/tree/main/skills/brand-guidelines",
        "paletteLicense": "Apache-2.0 code license; trademark rights excluded",
        "adaptation": "Published palette and type references guide this profile. Semantic, dark-mode, accessibility, surface, and motion decisions are local additions."
      },
      "typography": {
        "display": {
          "family": "Poppins",
          "stack": "'Poppins', Arial, sans-serif",
          "source": "https://github.com/google/fonts/tree/main/ofl/poppins",
          "license": "OFL-1.1"
        },
        "body": {
          "family": "Lora",
          "stack": "'Lora', Georgia, serif",
          "source": "https://github.com/google/fonts/tree/main/ofl/lora",
          "license": "OFL-1.1"
        },
        "mono": {
          "family": "JetBrains Mono",
          "stack": "'JetBrains Mono', Consolas, monospace",
          "source": "https://github.com/google/fonts/tree/main/ofl/jetbrainsmono",
          "license": "OFL-1.1"
        },
        "fallbackPolicy": "Use Noto Sans for the display role and the matching Noto Serif family for body text in the target script."
      },
      "modes": {
        "light": {
          "colors": {
            "canvas": "#faf9f5",
            "surface": "#e8e6dc",
            "surface-strong": "#d9d5c7",
            "ink": "#141413",
            "ink-muted": "#2d2d2a",
            "border": "#62615c",
            "accent": "#a94728",
            "action": "#141413",
            "action-ink": "#faf9f5",
            "focus": "#365f88",
            "success": "#3f6d3a",
            "warning": "#825000",
            "error": "#a33a32"
          }
        },
        "dark": {
          "colors": {
            "canvas": "#141413",
            "surface": "#292927",
            "surface-strong": "#3a3935",
            "ink": "#faf9f5",
            "ink-muted": "#e8e6dc",
            "border": "#9d9b91",
            "accent": "#e58a6e",
            "action": "#faf9f5",
            "action-ink": "#141413",
            "focus": "#91b7d8",
            "success": "#9bc596",
            "warning": "#e5bb78",
            "error": "#f08b81"
          }
        }
      }
    },
    "openai": {
      "provenance": {
        "paletteSource": "https://openai.com/brand/",
        "paletteLicense": "OpenAI brand terms; trademark rights excluded",
        "adaptation": "Black and white guide the profile. Teal, focus, status colors, open-source fonts, semantic roles, and all surface guidance are local additions."
      },
      "typography": {
        "display": {
          "family": "Manrope",
          "stack": "'Manrope', Arial, sans-serif",
          "source": "https://github.com/google/fonts/tree/main/ofl/manrope",
          "license": "OFL-1.1"
        },
        "body": {
          "family": "Source Serif 4",
          "stack": "'Source Serif 4', Georgia, serif",
          "source": "https://github.com/google/fonts/tree/main/ofl/sourceserif4",
          "license": "OFL-1.1"
        },
        "mono": {
          "family": "JetBrains Mono",
          "stack": "'JetBrains Mono', Consolas, monospace",
          "source": "https://github.com/google/fonts/tree/main/ofl/jetbrainsmono",
          "license": "OFL-1.1"
        },
        "fallbackPolicy": "Use Noto Sans for the display role and the matching Noto Serif family for body text in the target script."
      },
      "modes": {
        "light": {
          "colors": {
            "canvas": "#ffffff",
            "surface": "#ededed",
            "surface-strong": "#d8d8d8",
            "ink": "#000000",
            "ink-muted": "#2f2f2f",
            "border": "#595959",
            "accent": "#006d63",
            "action": "#000000",
            "action-ink": "#ffffff",
            "focus": "#005fcc",
            "success": "#28754a",
            "warning": "#855400",
            "error": "#b42318"
          }
        },
        "dark": {
          "colors": {
            "canvas": "#000000",
            "surface": "#242424",
            "surface-strong": "#353535",
            "ink": "#ffffff",
            "ink-muted": "#ededed",
            "border": "#a3a3a3",
            "accent": "#67d6c5",
            "action": "#ffffff",
            "action-ink": "#000000",
            "focus": "#82b9ff",
            "success": "#78d9a6",
            "warning": "#f2c46d",
            "error": "#ff9a8f"
          }
        }
      }
    }
  }
}
```
