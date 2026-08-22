#!/usr/bin/env bash
set -euo pipefail

if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
  echo "SKIP: ANTHROPIC_API_KEY not set — pickup-smoke needs a live model."
  exit 0
fi
if ! command -v claude >/dev/null 2>&1; then
  echo "SKIP: claude CLI not found on PATH — pickup-smoke needs it."
  exit 0
fi

PROMPT=$(cat <<'EOF'
Apply the pickup protocol from skills/developer/slice/WORK-ITEM-CONTRACT.md
to the work item below. Do NOT implement anything. Follow the contract:
critique first, post questions, and stop — do not advance past `critiqued`.

--- work item ---
Goal: Add a retry to the payment webhook handler.
Parent links: none
Context: none provided
Scope and file ownership: not specified
EOF
)

OUTPUT=$(claude -p "$PROMPT" 2>&1)
echo "$OUTPUT"

echo "--- assertions ---"
echo "$OUTPUT" | grep -qi "critiqu" || { echo "FAIL: no critique phase in output"; exit 1; }
Q_COUNT=$(echo "$OUTPUT" | grep -o '?' | wc -l | tr -d ' ')
[ "$Q_COUNT" -ge 3 ] || { echo "FAIL: expected >=3 '?' (clarifying questions), found $Q_COUNT"; exit 1; }
echo "$OUTPUT" | grep -q '```diff' && { echo "FAIL: agent implemented before reaching 'ready'"; exit 1; }
echo "PASS: pickup-smoke"
