#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DRY_RUN=false
TOOL="all"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) DRY_RUN=true; shift ;;
    --tool) TOOL="$2"; shift 2 ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done
run() { if $DRY_RUN; then echo "[dry-run] $*"; else eval "$@"; fi }
install_opencode() {
  DEST="${OPENCODE_CONFIG:-$HOME/.config/opencode}"
  run mkdir -p "$DEST/agents" "$DEST/commands" "$DEST/workflows/templates"
  run cp -R "$ROOT/adapters/opencode/agents/." "$DEST/agents/"
  for f in "$ROOT/adapters/opencode/commands/"*.md; do
    base=$(basename "$f")
    case "$base" in caveman*) continue ;; esac
    run cp "$f" "$DEST/commands/"
  done
  run cp "$ROOT/tools/opencode-workflows/runner.mjs" "$ROOT/tools/opencode-workflows/test-runner.mjs" "$ROOT/tools/opencode-workflows/README.md" "$DEST/workflows/"
  run cp -R "$ROOT/tools/opencode-workflows/templates/." "$DEST/workflows/templates/"
  if [[ -f "$ROOT/skills/developer/sdlc/METHOD.md" ]]; then
    run cp "$ROOT/skills/developer/sdlc/METHOD.md" "$DEST/SDLC_METHOD.md"
    run cp "$ROOT/skills/developer/sdlc/LOOP-CONTRACT.md" "$DEST/SDLC_LOOP.md"
  fi
}
install_claude() {
  DEST="${CLAUDE_CONFIG:-$HOME/.claude}/agents"
  run mkdir -p "$DEST"
  run cp -R "$ROOT/adapters/claude/agents/." "$DEST/"
}
case "$TOOL" in
  all) install_opencode; install_claude ;;
  opencode) install_opencode ;;
  claude) install_claude ;;
  codex|cursor|copilot) echo "See adapters/$TOOL/README.md for host-specific steps" ;;
  *) echo "Unknown tool: $TOOL"; exit 1 ;;
esac
echo "Done (tool=$TOOL dry_run=$DRY_RUN)"
