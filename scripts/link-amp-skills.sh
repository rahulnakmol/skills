#!/usr/bin/env bash
# Link every skill in this checkout, plus the Amp-only skills under
# adapters/amp/skills, into .agents/skills so Amp finds them as project skills
# when it works inside this repository. Amp follows symlinks when it discovers
# skills, so nothing is copied; the checkout stays the one home of each skill.
#
# .agents/setup runs this once for a fresh orb and .agents/resume runs it on
# every wake. It is safe to run repeatedly: link-skills.sh replaces stale links
# and this script removes Amp-only links whose source has gone.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="${1:-$ROOT/.agents/skills}"
AMP_SKILLS="$ROOT/adapters/amp/skills"

mkdir -p "$TARGET"
"$ROOT/scripts/link-skills.sh" --target "$TARGET" >/dev/null

# Amp-only skills keep their own names; nothing else in the repository uses them.
for dir in "$AMP_SKILLS"/*/; do
  name="$(basename "$dir")"
  [[ -f "$dir/SKILL.md" ]] || continue
  ln -sfn "${dir%/}" "$TARGET/$name"
done
for link in "$TARGET"/*; do
  [[ -L "$link" ]] || continue
  [[ -e "$link" ]] || rm -f "$link"
done

echo "Linked $(find "$TARGET" -maxdepth 1 -type l | wc -l | tr -d ' ') entries into $TARGET"
