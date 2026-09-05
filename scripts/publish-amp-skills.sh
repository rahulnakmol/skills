#!/usr/bin/env bash
# Stage a selection of skills into an Amp-hosted Personal Skills or Workspace
# Skills repository so every orb the owner (or the workspace) opens sees them.
#
# The script clones the hosted repository (or initializes an empty one when
# Amp has not created it yet), copies the selected skills in as top-level
# <skill>/ directories, adds the Amp doctrine wrappers and the `tqn` router,
# commits locally, and stops. Pushing is the operator's decision; the script
# prints the exact command. Nothing under skills/ is copied into this
# repository; the hosted repository is the copy, and this script is the only
# path that produces it.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AMP_SKILLS_DIR="adapters/amp/skills"
ROUTER="tqn"

usage() {
  cat <<'EOF'
Usage: scripts/publish-amp-skills.sh --scope personal|workspace [selection] [options]

Selection (default: every skill):
  --group <name>   One group plus core. Repeatable.
  --skill <name>   One skill plus its declared requirements. Repeatable.

Options:
  --checkout <dir> Where the hosted repository is cloned or initialized.
                   Default: ~/.cache/amp/repositories/ampcode.com-<scope>-skills
  --message <msg>  Commit message. Default names the selection and source commit.
  --dry-run        Print the plan (clone target, skills, commit) and change nothing.
  --push           Push after committing. Off by default; the script prints the
                   push command instead.
  -h, --help       Show this message.

Scopes:
  personal   Your User Skills repository (`amp clone user-skills`). Skills load
             in every orb and CLI session you open, in any project.
  workspace  The Workspace Skills repository (`amp clone workspace-skills`).
             Skills load for every member of the Amp workspace.

Examples:
  scripts/publish-amp-skills.sh --scope personal --group pm --dry-run
  scripts/publish-amp-skills.sh --scope workspace
EOF
}

die() { echo "publish-amp-skills: $*" >&2; exit 2; }

SCOPE=""; CHECKOUT=""; MESSAGE=""; DRY_RUN=0; PUSH=0
WANT_GROUPS=(); WANT_SKILLS=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --scope)    [[ $# -ge 2 ]] || die "--scope needs a value"; SCOPE="$2"; shift 2 ;;
    --group)    [[ $# -ge 2 ]] || die "--group needs a name"; WANT_GROUPS+=("$2"); shift 2 ;;
    --skill)    [[ $# -ge 2 ]] || die "--skill needs a name"; WANT_SKILLS+=("$2"); shift 2 ;;
    --checkout) [[ $# -ge 2 ]] || die "--checkout needs a directory"; CHECKOUT="$2"; shift 2 ;;
    --message)  [[ $# -ge 2 ]] || die "--message needs text"; MESSAGE="$2"; shift 2 ;;
    --dry-run)  DRY_RUN=1; shift ;;
    --push)     PUSH=1; shift ;;
    -h|--help)  usage; exit 0 ;;
    *) die "unknown argument: $1 (see --help)" ;;
  esac
done

case "$SCOPE" in
  personal)  CLONE_REF="user-skills";      REPO_LABEL="User Skills" ;;
  workspace) CLONE_REF="workspace-skills"; REPO_LABEL="Workspace Skills" ;;
  "") die "--scope personal|workspace is required" ;;
  *)  die "unknown scope: $SCOPE" ;;
esac
command -v amp >/dev/null || die "the amp CLI is not on PATH"

# The hosted repository URL comes from Amp itself, so the script never guesses
# a user or workspace handle.
REPO_URL="$(amp skill repositories 2>/dev/null \
  | awk -v label="$REPO_LABEL" '$0 ~ "^"label {found=1; next} found && /https:\/\// {print $1; exit}')"
[[ -n "$REPO_URL" ]] || die "could not read the $REPO_LABEL repository URL from 'amp skill repositories'"

if [[ -z "$CHECKOUT" ]]; then
  CHECKOUT="$HOME/.cache/amp/repositories/ampcode.com-$SCOPE-skills"
fi

# Resolve the selection with the same rules link-skills.sh applies for every
# other tool: a group brings core; a skill brings its `requires:`.
LINK_ARGS=(--dry-run --target /amp-selection)
for g in ${WANT_GROUPS[@]+"${WANT_GROUPS[@]}"}; do LINK_ARGS+=(--group "$g"); done
for s in ${WANT_SKILLS[@]+"${WANT_SKILLS[@]}"}; do LINK_ARGS+=(--skill "$s"); done
SELECTION="$("$ROOT/scripts/link-skills.sh" "${LINK_ARGS[@]}")"

SKILL_DIRS=()   # skills/<group>/<skill>
DOCTRINE_GROUPS=()
while IFS= read -r line; do
  [[ "$line" == *" -> "* ]] || continue
  src="${line##* -> }"
  rel="${src#"$ROOT"/}"
  case "$rel" in
    skills/*/*) SKILL_DIRS+=("$rel"); DOCTRINE_GROUPS+=("$(echo "$rel" | cut -d/ -f2)") ;;
    skills/*)   for d in "$ROOT/$rel"/*/; do [[ -f "$d/SKILL.md" ]] && SKILL_DIRS+=("${d#"$ROOT"/}"); done
                DOCTRINE_GROUPS+=("${rel#skills/}") ;;
  esac
done <<< "$SELECTION"
if [[ ${#WANT_GROUPS[@]} -eq 0 && ${#WANT_SKILLS[@]} -gt 0 ]]; then DOCTRINE_GROUPS+=("core"); fi

dedupe() { printf '%s\n' "$@" | sed 's:/*$::' | awk 'NF && !seen[$0]++' | sort; }
read_lines() { _LINES=(); local l; while IFS= read -r l; do _LINES+=("$l"); done; }
read_lines < <(dedupe "${SKILL_DIRS[@]}"); SKILL_DIRS=("${_LINES[@]}")
read_lines < <(dedupe "${DOCTRINE_GROUPS[@]}"); DOCTRINE_GROUPS=("${_LINES[@]}")
[[ ${#SKILL_DIRS[@]} -gt 0 ]] || die "the selection resolved to no skills"

EXTRA_DIRS=()   # adapters/amp/skills/<name>
for g in "${DOCTRINE_GROUPS[@]}"; do
  [[ -d "$ROOT/$AMP_SKILLS_DIR/$g-doctrine" ]] && EXTRA_DIRS+=("$AMP_SKILLS_DIR/$g-doctrine")
done
EXTRA_DIRS+=("$AMP_SKILLS_DIR/$ROUTER")

SOURCE_COMMIT="$(git -C "$ROOT" rev-parse --short HEAD 2>/dev/null || echo unknown)"
if [[ -z "$MESSAGE" ]]; then
  if [[ ${#WANT_GROUPS[@]} -eq 0 && ${#WANT_SKILLS[@]} -eq 0 ]]; then sel="all skills"
  else sel="$(printf '%s ' ${WANT_GROUPS[@]+"${WANT_GROUPS[@]}"} ${WANT_SKILLS[@]+"${WANT_SKILLS[@]}"})"; sel="${sel% }"; fi
  MESSAGE="Publish $sel from tqnonline/skills@$SOURCE_COMMIT"
fi

echo "Scope:      $SCOPE ($REPO_LABEL)"
echo "Repository: $REPO_URL"
echo "Checkout:   $CHECKOUT"
echo "Skills:     ${#SKILL_DIRS[@]} + ${#EXTRA_DIRS[@]} Amp-only"
for d in "${SKILL_DIRS[@]}" "${EXTRA_DIRS[@]}"; do echo "  $(basename "$d")  <- $d"; done
echo "Commit:     $MESSAGE"
if [[ $DRY_RUN -eq 1 ]]; then echo "(dry run: nothing changed)"; exit 0; fi

# Clone the hosted repository, or start one when Amp has not created it yet.
# Amp creates the repository on the first push.
if [[ -d "$CHECKOUT/.git" ]]; then
  git -C "$CHECKOUT" fetch --quiet origin 2>/dev/null || true
  default_ref="$(git -C "$CHECKOUT" symbolic-ref --quiet refs/remotes/origin/HEAD 2>/dev/null || true)"
  if [[ -n "$default_ref" ]]; then git -C "$CHECKOUT" reset --quiet --hard "${default_ref#refs/remotes/}"; fi
else
  mkdir -p "$(dirname "$CHECKOUT")"
  if ! amp clone "$CLONE_REF" "$CHECKOUT" >/dev/null 2>&1 || [[ ! -d "$CHECKOUT/.git" ]]; then
    echo "The $REPO_LABEL repository does not exist yet; initializing a local one. The first push creates it."
    rm -rf "$CHECKOUT"
    git init --quiet --initial-branch=main "$CHECKOUT"
    git -C "$CHECKOUT" remote add origin "$REPO_URL"
    amp git-setup >/dev/null 2>&1 || true
  fi
fi

# Replace only what this run publishes; leave other skills in the repository alone.
for d in "${SKILL_DIRS[@]}" "${EXTRA_DIRS[@]}"; do
  name="$(basename "$d")"
  rm -rf "$CHECKOUT/$name"
  cp -R "$ROOT/$d" "$CHECKOUT/$name"
done
# Each hosted copy records where it came from so a reader can find the source.
{
  echo "# Published from tqnonline/skills"
  echo
  echo "Source commit: $SOURCE_COMMIT"
  echo "Published on: $(date -u +%Y-%m-%d)"
  echo
  echo "These directories are copies produced by scripts/publish-amp-skills.sh in"
  echo "https://github.com/tqnonline/skills. Edit the source there, then publish again."
} > "$CHECKOUT/PUBLISHED-FROM.md"

git -C "$CHECKOUT" add -A
if git -C "$CHECKOUT" diff --cached --quiet; then
  echo "Nothing changed: the hosted repository already matches the selection."
  exit 0
fi
git -C "$CHECKOUT" -c commit.gpgsign=false commit --quiet -m "$MESSAGE"
echo "Committed in $CHECKOUT: $(git -C "$CHECKOUT" rev-parse --short HEAD)"

branch="$(git -C "$CHECKOUT" rev-parse --abbrev-ref HEAD)"
if [[ $PUSH -eq 1 ]]; then
  git -C "$CHECKOUT" push --set-upstream origin "$branch"
  echo "Pushed. Run 'amp skill list' in a new session to confirm the skills load."
else
  echo "Not pushed. To publish, run:"
  echo "  git -C $CHECKOUT push --set-upstream origin $branch"
fi
