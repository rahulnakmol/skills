# Accessibility quality bar

"A+" is this system's internal review label. It is not a certification. A palette, component, or automated report cannot certify a complete experience.

## Baseline and enhanced targets

Every complete digital artifact targets WCAG 2.2 Level AA. The enhanced A+ review adds these targets where the content permits them:

- Normal text contrast: at least 7:1
- Large text contrast: at least 4.5:1
- User interface boundaries, meaningful graphics, and focus indicators: at least 3:1 against adjacent colors
- Pointer targets: at least 44 by 44 CSS pixels unless an equivalent inline exception applies
- Text zoom and reflow: readable at 200 percent zoom and at a 320 CSS pixel viewport without two-dimensional scrolling, except where the content itself requires it
- Keyboard access: every action is reachable, visible in sequence, and operable without a pointer
- Semantics: headings, names, roles, values, errors, and status changes are available to assistive technology
- Preferences: forced colors, high contrast, text spacing, reduced motion, and dark mode preserve meaning and operation

Do not claim Level AAA for an entire site or product from a component sample. Some content cannot meet every AAA success criterion, which is why WCAG does not recommend site-wide AAA as a general policy.

## Color rules

- Use the profile's semantic role, not a raw palette value chosen by appearance.
- Never make color the only carrier of status, series, selection, or error. Pair it with text, shape, pattern, position, or iconography.
- Treat `accent` as decoration unless its use is tested for the role it takes on.
- Use `ink` or `ink-muted` for text. Use `action-ink` only on `action`.
- Test overlays against the composited result, not the color token alone.
- Recheck screenshots, charts, gradients, photographs, video, and disabled states. Token-level tests cannot see their final pixels.

## Interaction and cognition

- Keep focus order aligned with reading order.
- Show a persistent focus indicator. Do not remove an outline without an equal or stronger replacement.
- Put errors beside the affected field and summarize them at the start of a failed form.
- Preserve entered data after validation errors.
- Avoid time limits. When one is necessary, warn the user and provide a way to extend it.
- Use consistent names and positions for repeated actions.
- Explain irreversible consequences before the action.
- Offer a plain alternative to drag, gesture, hover, sound, animation, or spatial instructions.

## Media

- Caption spoken content and meaningful sounds.
- Provide a transcript for audio and video.
- Provide audio description when important visual information is not in the main audio.
- Do not exceed three flashes in any one-second period. Test the rendered sequence, including edits and transitions.
- Keep titles and captions inside delivery-safe areas without covering faces, gestures, charts, or source subtitles.
- Provide a reduced-motion version for nonessential movement.

## Evidence

Use automated checks for repeatable failures, then test the rendered artifact with a keyboard, zoom and reflow, forced colors, reduced motion, and at least one screen reader for the target platform. Record the tool, version, state, and result. For multimedia, also record caption, transcript, audio-description, flash, loudness, and color-space checks that apply.
