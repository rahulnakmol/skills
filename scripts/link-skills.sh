#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
link_bucket() {
  local target="$1"
  mkdir -p "$target"
  for skill in "$ROOT"/skills/*/*; do
    [[ -f "$skill/SKILL.md" ]] || continue
    name="$(basename "$skill")"
    ln -sfn "$skill" "$target/rahulnakmol-$name"
  done
  for skill in "$ROOT"/skills/*/*/*; do
    [[ -f "$skill/SKILL.md" ]] || continue
    name="$(basename "$skill")"
    ln -sfn "$skill" "$target/rahulnakmol-$name"
  done
}
TARGET="${1:-}"
if [[ -n "$TARGET" ]]; then
  link_bucket "$TARGET"
else
  link_bucket "${HOME}/.agents/skills"
  link_bucket "${HOME}/.claude/skills"
  link_bucket "${HOME}/.cursor/skills"
  link_bucket "${HOME}/.copilot/skills"
fi
echo "Linked promoted skills"
