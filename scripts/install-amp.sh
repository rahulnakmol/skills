#!/usr/bin/env bash
# Install promoted skills into Amp, at the scope the caller chooses.
#
# Amp's own installer, `amp skill add <source>`, copies one skill directory or
# one directory of skill directories. It scans only one level deep, so the
# repository root (skills/<group>/<skill>) does not install as a whole, and it
# copies nothing that lacks a SKILL.md, so group doctrine such as
# skills/pm/GATES.md does not arrive with the skills that cite it. This script
# closes both gaps without copying any skill inside the repository:
#
#   - it resolves a selection (everything, a group, or a skill) with
#     scripts/link-skills.sh, so groups bring core and a skill brings what its
#     frontmatter `requires`, exactly as the other tools' install does;
#   - it runs one `amp skill add` per source path, pointing at skills/ itself;
#   - it adds the generated doctrine wrappers under adapters/amp/skills/ and
#     the Amp router skill `tqn`, which tells Amp where a citation resolves and
#     when one of Amp's own tools should be used instead of a skill.
#
# Scope is Amp's, not this script's: --target puts skills in one project,
# --global in ~/.config/agents/skills for every project on the machine. A
# workspace-wide install goes through scripts/publish-amp-skills.sh instead.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO_SLUG="tqnonline/skills"
AMP_SKILLS_DIR="adapters/amp/skills"
ROUTER="tqn"

WANT_GROUPS=(); WANT_SKILLS=()
DEST_ARGS=(); DEST_LABEL=".agents/skills (this project)"
FROM="checkout"; PRINT=0; DRY_RUN=0; OVERWRITE=1

die() { echo "install-amp: $1" >&2; exit 2; }

usage() {
  cat <<'USAGE'
Usage: install-amp.sh [selection] [destination] [options]

Selection (default: every promoted skill):
  --group <name>   One group, plus core and both groups' doctrine. Repeatable.
  --skill <name>   One skill, plus what its frontmatter `requires` and the
                   doctrine of its group and of core. Repeatable.

Destination (default: .agents/skills in the current project):
  --global         ~/.config/agents/skills, read by every project on this machine.
  --target <dir>   A directory of your choice.

Options:
  --from github    Install from github.com/tqnonline/skills instead of this checkout.
  --print          Print the `amp skill add` commands and exit without running them.
  --dry-run        Same as --print, for symmetry with the other install scripts.
  --keep-existing  Leave a skill that is already installed alone (default: overwrite).
  --list           List groups and their skills, then exit.
  -h, --help       Show this message.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --group) [[ $# -ge 2 ]] || die "--group needs a name"; WANT_GROUPS+=("$2"); shift 2 ;;
    --skill) [[ $# -ge 2 ]] || die "--skill needs a name"; WANT_SKILLS+=("$2"); shift 2 ;;
    --global) DEST_ARGS=(--global); DEST_LABEL="~/.config/agents/skills (global)"; shift ;;
    --target) [[ $# -ge 2 ]] || die "--target needs a directory"; DEST_ARGS=(--target "$2"); DEST_LABEL="$2"; shift 2 ;;
    --from) [[ $# -ge 2 ]] || die "--from needs checkout or github"; FROM="$2"; shift 2 ;;
    --print|--dry-run) PRINT=1; shift ;;
    --keep-existing) OVERWRITE=0; shift ;;
    --list) exec bash "$ROOT/scripts/link-skills.sh" --list ;;
    -h|--help) usage; exit 0 ;;
    *) die "unknown option $1 (try --help)" ;;
  esac
done
case "$FROM" in checkout|github) ;; *) die "--from must be checkout or github" ;; esac
if [[ $PRINT -eq 0 ]] && ! command -v amp >/dev/null 2>&1; then
  die "the amp CLI is not on PATH; use --print to see the commands"
fi

# The selection is link-skills.sh's, read from its dry run so the two installs
# cannot drift: a group brings core, a skill brings its `requires`.
SELECT_ARGS=()
for g in "${WANT_GROUPS[@]:-}"; do [[ -n "$g" ]] && SELECT_ARGS+=(--group "$g"); done
for s in "${WANT_SKILLS[@]:-}"; do [[ -n "$s" ]] && SELECT_ARGS+=(--skill "$s"); done
MARK="/amp-selection"
SELECTION="$(bash "$ROOT/scripts/link-skills.sh" --dry-run --target "$MARK" ${SELECT_ARGS[@]+"${SELECT_ARGS[@]}"})"

SKILL_PATHS=()   # skills/<group>/<skill>
DOCTRINE_GROUPS=()        # groups whose doctrine wrapper is needed
while IFS= read -r line; do
  [[ "$line" == "would link $MARK/"* ]] || continue
  src="${line##* -> }"
  rel="${src#"$ROOT"/}"
  tail="${rel#skills/}"
  case "$rel" in
    skills/*/*) SKILL_PATHS+=("$rel"); DOCTRINE_GROUPS+=("${tail%%/*}") ;;
    skills/*)   DOCTRINE_GROUPS+=("$tail") ;;
  esac
done <<< "$SELECTION"
[[ ${#SKILL_PATHS[@]} -gt 0 ]] || die "the selection resolved to no skills"

# A lone --skill gets its group's doctrine and core's here, unlike the symlink
# install: an Amp copy has no checkout beside it to fall back on.
if [[ ${#WANT_GROUPS[@]} -eq 0 && ${#WANT_SKILLS[@]} -gt 0 ]]; then DOCTRINE_GROUPS+=("core"); fi

dedupe() { printf '%s\n' "$@" | awk 'NF && !seen[$0]++'; }
read_lines() { _LINES=(); local l; while IFS= read -r l; do _LINES+=("$l"); done; }
read_lines < <(dedupe "${SKILL_PATHS[@]}"); SKILL_PATHS=("${_LINES[@]}")
read_lines < <(dedupe "${DOCTRINE_GROUPS[@]}");      DOCTRINE_GROUPS=("${_LINES[@]}")

# Whole groups install with one call per group; a skill selection installs one
# call per skill. Either way the source is the skill's one home under skills/.
SOURCES=()
if [[ ${#WANT_SKILLS[@]} -eq 0 ]]; then
  for g in "${DOCTRINE_GROUPS[@]}"; do SOURCES+=("skills/$g"); done
else
  for p in "${SKILL_PATHS[@]}"; do SOURCES+=("$p"); done
fi
for g in "${DOCTRINE_GROUPS[@]}"; do
  [[ -d "$ROOT/$AMP_SKILLS_DIR/$g-doctrine" ]] && SOURCES+=("$AMP_SKILLS_DIR/$g-doctrine")
done
SOURCES+=("$AMP_SKILLS_DIR/$ROUTER")

source_arg() { # rel -> what `amp skill add` receives
  if [[ "$FROM" == "github" ]]; then echo "$REPO_SLUG/$1"; else echo "$ROOT/$1"; fi
}

EXTRA=(); [[ $OVERWRITE -eq 1 ]] && EXTRA+=(--overwrite)
failures=0
installed=0
for rel in "${SOURCES[@]}"; do
  cmd=(amp skill add "$(source_arg "$rel")" ${DEST_ARGS[@]+"${DEST_ARGS[@]}"} ${EXTRA[@]+"${EXTRA[@]}"})
  if [[ $PRINT -eq 1 ]]; then
    printf '%q ' "${cmd[@]}"; echo
    continue
  fi
  # `amp skill add` exits 0 even when a skill fails to install, so read its report.
  out="$("${cmd[@]}" 2>&1)" || true
  echo "$out" | grep -E '^(✓|✗)' || true
  ok=$(echo "$out" | grep -c '^✓' || true); installed=$((installed + ok))
  if echo "$out" | grep -q '✗'; then
    failures=$((failures + 1))
  elif [[ $ok -eq 0 ]]; then
    echo "$out" | tail -3; failures=$((failures + 1))
  fi
done

if [[ $PRINT -eq 1 ]]; then exit 0; fi
echo "Installed $installed skill(s) from ${#SOURCES[@]} source(s) into $DEST_LABEL"
if [[ $failures -gt 0 ]]; then echo "install-amp: $failures source(s) reported a failure" >&2; exit 1; fi
