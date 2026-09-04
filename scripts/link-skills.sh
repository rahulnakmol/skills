#!/usr/bin/env bash
# Link promoted skills into the buckets the supported tools read.
#
# Per ADR 0007 each group installs on its own, so selection is scoped: a whole
# group, several groups, or a single skill. Selecting any group also links
# `core`, because every group is allowed to reference core doctrine and none of
# them resolve without it. Each selected group also gets a doctrine link, since
# group-level documents such as GATES.md are referenced by the skills inside
# the group and are not part of any one skill directory.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PREFIX="rahulnakmol"
SHARED="core"

WANT_GROUPS=()
SKILLS=()
TARGET=""
DRY_RUN=0
WITH_CORE=1

die() { echo "link-skills: $1" >&2; exit 2; }

all_groups() {
  for d in "$ROOT"/skills/*/; do [[ -d "$d" ]] && basename "$d"; done
}
skills_in_group() {
  for d in "$ROOT"/skills/"$1"/*/; do [[ -f "$d/SKILL.md" ]] && basename "$d"; done
}
group_of_skill() {
  for g in $(all_groups); do
    [[ -f "$ROOT/skills/$g/$1/SKILL.md" ]] && { echo "$g"; return 0; }
  done
  return 1
}
requirements_of_skill() {
  local g; g="$(group_of_skill "$1")" || return 1
  awk '
    NR == 1 && $0 == "---" { in_frontmatter = 1; next }
    in_frontmatter && $0 == "---" { exit }
    in_frontmatter && /^requires:[[:space:]]*/ {
      sub(/^requires:[[:space:]]*/, "")
      if (length($0) > 0) print
    }
  ' "$ROOT/skills/$g/$1/SKILL.md"
}
contains() { # value items...
  local needle="$1" item; shift
  for item in "$@"; do [[ "$item" == "$needle" ]] && return 0; done
  return 1
}

usage() {
  cat <<'USAGE'
Usage: link-skills.sh [options] [target-dir]

  --group <name>   Link one group and core. Repeatable.
  --skill <name>   Link one skill and its declared requirements. Repeatable.
  --target <dir>   Link into this directory instead of the default buckets.
  --no-core        Do not add core alongside a selected group.
  --dry-run        Print what would be linked and change nothing.
  --list           List groups and their skills, then exit.
  -h, --help       Show this message.

With no --group or --skill, every promoted skill is linked.
A bare target directory is still accepted as the first positional argument.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --group) [[ $# -ge 2 ]] || die "--group needs a name"; WANT_GROUPS+=("$2"); shift 2 ;;
    --skill) [[ $# -ge 2 ]] || die "--skill needs a name"; SKILLS+=("$2"); shift 2 ;;
    --target) [[ $# -ge 2 ]] || die "--target needs a directory"; TARGET="$2"; shift 2 ;;
    --no-core) WITH_CORE=0; shift ;;
    --dry-run) DRY_RUN=1; shift ;;
    --list)
      for g in $(all_groups); do
        echo "$g: $(skills_in_group "$g" | tr '\n' ' ')"
      done
      exit 0 ;;
    -h|--help) usage; exit 0 ;;
    -*) die "unknown option $1 (try --help)" ;;
    *) [[ -z "$TARGET" ]] || die "target given twice"; TARGET="$1"; shift ;;
  esac
done

# Resolve the selection into a set of groups whose doctrine is linked and a set
# of skills. An explicit --skill does not drag its whole group along, but it
# does carry any skill named by a frontmatter `requires` field.
SELECTED_GROUPS=(); SELECTED_SKILLS=()
if [[ ${#WANT_GROUPS[@]} -eq 0 && ${#SKILLS[@]} -eq 0 ]]; then
  for g in $(all_groups); do
    # A charter group with no promoted skills yet has nothing to install.
    [[ -n "$(skills_in_group "$g")" ]] || continue
    SELECTED_GROUPS+=("$g")
    while read -r s; do [[ -n "$s" ]] && SELECTED_SKILLS+=("$s"); done < <(skills_in_group "$g")
  done
else
  for g in "${WANT_GROUPS[@]:-}"; do
    [[ -z "$g" ]] && continue
    [[ -d "$ROOT/skills/$g" ]] || die "no such group: $g (try --list)"
    SELECTED_GROUPS+=("$g")
    while read -r s; do [[ -n "$s" ]] && SELECTED_SKILLS+=("$s"); done < <(skills_in_group "$g")
  done
  for s in "${SKILLS[@]:-}"; do
    [[ -z "$s" ]] && continue
    group_of_skill "$s" >/dev/null || die "no such skill: $s (try --list)"
    SELECTED_SKILLS+=("$s")
  done
  # A group selection is not usable without core; a lone --skill is left alone.
  if [[ $WITH_CORE -eq 1 && ${#WANT_GROUPS[@]} -gt 0 ]]; then
    SELECTED_GROUPS+=("$SHARED")
    while read -r s; do [[ -n "$s" ]] && SELECTED_SKILLS+=("$s"); done < <(skills_in_group "$SHARED")
  fi
fi

# Resolve declared skill requirements as a small dependency graph. The index
# advances through newly appended requirements, while contains() prevents a
# cycle from growing the array forever. Requirements bring their own complete
# skill directory but not their whole group or group doctrine.
dependency_index=0
while [[ $dependency_index -lt ${#SELECTED_SKILLS[@]} ]]; do
  selected="${SELECTED_SKILLS[$dependency_index]}"
  while IFS= read -r required; do
    [[ -z "$required" ]] && continue
    group_of_skill "$required" >/dev/null || die "$selected requires missing skill: $required"
    contains "$required" "${SELECTED_SKILLS[@]}" || SELECTED_SKILLS+=("$required")
  done < <(requirements_of_skill "$selected")
  dependency_index=$((dependency_index + 1))
done

dedupe() { printf '%s\n' "$@" | awk 'NF && !seen[$0]++'; }

# Read lines from stdin into _DEDUPED. `mapfile` would say this in one line, but
# it is a bash 4 builtin and macOS ships bash 3.2, where the script died at this
# point. Redirecting into the function rather than piping into it keeps the loop
# in the current shell, so the array outlives it. `IFS= read -r` leaves each line
# exactly as it came, including any spaces in a directory name.
read_deduped() {
  _DEDUPED=()
  local line
  while IFS= read -r line; do
    _DEDUPED+=("$line")
  done
}

# Assign with the `${arr[@]+...}` guard: on an empty result this expands to
# nothing, giving an empty array rather than an array holding one empty string.
# The difference is visible in the count this script prints at the end, and
# under `set -u` bash 3.2 refuses the unguarded form outright.
read_deduped < <(dedupe "${SELECTED_GROUPS[@]:-}")
SELECTED_GROUPS=(${_DEDUPED[@]+"${_DEDUPED[@]}"})
read_deduped < <(dedupe "${SELECTED_SKILLS[@]:-}")
SELECTED_SKILLS=(${_DEDUPED[@]+"${_DEDUPED[@]}"})

link() { # src dst
  if [[ $DRY_RUN -eq 1 ]]; then echo "would link $2 -> $1"; else ln -sfn "$1" "$2"; fi
}

link_bucket() {
  local target="$1"
  [[ $DRY_RUN -eq 1 ]] || mkdir -p "$target"
  for s in "${SELECTED_SKILLS[@]:-}"; do
    [[ -z "$s" ]] && continue
    local g; g="$(group_of_skill "$s")"
    link "$ROOT/skills/$g/$s" "$target/$PREFIX-$s"
  done
  # Group doctrine: GATES.md, DDDD.md, VERIFICATION.md and their siblings live
  # at the group's top level, so a skill that cites one needs the group linked.
  for g in "${SELECTED_GROUPS[@]:-}"; do
    [[ -z "$g" ]] && continue
    link "$ROOT/skills/$g" "$target/$PREFIX-$g-doctrine"
  done
}

if [[ -n "$TARGET" ]]; then
  link_bucket "$TARGET"
else
  for bucket in "${HOME}/.agents/skills" "${HOME}/.claude/skills" "${HOME}/.cursor/skills" "${HOME}/.copilot/skills"; do
    link_bucket "$bucket"
  done
fi

echo "Linked ${#SELECTED_SKILLS[@]} skill(s) and ${#SELECTED_GROUPS[@]} group doctrine set(s)"
