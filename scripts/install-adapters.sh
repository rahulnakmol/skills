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
install_claude_hooks() {
  DEST="${CLAUDE_CONFIG:-$HOME/.claude}/hooks"
  run mkdir -p "$DEST"
  run cp "$ROOT/adapters/claude/hooks/stop-hook.mjs" "$DEST/grit-stop-hook.mjs"
  # The copy above is user-level, so the registration has to be too: --user
  # writes the user settings file and names this copy by absolute path. Without
  # it the default project registration names a relative path that resolves
  # inside whichever project is current, where nothing was installed.
  run node "$ROOT/adapters/claude/hooks/install-hooks.mjs" --user
}
install_codex_hooks() {
  DEST="${CODEX_HOME:-$HOME/.codex}"
  run mkdir -p "$DEST/hooks"
  run cp "$ROOT/adapters/codex/hooks/stop-hook.mjs" "$DEST/hooks/grit-stop-hook.mjs"
  if [[ -e "$DEST/hooks.json" ]]; then
    echo "$DEST/hooks.json already exists; leaving it untouched."
    echo "Merge the Stop entry from adapters/codex/hooks/hooks.json by hand — see adapters/codex/README.md."
  else
    run cp "$ROOT/adapters/codex/hooks/hooks.json" "$DEST/hooks.json"
  fi
}
case "$TOOL" in
  all) install_opencode; install_claude ;;
  opencode) install_opencode ;;
  claude) install_claude ;;
  claude-hooks) install_claude_hooks ;;
  codex-hooks) install_codex_hooks ;;
  codex|cursor|copilot) echo "See adapters/$TOOL/README.md for host-specific steps" ;;
  *) echo "Unknown tool: $TOOL (valid: all, opencode, claude, claude-hooks, codex, codex-hooks, cursor, copilot)"; exit 1 ;;
esac
echo "Done (tool=$TOOL dry_run=$DRY_RUN)"
