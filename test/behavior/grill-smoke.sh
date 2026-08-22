#!/usr/bin/env bash
set -euo pipefail

if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
  echo "SKIP: ANTHROPIC_API_KEY not set — grill-smoke needs a live model."
  exit 0
fi
if ! command -v claude >/dev/null 2>&1; then
  echo "SKIP: claude CLI not found on PATH — grill-smoke needs it."
  exit 0
fi

PROMPT=$(cat <<'EOF'
Apply the skills/developer/impact skill in this repo. Below is a raw internal
meeting transcript. Produce the fast-cut PRD intake draft, then run exactly
ONE grill round against it (per GRILL.md), and stop after that one round.

--- transcript ---
Attendees: Priya (ops lead), Dave (support lead).
Priya: our support agents keep re-typing the same refund policy answer into
every ticket, it's slow and inconsistent.
Dave: yeah, we've talked about a canned-response tool for like a year but
never built it. Maybe some kind of internal helper that drafts the reply.
Priya: could be nice if it also flagged tickets that look like they need a
manager, not sure how much work that is though.
EOF
)

OUTPUT=$(claude -p "$PROMPT" 2>&1)
echo "$OUTPUT"

echo "--- assertions ---"
echo "$OUTPUT" | grep -qi "PRD" || { echo "FAIL: no PRD draft in output"; exit 1; }
Q_COUNT=$(echo "$OUTPUT" | grep -o '?' | wc -l | tr -d ' ')
[ "$Q_COUNT" -ge 3 ] || { echo "FAIL: expected >=3 '?' (grill questions), found $Q_COUNT"; exit 1; }
echo "$OUTPUT" | grep -qi "Trade-offs" || { echo "FAIL: no Trade-offs ledger touched"; exit 1; }
echo "PASS: grill-smoke"
