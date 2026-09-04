# Standalone visual artifacts

Load this guide only when an inline view is insufficient or the user asks for a file they can open and review.

## Choose the destination

Use the destination the user names. Otherwise use the host's designated review-artifact directory when one exists. If neither exists, ask before adding a new tracked directory to the repository. Name the file `spotlight-<subject>.html` with a short subject that does not disclose sensitive data.

Temporary render files are not deliverables. Remove them after verification. Return only the artifact intended for review.

## Keep one file self-contained

Embed styles and any required behavior in one HTML file. Do not fetch fonts, scripts, analytics, images, or stylesheets from the network. A review artifact should continue to work offline and should not disclose that it was opened.

Use semantic HTML, visible headings, logical reading order, keyboard-operable controls, and text labels for distinctions that color also carries. Support narrow and wide viewports. Respect reduced-motion preferences when motion is necessary to explain a transition.

Use inline JavaScript only when interaction carries the claim. Static comparisons do not need a runtime. Never evaluate source text as code, place unescaped source content into markup, or copy secrets into the artifact.

## Preserve provenance

Show the question, claim, and status in the artifact. Put observed, inferred, and proposed labels next to the relevant region. Include a compact source list with file and line references or the supplied statement that supports each material label.

List deliberate omissions and unknowns. These are part of the view, not production notes. A reader should be able to tell where the source ends and the agent's proposal begins without opening another document.

## Match the subject

For an existing product interface, use its real design tokens and components when they are available. State when an approximation substitutes for them. Do not invent polished metrics, customer data, or interaction states to make the artifact feel complete.

For architecture or process views, clarity outranks brand styling. Keep connectors legible, avoid crossings through labels, and keep one abstraction level per panel. A legend explains only encodings that are actually used.

## Verify the rendered result

Open the artifact in a real browser. Check the claim against its cited sources, then inspect both a narrow and wide viewport. Exercise every control and every representative state. Check keyboard operation, visible focus, text overflow, contrast, console errors, and whether the file makes any network request.

Capture one representative review image when the host supports it. Inspect the image rather than treating its existence as proof. If rendering is unavailable, return the source as `unverified` with the missing check named.

The verification report states what was exercised and what was not. “Opened successfully” does not establish responsive behavior, accessibility, source accuracy, or interaction correctness.

## Keep the boundary clear

A spotlight artifact explains. It does not become a production component, an architecture decision record, or evidence that the depicted behavior ran. If the user chooses to carry part of it into production, that work enters the owning delivery process with its own tests and review.
