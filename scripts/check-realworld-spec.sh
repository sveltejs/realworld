#!/usr/bin/env bash
# Verifies the vendored RealWorld spec:
#   1. integrity — realworld-e2e-tests/ and static/conduit-theme.css are
#      byte-identical to the upstream commit recorded in VENDORED.md (fails on drift)
#   2. freshness — that commit is upstream's current main (note only;
#      fatal with --strict)
# Usage: scripts/check-realworld-spec.sh [--strict]
set -euo pipefail

REPO="https://github.com/realworld-apps/realworld"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/realworld-e2e-tests"
STRICT="${1:-}"

pinned="$(sed -n 's/^- Upstream commit: `\(.*\)`$/\1/p' "$DEST/VENDORED.md")"
if [ -z "$pinned" ]; then
	echo "FAIL: could not read the pinned commit from $DEST/VENDORED.md"
	exit 1
fi

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

git init -q "$tmp/realworld"
git -C "$tmp/realworld" fetch -q --depth 1 "$REPO" "$pinned" 2>/dev/null \
	|| git -C "$tmp/realworld" fetch -q "$REPO" "$pinned"
git -C "$tmp/realworld" checkout -q FETCH_HEAD

fail=0
diff -r "$tmp/realworld/specs/e2e" "$DEST/specs/e2e" || fail=1
diff -u "$tmp/realworld/LICENSE" "$DEST/LICENSE" || fail=1
diff -u "$tmp/realworld/assets/theme/styles.css" "$ROOT/static/conduit-theme.css" || fail=1

if [ "$fail" -ne 0 ]; then
	echo "FAIL: vendored files differ from upstream commit $pinned (see diff above)"
	exit 1
fi
echo "OK: realworld-e2e-tests/ and static/conduit-theme.css match upstream commit $pinned"

latest="$(git ls-remote "$REPO" refs/heads/main | cut -f1)"
if [ "$latest" = "$pinned" ]; then
	echo "OK: pinned commit is upstream main"
else
	echo "NOTE: upstream main has moved to $latest — run 'pnpm run spec:update'"
	if [ "$STRICT" = "--strict" ]; then
		exit 1
	fi
fi
