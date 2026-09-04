# Branding group

Branding applies one identity to every surface an agent can help produce. Six user-invoked theme skills cover verbal identity, semantic color, open-source typography, product and native UI, documents, PDF, decks, print, email, social media, iconography, data visualization, environmental work, motion, generated video, and color grading.

`branding-system` is the model-invoked common engine. It defines the surface, accessibility, provenance, motion, and output contracts once. Each theme supplies the same four profile documents and calls that engine. A single-theme install brings its required engine without bringing unrelated themes.

`everforest-branding`, `catppuccin-branding`, `gruvbox-branding`, `nord-branding`, and `solarized-branding` adapt open palette projects. `ai-branding` defaults to an Anthropic-inspired profile and offers a separate `provider: openai` option. Company marks require their own permission and never mix across provider variants.

`press` remains the deterministic document renderer. The common engine generates a compatible palette file for any profile, but final PDF accessibility and print proof still require artifact-level review.

The group installs on its own and references no other group.
