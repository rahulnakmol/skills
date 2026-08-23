#!/usr/bin/env bash
# Dual-engine launcher for the delivery pipeline: assess -> deliver -> shakedown.
# Drives the same stages through Claude Code dynamic workflows or the OpenCode
# workflow runner, headless by default, interactively on request.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

usage() {
  cat <<'EOF'
Usage: pipeline.sh <stage> <ref> [options]

Stages:
  assess     Critique a raised work item (pickup protocol; posts questions, stops)
  deliver    Implement a ready work item and raise one PR or a gh-stack of PRs
  shakedown  Build, test, execute, and review a PR in an isolated sandbox

Arguments:
  <ref>      Work item number (assess/deliver) or PR number (shakedown)

Options:
  --engine claude|opencode   Execution engine (default: claude)
  --interactive              Open an interactive session instead of running headless
  --tracker github|linear    Tracker for assess/deliver (default: github)
  --repo owner/name          Repository, when not the current one
  --base <branch>            Stack base for deliver (default: dev)
  --dir <path>               Working directory for the opencode engine (default: cwd)
  --post                     opencode engine only: post the terminal summary to GitHub
  --dry-run                  Print the command that would run, then exit

The claude engine runs the plugin's dynamic workflows
(/rahulnakmol-skills:assess-work-item, deliver-work-item, shakedown-pr), which
write to the tracker themselves. The opencode engine runs the parity templates
read-only-first; deliver and shakedown need --apply semantics and are invoked
with them here, and posting is a separate, explicit --post step.
EOF
  exit "${1:-0}"
}

STAGE="${1:-}"; REF="${2:-}"
[ -z "$STAGE" ] || [ -z "$REF" ] && usage 1
case "$STAGE" in assess|deliver|shakedown) ;; *) echo "Unknown stage: $STAGE" >&2; usage 1 ;; esac
shift 2

ENGINE="claude"; INTERACTIVE=0; TRACKER="github"; REPO=""; BASE="dev"; DIR="$PWD"; POST=0; DRY=0
while [ $# -gt 0 ]; do
  case "$1" in
    --engine) ENGINE="$2"; shift 2 ;;
    --interactive) INTERACTIVE=1; shift ;;
    --tracker) TRACKER="$2"; shift 2 ;;
    --repo) REPO="$2"; shift 2 ;;
    --base) BASE="$2"; shift 2 ;;
    --dir) DIR="$2"; shift 2 ;;
    --post) POST=1; shift ;;
    --dry-run) DRY=1; shift ;;
    -h|--help) usage 0 ;;
    *) echo "Unknown option: $1" >&2; usage 1 ;;
  esac
done

run() {
  if [ "$DRY" = 1 ]; then printf 'DRY RUN:'; printf ' %q' "$@"; printf '\n'; else "$@"; fi
}

if [ "$ENGINE" = "claude" ]; then
  if [ "$DRY" = 0 ] && ! command -v claude >/dev/null 2>&1; then
    echo "claude CLI not found on PATH." >&2; exit 1
  fi
  ARGS_JSON=""
  case "$STAGE" in
    assess)    ARGS_JSON="{\"item\": $REF, \"tracker\": \"$TRACKER\"${REPO:+, \"repo\": \"$REPO\"}}"
               WF="assess-work-item" ;;
    deliver)   ARGS_JSON="{\"item\": $REF, \"tracker\": \"$TRACKER\", \"base\": \"$BASE\"${REPO:+, \"repo\": \"$REPO\"}}"
               WF="deliver-work-item" ;;
    shakedown) ARGS_JSON="{\"pr\": $REF${REPO:+, \"repo\": \"$REPO\"}}"
               WF="shakedown-pr" ;;
  esac
  PROMPT="Run the /rahulnakmol-skills:$WF workflow with args $ARGS_JSON"
  if [ "$INTERACTIVE" = 1 ]; then
    run claude "$PROMPT"
  else
    run claude -p "$PROMPT"
  fi
  exit $?
fi

if [ "$ENGINE" = "opencode" ]; then
  RUNNER="$REPO_ROOT/tools/opencode-workflows/runner.mjs"
  if [ "$INTERACTIVE" = 1 ]; then
    echo "The opencode engine runs through the deterministic template runner; for an"
    echo "interactive session, start \`opencode\` yourself and ask for the same stage,"
    echo "or use --engine claude --interactive. Continuing headless."
  fi
  case "$STAGE" in
    assess)
      run node "$RUNNER" assess "item=$REF tracker=$TRACKER${REPO:+ repo=$REPO}" --dir "$DIR" ;;
    deliver)
      # deliver's implement task mutates the workspace: --apply plus a check command
      # are required by the runner's own safety contract.
      run node "$RUNNER" deliver "Deliver ready work item $REF per its contract; layer commits for a reviewable stack per skills/developer/deliver/STACKING.md" \
        --dir "$DIR" --apply --check-json '["node","--version"]' ;;
    shakedown)
      run node "$RUNNER" shakedown "pr=$REF${REPO:+ repo=$REPO}" --dir "$DIR" --apply ;;
  esac
  STATUS=$?
  if [ "$POST" = 1 ] && [ "$DRY" = 0 ] && [ "$TRACKER" = "github" ]; then
    echo "Posting the terminal summary requires the run's snapshot; use the printed"
    echo "state path with: node -e '...' | gh issue comment $REF --body-file -"
    echo "(Automatic posting is the claude engine's job; the opencode engine keeps"
    echo "side effects explicit.)"
  fi
  exit $STATUS
fi

echo "Unknown engine: $ENGINE (expected claude or opencode)" >&2
exit 1
