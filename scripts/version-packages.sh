#!/usr/bin/env bash
set -euo pipefail

npx changeset version
node scripts/sync-plugin-version.mjs
