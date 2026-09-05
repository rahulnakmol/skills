---
layout: group
name: branding
group: branding
title: "Branding: One Identity Across Every Surface"
description: "Branding applies one verbal, visual, accessible, physical, and motion system across product UI, documents, print, environments, and video."
---

QuenServe's identity appears in product UI, a release document, a leadership deck, a trade-show wall, an email, and a launch video. A color copied by eye into each file does not make those pieces one system. The words, typography, semantic roles, physical samples, motion, captions, color transforms, and approval record must agree while each medium keeps its own production rules.

The common failure is Surface Drift. A web accent becomes body text without a contrast check. A screen hex value becomes a wall-paint request. A video grade pushes skin toward the theme color. A slide uses a display font for paragraphs. Every choice resembles the source theme, but the identity and evidence weaken as the surfaces multiply.

`branding-system` fixes the repeated part once. It supplies shared verbal, surface, accessibility, provenance, motion, video, and output contracts. Each public theme supplies the same profile, typography, surface direction, and source record. The profile validator checks color syntax, semantic roles, enhanced text and non-text contrast, source provenance, and open-source font licenses.

The six public theme skills are different visual directions over that common system:

1. [`everforest-branding`]({{ '/everforest-branding/' | relative_url }}) — warm botanical material with quiet structure.
2. [`catppuccin-branding`]({{ '/catppuccin-branding/' | relative_url }}) — precise pastel color over strong hierarchy.
3. [`ai-branding`]({{ '/ai-branding/' | relative_url }}) — Anthropic-inspired by default, with a separate OpenAI option.
4. [`gruvbox-branding`]({{ '/gruvbox-branding/' | relative_url }}) — earthy analog warmth and technical density.
5. [`nord-branding`]({{ '/nord-branding/' | relative_url }}) — cool space and clear neutral evidence.
6. [`solarized-branding`]({{ '/solarized-branding/' | relative_url }}) — related light and dark tones with restrained blue and gold.

All six use open-source primary fonts and Noto script-specific fallbacks. Their machine profiles define light and dark roles that target 7:1 normal text, 4.5:1 large text, and 3:1 meaningful graphics and focus. These are token checks, not a claim that a complete artifact is accessible. The final artifact still needs keyboard, semantics, reflow, forced-color, reduced-motion, caption, and rendered-pixel review where those checks apply.

[`press`]({{ '/press/' | relative_url }}) remains the document renderer, and [`exhibit`]({{ '/exhibit/' | relative_url }}) is the interactive counterpart. Where press renders a document a reader reads, exhibit builds one branded page a reader changes: a sequence of acts, each with a figure, a control that changes a model, and a takeaway that states the claim at the reader's own settings. It holds the finished page to the theme with named checks and a rendered capture at desktop and phone widths. The trade-off is authoring effort: an exhibit page asks for a storyboard and one authored act per claim, where press asks for a finished document and one command.

[`press`]({{ '/press/' | relative_url }}) remains the document renderer. A theme starter kit writes a portable `DESIGN.md` and a press-compatible palette alongside CSS and JSON tokens, an HTML specimen, and a checksummed manifest. The portable document follows Google's alpha format for its selected mode. It does not replace the richer profile, PDF tagging, print proof, or approval.

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

The system stops before publication, manufacturing, painting, or media release until a named owner approves the exact files and production specification. A screen hex value remains a screen reference until measured material samples are reviewed under the intended light.
