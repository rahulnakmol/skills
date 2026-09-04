---
name: catppuccin-branding
description: User-invoked theme skill. Use for expressive pastel branding across digital, print, environmental, and motion surfaces with accessible Catppuccin light and dark roles.
requires: branding-system
---

# Catppuccin branding (user-invoked)

Apply a precise pastel identity with strong hierarchy beneath its soft color range.

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

- The user names Catppuccin or asks for a contemporary pastel system with clear dark mode
- Friendly visual tone must still support serious product, document, data, and production work
- Existing Catppuccin work needs accessible semantic roles and open-source typography

## Procedure

1. Confirm the audience, content, surface, locale, delivery format, and approval owner.
2. Read `PROFILE.md` and select `light` or `dark`. The accessible roles use Latte and Mocha as direction, not an automatic copy of every source token.
3. Read `TYPOGRAPHY.md` when the artifact contains text or needs a non-Latin script.
4. Read `SURFACES.md` for theme-specific composition, data, physical, and video decisions.
5. Read `SOURCES.md` before describing provenance, downloading fonts, or distributing assets.
6. Call the Skill tool with `branding-system`. Pass this skill name, the `catppuccin` variant, the selected mode, the request, and the files already read.
7. Inspect the rendered artifact in every affected state. Return the engine's delivery receipt and the approval still required.

## Stop conditions

- The request depends on a named Catppuccin flavor beyond this semantic light and dark pair → ask whether to preserve that flavor or the enhanced contrast target
- Pastel decoration weakens an urgent state or chart distinction → keep the meaning and use pastel only where it remains distinguishable
- A physical match lacks measured and approved samples → provide screen references and a sampling brief, not a paint specification
- Any requested release or production order lacks explicit approval → stop at `READY_FOR_REVIEW`

## Output contract

Return a Catppuccin-branded artifact and a branding-system receipt naming the profile, `catppuccin` variant, mode, surface, rendered checks, limitations, and approval owner.
