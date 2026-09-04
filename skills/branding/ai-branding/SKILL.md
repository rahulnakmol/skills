---
name: ai-branding
description: User-invoked AI branding skill. Use for an Anthropic-inspired editorial system by default, or set provider openai for a separate monochrome profile with open-source fonts.
requires: branding-system
---

# AI branding (user-invoked)

Apply one of two company-inspired profiles without borrowing a company's voice or implying endorsement.

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

- The user asks for AI branding, an Anthropic-inspired system, or an OpenAI-inspired alternative
- Editorial warmth or precise monochrome structure must cross product, document, physical, or motion surfaces
- Existing work needs accessible semantic roles, open-source fonts, and a provider-rights boundary

## Procedure

1. Confirm the audience, content, surface, locale, delivery format, and approval owner.
2. Read `PROFILE.md`. Default to `provider: anthropic`. Use the separate `provider: openai` variant only when the user asks for it.
3. Read `TYPOGRAPHY.md` when the artifact contains text or needs a non-Latin script. Never substitute a proprietary provider font.
4. Read `SURFACES.md` for theme-specific composition, data, physical, and video decisions.
5. Read `SOURCES.md` before describing provenance or using any provider name, mark, product icon, or supplied asset.
6. Call the Skill tool with `branding-system`. Pass this skill name, the selected provider variant, the light or dark mode, the request, and the files already read.
7. Inspect the rendered artifact in every affected state. Return the engine's delivery receipt and the approval still required.

## Stop conditions

- The provider is ambiguous and the distinction changes the outcome → state the Anthropic default and ask whether to use it
- The request would mix provider marks, type, or distinctive assets → keep one provider variant or remove all marks
- A company asset lacks permission under current brand terms → use neutral text and the local theme profile without the asset
- A physical match lacks measured and approved samples → provide screen references and a sampling brief, not a paint specification
- Any requested release or production order lacks explicit approval → stop at `READY_FOR_REVIEW`

## Output contract

Return an AI-branded artifact and a branding-system receipt naming `provider: anthropic` or `provider: openai`, mode, surface, rights used, rendered checks, limitations, and approval owner.
