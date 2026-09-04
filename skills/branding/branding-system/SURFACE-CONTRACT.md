# Surface contract

The system uses the same semantic roles and verbal identity everywhere. It does not force one layout onto every medium. Each surface has different production constraints and a different proof of completion.

## Common intake

Record the audience, message, locale, artifact owner, selected theme and variant, light or dark mode, channel, dimensions, production method, delivery format, deadline, and review environment. Record supplied assets and the rights attached to them.

## Digital product and native UI

- Map tokens to design-system roles. Do not scatter raw palette values through components.
- Define default, hover, active, focus, selected, disabled, loading, empty, success, warning, and error states.
- Test keyboard order, semantics, zoom, reflow, forced colors, reduced motion, and light and dark modes.
- Keep content usable when a branded font fails to load.

## Documents, PDF, and presentations

- Use a reading order that survives export. Tag headings, lists, tables, links, figures, and language in the final PDF.
- Use one argument per slide. Put evidence and sources in notes or adjacent text, not in unreadably small type.
- Default office printing to the light mode. A dark document is an explicit digital-delivery decision because it uses more ink and can reproduce unevenly.
- The generated `press-palette.md` maps the theme to the existing press renderer. It does not prove PDF tags, reading order, or print quality.

## Print and editorial production

- Convert from the source RGB values through the printer's supplied ICC profile. An ICC profile describes how a device reproduces color.
- Request a contract proof for consequential work. Check total ink, overprint, trapping, small reversed text, image resolution, folds, trim, and bleed.
- Record spot-color or process-color choices as production values. Do not present an automatic RGB-to-CMYK conversion as an approved match.

## Email and social media

- Build email for images-off, dark-mode changes, narrow screens, and client font fallback. Keep the action readable as text.
- Keep social templates within each platform's current crop and safe-area behavior. Place essential information in the caption as well as the image.
- Provide useful alt text. Burned-in text still needs a text equivalent.

## Iconography and data visualization

- Build icons on one documented grid with consistent stroke, corner, optical weight, and filled-area rules.
- Test icons at their smallest delivered size. Pair unfamiliar icons with labels.
- Use a fixed series order. Distinguish adjacent series with direct labels, shapes, line styles, or patterns as well as color.
- State the scale, units, source, time range, missing data, and uncertainty. Do not use three-dimensional perspective to inflate values.

## Environmental and physical applications

- Treat screen colors as intent references. Measure candidate paint, ink, vinyl, textile, plastic, metal, or light with a spectrophotometer.
- Record CIE Lab values, light reflectance value where relevant, gloss or finish, substrate, batch, illuminant, observer, and measurement method.
- Review samples under the intended daytime and artificial lighting. Check metamerism, where two colors match under one light but not another.
- Use an approved physical sample as the production master. A hex value is never a wall-paint specification.
- Verify sign legibility at the real distance and movement speed. Check local building, safety, and accessibility codes separately.

## Delivery receipt

Each delivery names the source profile and version, surface, dimensions, color space, font files and licenses, accessibility evidence, production proof or rendered inspection, limitations, and approval owner. `OUTPUT-CONTRACT.md` defines status words.
