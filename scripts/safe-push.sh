#!/usr/bin/env bash
# safe-push.sh - sync main into local, then push
# Usage:
#   scripts/safe-push.sh            # push to origin/local (default)
#   scripts/safe-push.sh --to-main  # push to origin/main
set -euo pipefail
set +H

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_DIR"

TARGET="local"
[ "${1:-}" = "--to-main" ] && TARGET="main"

echo "=== safe-push @ $(date '+%Y-%m-%d %H:%M:%S %Z') ==="
echo "target: origin/$TARGET"

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT_BRANCH" != "local" ]; then
  echo "ERROR: must be on local branch (currently $CURRENT_BRANCH)"
  exit 2
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "ERROR: working tree has uncommitted changes, commit first"
  git status --short
  exit 2
fi

echo "syncing main -> local..."
if ! "$REPO_DIR/scripts/daily-sync.sh"; then
  echo
  echo "daily-sync detected conflicts, see CONFLICTS.md. safe-push aborted."
  exit 1
fi

echo
echo "pushing..."
if [ "$TARGET" = "main" ]; then
  git push origin local:main
else
  git push origin local
fi
echo "=== safe-push done ==="
