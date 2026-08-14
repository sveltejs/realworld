#!/usr/bin/env bash
# Node/pnpm wrapper around the vendored Bruno collection (the upstream runner
# assumes bun). Runs every folder of the collection against $HOST.
# Usage: HOST=http://localhost:8000 scripts/run-api-tests-bruno.sh [folder...]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$ROOT/realworld-e2e-tests/specs/api"
HOST="${HOST:-http://localhost:8000}"
BRUNO_SANDBOX="${BRUNO_SANDBOX:-safe}"

echo "Running Bruno tests against $HOST"

FOLDERS=("$@")
if [ ${#FOLDERS[@]} -eq 0 ]; then
	for entry in "$DIR"/bruno/*/; do
		name="$(basename "$entry")"
		[ "$name" = "environments" ] && continue
		FOLDERS+=("$name")
	done
fi

cd "$DIR/bruno"

for folder in "${FOLDERS[@]}"; do
	echo ""
	echo "--- @usebruno/cli run $folder ---"
	pnpm dlx @usebruno/cli run "$folder" --env local --env-var "host=$HOST" --sandbox "$BRUNO_SANDBOX"
done
