import { describe, expect, it, vi } from 'vitest';
import * as api from '$lib/api.js';
import { load } from './+page.server.js';

vi.mock('$lib/api.js', () => ({ get: vi.fn(), post: vi.fn() }));

function event(user) {
	return {
		cookies: { delete: vi.fn() },
		locals: { user }
	};
}

describe('login load', () => {
	it('shows the form to logged-out visitors', async () => {
		const e = event(null);

		expect(await load(e)).toBe(undefined);
		expect(api.get).not.toHaveBeenCalled();
	});

	it('bounces a live session to the home page', async () => {
		api.get.mockResolvedValue({ user: { username: 'jane' } });

		await expect(load(event({ token: 'live' }))).rejects.toMatchObject({
			status: 307,
			location: '/'
		});
	});

	it('clears the cookie and shows the form for a dead session', async () => {
		api.get.mockRejectedValue(Object.assign(new Error('redirect'), { status: 303 }));
		const e = event({ token: 'expired' });

		expect(await load(e)).toBe(undefined);
		expect(e.cookies.delete).toHaveBeenCalledWith('jwt', { path: '/' });
		expect(e.locals.user).toBe(null);
	});
});
