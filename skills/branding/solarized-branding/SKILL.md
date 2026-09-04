---
name: solarized-branding
description: User-invoked theme skill. Use for disciplined blue-and-gold branding across digital, print, environmental, and motion surfaces with accessible Solarized light and dark roles.
requires: branding-system
---

# Solarized branding (user-invoked)

Apply a restrained, luminous identity with stable hierarchy across light and dark environments.

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

- The user names Solarized or asks for a disciplined blue-and-gold system
- Light and dark presentations need a related tonal structure rather than two separate brands
- Existing Solarized work needs accessible semantic roles and open-source typography

## Procedure

1. Confirm the audience, content, surface, locale, delivery format, and approval owner.
2. Read `PROFILE.md` and select `light` or `dark`. Use light for print unless the user explicitly chooses a dark digital document.
3. Read `TYPOGRAPHY.md` when the artifact contains text or needs a non-Latin script.
4. Read `SURFACES.md` for theme-specific composition, data, physical, and video decisions.
5. Read `SOURCES.md` before describing provenance, downloading fonts, or distributing assets.
6. Call the Skill tool with `branding-system`. Pass this skill name, the `solarized` variant, the selected mode, the request, and the files already read.
7. Inspect the rendered artifact in every affected state. Return the engine's delivery receipt and the approval still required.

## Stop conditions

- The source palette's symmetric tone relationship conflicts with the enhanced contrast role → preserve role contrast and document the adaptation
- Several accent colors compete with the main argument → keep one accent and move the others to labeled data or status
- A physical match lacks measured and approved samples → provide screen references and a sampling brief, not a paint specification
- Any requested release or production order lacks explicit approval → stop at `READY_FOR_REVIEW`

## Output contract

Return a Solarized-branded artifact and a branding-system receipt naming the profile, `solarized` variant, mode, surface, rendered checks, limitations, and approval owner.
