# SvelteKit RealWorld Example App

Server-rendered [RealWorld](https://github.com/gothinkster/realworld) implementation
(Conduit) built with SvelteKit: data loads and mutations run on the server via load
functions and form actions, and the JWT lives in an httpOnly cookie.

## Commands

```bash
pnpm install            # Install deps
pnpm run dev            # Dev server at localhost:5173
pnpm run test           # Unit tests (Vitest)
pnpm run test:e2e       # E2E tests (Playwright, shared RealWorld suite)
pnpm run spec:check     # Verify vendored files match the pinned upstream commit
pnpm run spec:update    # Re-vendor the RealWorld spec from upstream
pnpm run format         # Format code with Prettier
pnpm run lint           # Check formatting without writing
```

## Vendored spec

`realworld-e2e-tests/` is a vendored copy of the RealWorld spec's shared e2e suite —
see `realworld-e2e-tests/VENDORED.md`. The upstream Conduit theme is vendored as
`static/conduit-theme.css` (only copy in the repo). Never edit vendored files by
hand; adaptations live in `playwright.config.ts`, `scripts/`, and `package.json`.

## E2E notes

- The suite runs in `ssr` mode (`TEST_MODE=ssr`, set in `playwright.config.ts`)
  because the app is server-rendered. Specs that need browser-side API calls skip
  themselves — see `realworld-e2e-tests/DISABLED_TESTS.md`.
- The app exposes `window.__conduit_debug__` for the suite (dev server only),
  implemented in `src/routes/+layout.svelte`.

## Code style

- Run `pnpm run format` before presenting code to the user.
