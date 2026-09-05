# Brands: where a page's colors, type, and motion come from

Exhibit renders a page in a brand it did not define. The brand comes from a profile in the `branding-system` schema: a `PROFILE.md` whose fenced `json profile` block names the colors of each variant in light and dark mode, the type stacks, and the motion rules. `scaffold.mjs` reads that block, emits it as CSS custom properties, and `verify.mjs` holds the finished page to the same values. Neither script reads the brand's prose. This document states how a page finds its brand, what the scripts take from the profile, and how to derive a profile for a brand that has none.

## Two ways to name a brand

`--theme <skill>` names one of the six theme skills in this group: `ai-branding`, `catppuccin-branding`, `everforest-branding`, `gruvbox-branding`, `nord-branding`, or `solarized-branding`. The scaffold reads `skills/branding/<skill>/PROFILE.md`. This is the common case and needs no preparation.

`--brand <path>` names a brand kept outside this repository. The path may be a directory holding `PROFILE.md`, the `PROFILE.md` file itself, or a `.skill` archive, which the scaffold unpacks with the system `unzip` into a temporary directory and searches for `PROFILE.md`. The user's brand repository stays the single source of truth; exhibit copies nothing out of it. When no profile is found, the scaffold exits `2` and names this document, because deriving a profile is a reading task for the agent and a review task for a person, not a parsing task for a script.

The two flags are exclusive. The finished page records the choice in `data-theme`, so `verify.mjs` can run later without either flag.

## What the scripts take from a profile

The profile's shape is defined by `branding-system/scripts/profile-lib.mjs`, and `validate-profiles.mjs` in the same directory checks every profile in this group. Exhibit uses these parts.

| Profile field | Used by | Effect |
|---|---|---|
| `skill`, `title` | scaffold | `data-theme` on `<html>` and the masthead kicker. |
| `defaultVariant`, `variants` | scaffold, verify | The variant the page renders when `--variant` is not given. Each variant carries its own type and colors. |
| `variants.<name>.modes.light.colors`, `.dark.colors` | scaffold, verify | Thirteen color roles become `--brand-<role>` in a light block and a `prefers-color-scheme: dark` block. `verify.mjs` fails any color on the page outside the variant's light and dark sets, and any named color. The first four series roles (`accent`, `focus`, `success`, `warning`) become `--x-series-1` to `--x-series-4`. |
| `variants.<name>.typography.{display,body,mono}.stack` | scaffold, verify | `--brand-font-display`, `--brand-font-body`, `--brand-font-mono`. `--fonts embed` looks for `<brand dir>/fonts/<FamilyWithoutSpaces>-<weight>.woff2` for each family; `--fonts link` builds one Google Fonts link from the family names. |
| `motion.grade` | scaffold, verify | How much movement the brand permits: `calm`, `fluid`, or `expressive`. The grade caps the register (`calm` renders as `document`, `fluid` as `product`) and the set of effects an act may ask for. |
| `motion.register` | scaffold | The presentation the page reaches for when neither the storyboard nor `--register` says: `document`, `product`, or `cinematic`. |
| `motion.duration`, `motion.easing` | scaffold, runtime | `--x-dur-micro`, `--x-dur-reveal`, `--x-dur-scene`, and the three easing tokens. The runtime registers the easings with GSAP under `brand-standard`, `brand-enter`, and `brand-exit`, so a page's tweens use the brand's curves. |
| `motion.parallax` | scaffold, runtime | The default depth factor `x-parallax` uses when an element gives none. |
| `motion.forbid` | scaffold, verify, runtime | Effects the brand never permits, written to `data-motion-forbid`. The scaffold refuses a storyboard that asks for one; `verify.mjs` fails a page that uses one; the runtime skips the directive at run time as a last defense. |
| `voice.avoid` | verify | Phrases the brand's voice rejects. When the list is present, `brand.voice` searches the page text for each phrase, case-insensitive. |

Anything else in the profile, provenance, the fallback policy, the prose above the block, is for the agent to read while authoring and for the report to cite.

## Motion belongs to the brand; effects belong to exhibit

The profile decides how much a page may move and with what timing. Exhibit decides what the movement is: the eight named effects (`reveal`, `focus`, `count`, `highlight`, `morph`, `draw`, `spotlight`, `parallax`), the `x-*` directives that produce them, and the `cinematic` register's scene beats. This split keeps a brand's motion rules to one block that any renderer can honor, while the animation code lives once, in exhibit's runtime, where it can change without touching six profiles.

Every profile in this group is currently graded `expressive` with a `cinematic` register, the same durations, and an empty forbid list. That is a decision about the house, not a property of the schema: a brand can be restrained by editing its own `motion` block, and exhibit will render it as a quieter page without any change to a storyboard.

## Deriving a profile for an external brand

A brand kept as prose, a `SKILL.md` with reference files for color, type, and voice, has no `PROFILE.md`. The agent derives one once, and a person reviews it before it is written beside the brand.

1. Read the brand the way it asks to be read: its `SKILL.md` first, then the files it names for color, type, patterns, voice, and motion.
2. Decide how many variants the brand has. A brand that separates a document identity from a product identity has two; give each a `variants` entry and name the one the brand treats as primary in `defaultVariant`.
3. Fill each color role from the brand's tokens, in both modes. Where the brand names a role directly (page background, text, border), copy it. Where it does not, choose by function and record the choice in the prose above the block: `accent` takes the one accent, `action` and `action-ink` take the brand's primary button and its label, `focus` takes the focus ring, `success`, `warning`, and `error` take the status colors. A brand with no dark set needs one derived; say so, and mark it as a local addition.
4. Copy the font stacks as written, with the brand's own fallbacks, and record each family's source and license.
5. Set the `motion` block from the brand's own motion guidance where it exists: a brand that forbids parallax or morphing lists the effect under `forbid`; a brand that asks for restraint takes `calm` or `fluid`. Where the brand says nothing, take the `DEFAULT_MOTION` values from `profile-lib.mjs` and say that they are exhibit's defaults.
6. Copy the voice file's list of phrases to avoid into `voice.avoid`, in lower case.
7. Record provenance for the palette and fonts as `PROVENANCE.md` in `branding-system` asks, and record any discrepancy between two places in the source, with the value chosen.
8. Validate before handing over: `node skills/branding/branding-system/scripts/validate-profiles.mjs <path to PROFILE.md>` names each problem; `scaffold.mjs --brand <dir>` exits `2` with the same list.
9. Show the profile to the user, with the notes. Write it beside the brand only after they have read it.

## Limits

The profile carries the brand's rules, not the brand's judgment. It can say that every color on a page is one of the brand's twenty-six values; it cannot say whether the page feels like the brand. The agent reads the rendered captures for that and reports what it saw. A brand whose prose changes needs its profile re-derived, and nothing detects the drift automatically.
