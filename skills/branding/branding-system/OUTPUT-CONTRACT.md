# Output and verification contract

The engine returns a receipt with the artifact. A short request may leave some fields not applicable, but no field disappears silently.

```yaml
brand_delivery:
  status: READY_FOR_REVIEW
  theme: everforest-branding
  variant: everforest
  mode: light
  profile_source: skills/branding/everforest-branding/PROFILE.md
  design_source: generated
  design_precedence: selected-theme
  surface: web
  locale: en-US
  artifacts:
    - path: output/tokens.css
      sha256: <64 lowercase hex characters>
  checks:
    - name: profile-validation
      command: node skills/branding/branding-system/scripts/validate-profiles.mjs
      result: PASS
  accessibility:
    standard: WCAG 2.2 AA
    enhanced_targets_reviewed: [text-contrast, focus, target-size, reflow]
    result: PASS
  color_delivery:
    source_space: sRGB
    output_space: sRGB
    physical_sample: not-applicable
  rights:
    fonts: OFL-1.1
    marks: none
  limitations: []
  approval:
    owner: <name or role>
    state: PENDING
```

## Status words

- `DRAFT`: required content or production decisions remain open.
- `BLOCKED`: a named input, right, test, tool, or decision prevents a reviewable artifact.
- `READY_FOR_REVIEW`: the files exist and the listed checks passed, but the owner has not approved release.
- `APPROVED_FOR_PRODUCTION`: the named owner approved the exact files and production specification.
- `RELEASED`: the approved artifact was published or manufactured and the released version was verified.

Only a person with authority over the identity and channel moves work to `APPROVED_FOR_PRODUCTION`. Do not infer approval from silence, a prior version, or a passing test.

## Minimum checks by surface

| Surface | Required evidence |
|---|---|
| Web or native UI | Rendered states, keyboard, semantics, zoom, reflow, forced colors, reduced motion, light and dark where supplied |
| Document or PDF | Source comparison, reading order, tags, links, font embedding, export inspection, print preview |
| Deck | Slide and notes review, projector or display check, reading distance, accessible export |
| Print | Preflight, color-managed proof, trim and bleed, ink and overprint checks, approved proof |
| Email or social | Client or platform previews, images-off or crop behavior, alt text, dark mode, links |
| Data visualization | Scale, units, source, direct labels, non-color distinctions, contrast, small-size export |
| Environment | Measured sample, intended-light review, distance test, substrate and finish, applicable code review |
| Motion or video | Encoded-file watch, captions, transcript, audio description where needed, flash, loudness, color tags and transforms |

## Deterministic starter kit

`build-theme.mjs` writes `DESIGN.md`, `tokens.json`, `tokens.css`, `press-palette.md`, `specimen.html`, and `manifest.json`. The manifest records SHA-256 checksums for the first five files. The same profile, variant, and mode produce the same bytes. `DESIGN.md` is a mode-specific portable export under Google's alpha format; `PROFILE.md` remains the richer source for regeneration. `tokens.json` carries the profile's `motion` block, and `tokens.css` states it as `--brand-motion-*` durations, `--brand-ease-*` curves, and `--brand-parallax`, all set to zero under `prefers-reduced-motion`, so a renderer that animates reads the same rules the profile states. The specimen demonstrates tokens and states; it is review input, not a completed customer artifact.
