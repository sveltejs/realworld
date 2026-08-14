# Vendored RealWorld spec

This directory is a vendored copy of parts of the
[realworld-apps/realworld](https://github.com/realworld-apps/realworld) repository
(the RealWorld spec), instead of a git submodule.

- Upstream repository: https://github.com/realworld-apps/realworld
- Upstream commit: `5d510ce6ec41bb97723e92fbd8d3e3458a381c09`
- Vendored content: `specs/e2e/` (the shared Playwright e2e suite) and the upstream
  `LICENSE`. The upstream API test suites are deliberately not vendored — they test
  backends, which this repo is not. The upstream Conduit theme
  (`assets/theme/styles.css`) is vendored as `static/conduit-theme.css`, where the
  app serves it directly — that file is the only copy in this repo.
- Local (not upstream) files in this directory: this `VENDORED.md` and
  `DISABLED_TESTS.md`, which documents why some suite specs skip themselves in
  this app's `ssr` mode.

## Rules

- **Do not edit files in this directory (or `static/conduit-theme.css`) by hand.**
  They are kept byte-identical to upstream so updates stay a clean overwrite — any
  hand edit is silently lost on the next update. Adaptations live outside
  (`playwright.config.ts`, `scripts/`, `package.json`).

## Checking and updating

```sh
pnpm run spec:check             # verify all vendored files (incl. the theme CSS)
                                # match the pinned commit, and note if upstream
                                # main has moved on (--strict makes that fatal)
pnpm run spec:update            # re-vendor from upstream main
pnpm run spec:update <ref>      # re-vendor from a specific branch/tag/commit
```

The script records the new upstream commit in this file.
