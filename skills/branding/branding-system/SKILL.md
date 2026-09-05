---
name: branding-system
description: Model-invoked branding engine. Use when a theme skill supplies a validated profile and an artifact needs one coherent verbal, visual, accessibility, physical, or motion system.
---

# Branding system (model-invoked)

Apply one theme profile to a complete artifact without treating color as the whole brand.

## Contract

```yaml
contract:
  invocation: model
  thesis: scaffold
  verbs: [read, write-repo, execute]
  scope: guest
  trace: none
```

## When to invoke

- A branding theme skill has selected a profile, variant, and light or dark mode
- One identity must cross digital, document, print, environmental, or motion surfaces
- Existing branded work needs an accessibility, consistency, or delivery review

Do not invoke this engine directly to choose an aesthetic. A user-invoked theme skill owns that choice.

## Procedure

1. Read the machine profile supplied by the calling theme. Reject a missing or invalid profile. Run `node skills/branding/branding-system/scripts/validate-profiles.mjs` after any profile change.
2. Read `DESIGN-DOCUMENTS.md` when the project contains or requests `DESIGN.md`, `design.md`, or a remote design-guidance URL. Preserve an established host design system unless the requester explicitly replaces it.
3. Define the audience, message, artifact, channel, locale, mode, delivery space, and approval owner. Read `VERBAL-IDENTITY.md` for any words or narrative.
4. Apply the semantic roles and typography. Read `SURFACE-CONTRACT.md` for web, native UI, documents, PDF, decks, print, email, social, icons, data visualization, or environmental work.
5. Read `ACCESSIBILITY.md` for every artifact. Accessibility is a whole-artifact test, not a property inferred from the palette.
6. For animation, generated footage, editing, titles, captions, or grading, read `MOTION-VIDEO.md` before storyboards or prompts are written.
7. Read `PROVENANCE.md` before using a source palette, typeface, provider identity, logo, paint, ink, or material specification.
8. Build a deterministic starter kit when files are needed:

   ```bash
   node skills/branding/branding-system/scripts/build-theme.mjs \
     --theme <theme-skill> --variant <variant> --mode <light|dark> --out <directory>
   ```

9. Produce the artifact with the native tool for its surface. The starter kit supplies tokens, a portable `DESIGN.md`, and a specimen; it does not replace layout, preflight, color management, or assistive-technology checks.
10. Inspect the rendered result and verify it against `OUTPUT-CONTRACT.md`. Include non-default states, forced colors or reduced motion where relevant, and both intended display spaces for video.
11. Ask the named owner to approve before publishing, ordering print, manufacturing, painting, or releasing media.

## Stop conditions

- The theme, variant, audience, surface, locale, or approval owner is materially ambiguous → ask one focused question
- A requested logo, slogan, provider mark, or font lacks documented rights → use neutral text or a licensed substitute and record the limitation
- A contrast, keyboard, semantic, reflow, caption, flash, or delivery check fails → do not call the artifact accessible or complete
- A physical color has no measured sample under intended light → label it a screen reference, not a paint or material specification
- Footage has no tagged input color space or delivery target → do not create a reusable grade or lookup table
- External publication, production ordering, or destructive replacement is requested without explicit approval → stop at reviewable files

## Output contract

Return the theme, variant, mode, surface, locale, source files, rendered artifacts, checks run with decisive results, unresolved limitations, and the named approval required next. `OUTPUT-CONTRACT.md` defines the complete receipt and status words.
