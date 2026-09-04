# Provenance and rights

Every profile separates a source from an adaptation. A palette source may define colors and names. This system decides how those values map to semantic roles, accessibility targets, typography, layouts, physical samples, and motion. Do not describe those additions as official guidance from the palette author.

## Required record

For each profile and artifact, record:

- Source URL and access date
- Source license or terms
- Which values came from the source
- Which values were adjusted or created for accessibility or production
- Font family, source, version, license, files, and subset
- Asset owner and permission for logos, marks, photographs, footage, music, voice, and likeness
- Output color space and production method

The machine profile requires a source and license for every variant. It also requires an OFL-1.1 declaration and source URL for each primary font role. The validator checks those fields. It cannot verify that a downloaded file matches the declared source, so the delivery receipt records file checksums.

## Company-inspired profiles

A company-inspired color and type profile is not permission to use that company's name, logo, product icon, trademark, trade dress, slogan, or endorsement language. Keep provider variants separate. Never combine their marks or imply a partnership.

Use only assets the requester supplies with rights or assets obtained from an authoritative brand portal under its current terms. When permission is unclear, use the color and typography profile without any company mark. Open-source code licenses do not grant trademark rights.

## Fonts

All primary pairings in these skills use fonts released under the SIL Open Font License 1.1. Package the actual license with distributed font files. Subset only the characters the artifact needs, and keep the reserved-font-name rules intact.

Latin coverage does not establish global language support. Choose a Noto family built for the target script, test shaping and line breaks with real translated copy, and keep the same typographic roles. Do not shrink translated text to force it into an English layout.

## Color sources and production values

Keep original palette values in the profile's source table. Semantic colors may use another value from the same palette, or a documented local adjustment, when the source value fails the role's contrast or production requirement. Label the decision.

An RGB or hex value describes emitted screen color. CMYK, spot ink, paint, textile, plastic, metal, and illuminated signage need device or material specifications and approved samples. Record measured Lab values and conditions. Do not fabricate a Pantone, paint, or material match from a screen value.
