# Motion, generated video, and color grading

Video is a full brand surface. A logo on an unreviewed edit is not a branded video. The message, image system, motion, sound, captions, grade, and delivery transform must work together.

## Preproduction

Create a brief with audience, message, duration, aspect ratios, frame rate, intended displays, delivery color spaces, accessibility deliverables, rights, and approval owner. Build these artifacts before generation or editing:

1. Message beats and spoken script
2. Storyboard with shot purpose, composition, action, duration, and transition
3. Two or more style frames using the selected theme profile
4. Title, lower-third, caption, chart, end-card, and thumbnail systems
5. Sound direction, music rights, silence, and audio-description plan

## Prompt grammar for generated footage

Describe each shot in this order:

`subject and action | setting and time | framing and camera behavior | light and material | theme roles | motion cadence | exclusions | duration and delivery`

Use semantic descriptions such as "warm paper canvas with dark editorial type" rather than raw hex values in a generation prompt. Reserve exact tokens for titles, graphics, compositing, and grade references. State continuity anchors for people, products, wardrobe, direction of travel, light, and lens behavior. Review generated material for factual errors, harmful stereotypes, rights, and unintended marks.

## Motion system

- Give movement a purpose: orientation, causality, hierarchy, progress, or feedback.
- Define durations and easing by role, not by component name. Keep entrances, emphasis, exits, and continuous motion distinct.
- Use restrained spatial movement for dense information. Do not make the viewer track several moving regions at once.
- Build a reduced-motion cut that removes parallax, simulated camera movement, and nonessential looping while preserving sequence and meaning.
- Hold text long enough to read. Confirm reading time in the final edit, not in a static board.

## Titles, captions, and description

- Keep titles and lower thirds inside the platform's delivery-safe area.
- Use the profile's body face for captions unless the locale needs a Noto script face. Favor stable letterforms over display personality.
- Check caption line breaks, speaker identification, meaningful sounds, timing, and contrast over every underlying shot.
- Deliver an edited transcript. Add audio description when the main audio does not explain important visual information.
- Do not place branded lower thirds over source captions, hands, faces, or evidence in a chart.

## Color pipeline

1. Identify and tag each camera, generated, screen-recorded, stock, and graphic source color space.
2. Transform sources into one documented working space. Balance exposure and white point before applying a look.
3. Protect skin tones, neutrals, product colors, safety colors, and evidence-bearing footage. Theme color belongs in controlled contrast, graphics, sets, and selective shaping, not as a cast over everything.
4. Build the creative look shot by shot against approved style frames. Do not derive a universal lookup table directly from palette hex values.
5. Transform to each delivery target, including Rec.709 and Display P3 when requested. Review every transform on a suitable display and inspect scopes.
6. Check legal range, clipping, banding, compression, subtitles, graphics, and thumbnails in the encoded file.

A reusable three-dimensional lookup table may be exported only after a grade is approved for a named input, working, and output pipeline. It is not a general theme asset.

## Final quality control

Watch the encoded deliverable from start to finish with sound, muted with captions, and with accessibility tracks. Run a flash test. Check loudness and true peak against the delivery specification. Verify frame rate, resolution, aspect ratio, color tags, audio channels, caption files, transcript, audio description, and checksum. A timeline preview is not delivery evidence.
