# ![RealWorld Example App](logo.png)

> ### [Svelte](https://github.com/sveltejs/svelte) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/realworld-apps/realworld) spec and API.

### [Demo](https://realworld.svelte.dev)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/realworld-apps/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with SvelteKit including CRUD operations, authentication, routing, pagination, and more.

Unlike SPA implementations, this app is **server-rendered**: data loading and mutations
run on the server through SvelteKit load functions and form actions, and the session JWT
is stored in an httpOnly cookie — the app works with JavaScript disabled.

For more information on how this works with other frontends/backends, head over to the [RealWorld](https://github.com/realworld-apps/realworld) repo.

## Running locally

Requires Node 22+ and [pnpm](https://pnpm.io).

```sh
pnpm install
pnpm run dev
```

To build and start in prod mode:

```sh
pnpm run build
pnpm run preview
```

## Testing

The [RealWorld spec](https://github.com/realworld-apps/realworld) is vendored in
[`realworld-e2e-tests/`](realworld-e2e-tests/VENDORED.md) (no git submodule) and
provides the shared e2e suite. The upstream Conduit theme is vendored as
`static/conduit-theme.css` (the only copy in the repo).

```sh
pnpm run test                       # unit tests (Vitest)
pnpm run test:e2e                   # e2e tests (Playwright, shared RealWorld suite)
pnpm run test:e2e:ui                # e2e tests with the Playwright UI
pnpm run spec:check                 # verify vendored files match the pinned upstream commit
pnpm run spec:update                # re-vendor the spec from upstream
```

The e2e suite runs in `ssr` mode (`TEST_MODE=ssr`) because the app renders on the
server against the external RealWorld API — specs that require browser-side API
interception skip themselves, while cross-user scenarios use the demo backend's
seeded users; see [`realworld-e2e-tests/DISABLED_TESTS.md`](realworld-e2e-tests/DISABLED_TESTS.md).

## Formatting

```sh
pnpm run format   # write
pnpm run lint     # check
```
