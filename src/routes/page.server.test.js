import { afterEach, describe, expect, it, vi } from 'vitest';
import { load } from './+page.server.js';

// A load must never resolve with undefined data when the API rejects the
// request: a dead session (401 on a token we sent) redirects to /login, and
// any other API failure becomes an error page with that status.

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('home load with a rejected token', () => {
	it('redirects a dead session to /login, not undefined data', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(
				async () =>
					new Response(JSON.stringify({ errors: { token: ['is invalid'] } }), { status: 401 })
			)
		);

		const event = {
			locals: { user: { token: 'revoked-token' } },
			url: new URL('http://localhost/')
		};

		await expect(load(event)).rejects.toMatchObject({ status: 303, location: '/login' });
	});
});
