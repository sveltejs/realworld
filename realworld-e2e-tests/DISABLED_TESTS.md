# Disabled / skipped e2e tests

The shared RealWorld e2e suite (vendored in `realworld-e2e-tests/specs/e2e`) supports three
modes, selected with `TEST_MODE` (see `realworld-e2e-tests/specs/e2e/helpers/config.ts`):

| Mode        | `BROWSER_API` | `EXTERNAL_API` | Meant for                                    |
| ----------- | ------------- | -------------- | -------------------------------------------- |
| `spa`       | yes           | yes            | Browser clients of a REST API                |
| `ssr`       | no            | yes            | Server-rendered frontends on an external API |
| `fullstack` | no            | no             | Implementations that own their entire stack  |

This app runs in **`ssr` mode** (set in `playwright.config.ts`): it renders on the
server via load functions and form actions, keeps the JWT in an httpOnly cookie,
and talks to the external RealWorld API from the server only.

Consequences:

- **`BROWSER_API` specs skip themselves** — `error-handling.spec.ts`,
  `user-fetch-errors.spec.ts`, and individual tests in `auth`, `articles`, and
  `comments` specs. They intercept browser API traffic (`page.route()`) or
  inject `localStorage` tokens; in this architecture the browser makes no API
  calls and holds no token, so those failure modes are structurally impossible
  rather than untested. Server-side equivalents (corrupt cookie, upstream error
  bodies) are covered by the Vitest unit tests.
- **Page-behavior assertions still run in every mode.** Specs that bundle API
  checks with UI checks only gate the API part: `settings.spec.ts` asserts the
  browser's `PUT /user` response in SPA mode but always asserts the resulting
  page state, and the XSS suite (`pnpm run test:e2e:security`) authenticates
  through the UI when the browser holds no token, so all sanitization checks
  run here too.
- **`EXTERNAL_API` behavior is active** — cross-user scenarios (follow,
  feeds) use the demo backend's seeded `johndoe` user, since the demo backend
  isolates content created by one browser session from other sessions. Test
  setup also uses the API directly where possible (faster than driving the UI).

With this split, every runnable test passes against the demo backend
(`pnpm run test:e2e`).
