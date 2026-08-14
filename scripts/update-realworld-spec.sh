#!/usr/bin/env bash
# Re-vendors the RealWorld spec (specs/ + LICENSE) from realworld-apps/realworld.
# Usage: scripts/update-realworld-spec.sh [ref]   (default: main)
set -euo pipefail

REPO="https://github.com/realworld-apps/realworld"
REF="${1:-main}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/realworld-e2e-tests"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

git clone --depth 1 --branch "$REF" "$REPO" "$tmp/realworld" 2>/dev/null \
	|| (git clone "$REPO" "$tmp/realworld" && git -C "$tmp/realworld" checkout "$REF")
commit="$(git -C "$tmp/realworld" rev-parse HEAD)"

# only the e2e suite — the API suites test backends, which this repo is not
rm -rf "$DEST/specs"
mkdir -p "$DEST/specs"
cp -r "$tmp/realworld/specs/e2e" "$DEST/specs/e2e"
cp "$tmp/realworld/LICENSE" "$DEST/LICENSE"

# the app serves the upstream Conduit theme as a static asset — this copy is the
# only one in the repo and is overwritten on every update; never edit it by hand
cp "$tmp/realworld/assets/theme/styles.css" "$ROOT/static/conduit-theme.css"

sed -i.bak "s/^- Upstream commit: .*/- Upstream commit: \`$commit\`/" "$DEST/VENDORED.md"
rm -f "$DEST/VENDORED.md.bak"

echo "Vendored $REPO@$commit into realworld-e2e-tests/ (+ static/conduit-theme.css)"
