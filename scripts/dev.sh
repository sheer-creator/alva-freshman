#!/usr/bin/env bash
# dev.sh - start local vite dev server (defaults to http://localhost:5173)
set -euo pipefail
set +H
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_DIR"

if [ ! -d node_modules ]; then
  echo "node_modules not present, running npm install first"
  npm install
fi

PORT="${PORT:-5173}"
HOST="${HOST:-localhost}"
echo "=== vite dev server  http://$HOST:$PORT ==="
echo "Ctrl-C to stop"
exec npm run dev -- --port "$PORT" --host "$HOST"
