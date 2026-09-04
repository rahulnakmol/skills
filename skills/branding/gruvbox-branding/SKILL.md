---
name: gruvbox-branding
description: User-invoked theme skill. Use for warm retro-modern branding across digital, print, environmental, and motion surfaces with accessible Gruvbox light and dark roles.
requires: branding-system
---

# Gruvbox branding (user-invoked)

Apply an earthy, high-information identity with analog warmth and modern structure.

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

- The user names Gruvbox or asks for a warm retro-modern system with strong technical character
- Dense information must remain readable across product, editorial, physical, and motion work
- Existing Gruvbox work needs accessible semantic roles and open-source typography

## Procedure

1. Confirm the audience, content, surface, locale, delivery format, and approval owner.
2. Read `PROFILE.md` and select `light` or `dark`. Use light for print unless the user explicitly chooses a dark digital document.
3. Read `TYPOGRAPHY.md` when the artifact contains text or needs a non-Latin script.
4. Read `SURFACES.md` for theme-specific composition, data, physical, and video decisions.
5. Read `SOURCES.md` before describing provenance, downloading fonts, or distributing assets.
6. Call the Skill tool with `branding-system`. Pass this skill name, the `gruvbox` variant, the selected mode, the request, and the files already read.
7. Inspect the rendered artifact in every affected state. Return the engine's delivery receipt and the approval still required.

## Stop conditions

- A request depends on a hard, medium, soft, bright, neutral, or faded source variant → ask which quality matters more than preserving the enhanced role set
- Texture or nostalgia obscures current information → preserve the information and remove the effect
- A physical match lacks measured and approved samples → provide screen references and a sampling brief, not a paint specification
- Any requested release or production order lacks explicit approval → stop at `READY_FOR_REVIEW`

## Output contract

Return a Gruvbox-branded artifact and a branding-system receipt naming the profile, `gruvbox` variant, mode, surface, rendered checks, limitations, and approval owner.
