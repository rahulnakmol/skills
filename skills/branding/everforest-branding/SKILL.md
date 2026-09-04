---
name: everforest-branding
description: User-invoked theme skill. Use for calm, natural, editorial branding across digital, print, environmental, and motion surfaces with an accessible Everforest profile.
requires: branding-system
---

# Everforest branding (user-invoked)

Apply a warm, botanical identity with quiet contrast and durable information hierarchy.

## Contract

```yaml
contract:
  invocation: user
  thesis: scaffold
  verbs: [read, write-repo]
  scope: guest
  trace: none
```

## When to invoke

- The user names Everforest or asks for a calm, natural, forest-led visual system
- The identity must continue from a screen or document into print, space, or video
- Existing Everforest work needs accessible semantic roles and open-source typography

## Procedure

1. Confirm the audience, content, surface, locale, delivery format, and approval owner.
2. Read `PROFILE.md` and select `light` or `dark`. Use light for print unless the user explicitly chooses a dark digital document.
3. Read `TYPOGRAPHY.md` when the artifact contains text or needs a non-Latin script.
4. Read `SURFACES.md` for theme-specific composition, data, physical, and video decisions.
5. Read `SOURCES.md` before describing provenance, downloading fonts, or distributing assets.
6. Call the Skill tool with `branding-system`. Pass this skill name, the `everforest` variant, the selected mode, the request, and the files already read.
7. Inspect the rendered artifact in every affected state. Return the engine's delivery receipt and the approval still required.

## Stop conditions

- Light or dark mode changes the outcome and the user gave no usable context → ask which environment controls the choice
- A natural tone would reduce urgency, safety, or evidence → keep the information clear and use the theme only as the visual layer
- A physical match lacks measured and approved samples → provide screen references and a sampling brief, not a paint specification
- Any requested release or production order lacks explicit approval → stop at `READY_FOR_REVIEW`

## Output contract

Return an Everforest-branded artifact and a branding-system receipt naming the profile, `everforest` variant, mode, surface, rendered checks, limitations, and approval owner.
