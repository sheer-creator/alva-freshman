#!/usr/bin/env bash
# update-skills-ref.sh - sync alva-ai/skills main into .skills-ref/
set -euo pipefail
set +H
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REF_DIR="$REPO_DIR/.skills-ref/alva-skills"
if [ ! -d "$REF_DIR/.git" ]; then
  mkdir -p "$REPO_DIR/.skills-ref"
  git clone --depth 1 https://github.com/alva-ai/skills "$REF_DIR"
else
  cd "$REF_DIR"
  git fetch --depth 1 origin main
  git reset --hard origin/main
fi
echo "done. coding ref at: $REF_DIR/skills/alva/references/"
ls "$REF_DIR/skills/alva/references/" 2>/dev/null | sed 's/^/  - /'
