import { defineConfig } from '@playwright/test';
import { baseConfig } from './realworld-e2e-tests/specs/e2e/playwright.base';

/**
 * SvelteKit-specific Playwright configuration.
 * Extends the shared RealWorld base config with the SvelteKit dev server.
 *
 * This app renders on the server (form actions, httpOnly cookie auth) against
 * the external RealWorld API, so the suite runs in `ssr` mode: specs that
 * assume a SPA making browser-side API calls skip themselves, while cross-user
 * scenarios use the demo backend's seeded users. See realworld-e2e-tests/DISABLED_TESTS.md.
 */
process.env.TEST_MODE ??= 'ssr';

export default defineConfig({
	...baseConfig,
	testDir: './realworld-e2e-tests/specs/e2e',

	use: {
		...baseConfig.use,
		baseURL: 'http://localhost:5173'
	},

	webServer: {
		command: 'pnpm run dev',
		url: 'http://localhost:5173',
		reuseExistingServer: !process.env.CI,
		timeout: 120_000
	}
});
