---
name: nord-branding
description: User-invoked theme skill. Use for cool, spacious branding across digital, print, environmental, and motion surfaces with accessible Nord light and dark roles.
requires: branding-system
---

# Nord branding (user-invoked)

Apply a clear northern identity with cool structure, measured space, and neutral evidence.

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

- The user names Nord or asks for a cool, precise, spacious visual system
- A restrained identity must cross product, editorial, physical, and motion work
- Existing Nord work needs accessible semantic roles and open-source typography

## Procedure

1. Confirm the audience, content, surface, locale, delivery format, and approval owner.
2. Read `PROFILE.md` and select `light` or `dark`. Use light for print unless the user explicitly chooses a dark digital document.
3. Read `TYPOGRAPHY.md` when the artifact contains text or needs a non-Latin script.
4. Read `SURFACES.md` for theme-specific composition, data, physical, and video decisions.
5. Read `SOURCES.md` before describing provenance, downloading fonts, or distributing assets.
6. Call the Skill tool with `branding-system`. Pass this skill name, the `nord` variant, the selected mode, the request, and the files already read.
7. Inspect the rendered artifact in every affected state. Return the engine's delivery receipt and the approval still required.

## Stop conditions

- Cool color would make people, food, wood, or material evidence inaccurate → protect the subject and keep the theme in structure and graphics
- Sparse layout would hide necessary explanation or controls → keep the content and expand the composition
- A physical match lacks measured and approved samples → provide screen references and a sampling brief, not a paint specification
- Any requested release or production order lacks explicit approval → stop at `READY_FOR_REVIEW`

## Output contract

Return a Nord-branded artifact and a branding-system receipt naming the profile, `nord` variant, mode, surface, rendered checks, limitations, and approval owner.
