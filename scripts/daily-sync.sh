#!/usr/bin/env bash
# daily-sync.sh - sync origin/main into local branch; abort on conflict.
# Probes the merge in a throwaway worktree so main working tree is never touched.
set -euo pipefail
set +H

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_DIR"

LOG_DIR="$REPO_DIR/.sync-log"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/sync-$(date +%Y%m%d-%H%M%S).log"
CONFLICTS_MD="$REPO_DIR/CONFLICTS.md"

exec > >(tee -a "$LOG_FILE") 2>&1

echo "=== daily-sync @ $(date '+%Y-%m-%d %H:%M:%S %Z') ==="
echo "repo: $REPO_DIR"

if [ ! -d "$REPO_DIR/.git" ]; then
  echo "ERROR: $REPO_DIR is not a git repo. abort."
  exit 2
fi

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
echo "current branch: $CURRENT_BRANCH"
if [ "$CURRENT_BRANCH" != "local" ]; then
  echo "WARN: not on local branch (currently $CURRENT_BRANCH), switching"
  git checkout local
fi

STASHED=0
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "working tree has uncommitted changes, stashing first"
  git stash push -u -m "daily-sync auto-stash $(date -u +%Y%m%dT%H%M%SZ)"
  STASHED=1
fi

restore_stash() {
  if [ "$STASHED" = 1 ]; then
    echo "restoring stash"
    git stash pop || echo "WARN: stash pop failed, stash kept. use 'git stash list'"
  fi
}
trap restore_stash EXIT

echo "fetch origin main ..."
git fetch origin main --prune

LOCAL_SHA="$(git rev-parse local)"
MAIN_SHA="$(git rev-parse origin/main)"
BASE_SHA="$(git merge-base local origin/main)"

echo "local sha   : $LOCAL_SHA"
echo "origin/main : $MAIN_SHA"
echo "merge base  : $BASE_SHA"

if [ "$MAIN_SHA" = "$BASE_SHA" ]; then
  echo "origin/main has no new commits. done."
  rm -f "$CONFLICTS_MD" 2>/dev/null || true
  exit 0
fi

PROBE_DIR="$(mktemp -d /tmp/daily-sync-probe.XXXXXX)"
rm -rf "$PROBE_DIR"
PROBE_BRANCH="daily-sync-probe-$(date +%s)-$$"

cleanup_probe() {
  if git worktree list --porcelain | grep -q "^worktree $PROBE_DIR$"; then
    git worktree remove --force "$PROBE_DIR" 2>/dev/null || true
  fi
  git branch -D "$PROBE_BRANCH" 2>/dev/null || true
  rm -rf "$PROBE_DIR" 2>/dev/null || true
}
trap 'cleanup_probe; restore_stash' EXIT

echo "creating probe worktree: $PROBE_DIR"
git worktree add -b "$PROBE_BRANCH" "$PROBE_DIR" local --quiet

set +e
PROBE_OUT="$(cd "$PROBE_DIR" && git -c user.email=probe@local -c user.name=probe merge --no-edit --no-ff origin/main 2>&1)"
PROBE_EXIT=$?
set -e

CONFLICT_FILES=""
if [ "$PROBE_EXIT" != 0 ]; then
  CONFLICT_FILES="$(cd "$PROBE_DIR" && git diff --name-only --diff-filter=U)"
fi

if [ "$PROBE_EXIT" -eq 0 ]; then
  echo "no conflicts, performing real merge"
  git merge --no-edit --no-ff origin/main
  echo "merge done. HEAD = $(git rev-parse HEAD)"
  rm -f "$CONFLICTS_MD" 2>/dev/null || true
  echo "=== done (clean merge) ==="
  exit 0
fi

{
  echo "# Merge Conflicts -- $(date '+%Y-%m-%d %H:%M:%S %Z')"
  echo
  echo "> origin/main conflicts with local on the files below. The merge was ABORTED; working tree is clean."
  echo
  echo "- local HEAD : \`$(git rev-parse --short local)\` -- $(git log -1 --format='%s' local)"
  echo "- origin/main: \`$(git rev-parse --short origin/main)\` -- $(git log -1 --format='%s' origin/main)"
  echo "- merge base : \`$(git rev-parse --short "$BASE_SHA")\`"
  echo
  echo "## Conflicted files"
  echo
  if [ -z "$CONFLICT_FILES" ]; then
    echo "_could not list files from probe; run 'git merge origin/main' manually_"
  else
    echo '```'
    echo "$CONFLICT_FILES"
    echo '```'
  fi
  echo
  echo "## Suggested resolution"
  echo
  echo '```bash'
  echo "cd $REPO_DIR"
  echo "git fetch origin main"
  echo "git merge origin/main              # real merge, see conflict markers"
  echo "# ... resolve in editor ..."
  echo "git add <files> && git commit"
  echo "git push origin local              # if you want to push"
  echo '```'
  echo
  echo "## New commits on origin/main since last sync"
  echo
  echo '```'
  git log --oneline "$BASE_SHA..origin/main" | head -50
  echo '```'
  echo
  echo "## Conflict details (3-way diff per file)"
  echo
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    echo "### \`$f\`"
    echo
    echo '```diff'
    git diff "$BASE_SHA" "origin/main" -- "$f" | head -120 || true
    echo '```'
    echo
  done <<< "$CONFLICT_FILES"
  echo "## Probe output"
  echo
  echo '```'
  echo "$PROBE_OUT" | head -80
  echo '```'
  echo
  echo "---"
  echo "_auto-generated $(date -u +%Y-%m-%dT%H:%M:%SZ) by scripts/daily-sync.sh_"
} > "$CONFLICTS_MD"

echo "conflicts detected, details in $CONFLICTS_MD"
echo "=== done (conflicts detected, no merge performed) ==="
exit 1
