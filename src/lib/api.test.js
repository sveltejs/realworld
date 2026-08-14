import { afterEach, describe, expect, it, vi } from 'vitest';
import * as api from './api.js';

function respond(status, body) {
	return vi.fn(
		async () => new Response(body === undefined ? null : JSON.stringify(body), { status })
	);
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('api client', () => {
	it('parses the response body on success', async () => {
		vi.stubGlobal('fetch', respond(200, { tags: ['one', 'two'] }));

		expect(await api.get('tags')).toEqual({ tags: ['one', 'two'] });
	});

	it('sends the token as an Authorization header', async () => {
		const fetch = respond(200, {});
		vi.stubGlobal('fetch', fetch);

		await api.get('articles/feed', 'secret');

		const [, opts] = fetch.mock.calls[0];
		expect(opts.headers['Authorization']).toBe('Token secret');
	});

	it('sends JSON data with a Content-Type header', async () => {
		const fetch = respond(200, {});
		vi.stubGlobal('fetch', fetch);

		await api.post('articles', { article: { title: 'Hi' } }, 'secret');

		const [, opts] = fetch.mock.calls[0];
		expect(opts.method).toBe('POST');
		expect(opts.headers['Content-Type']).toBe('application/json');
		expect(JSON.parse(opts.body)).toEqual({ article: { title: 'Hi' } });
	});

	it('returns validation errors on 422', async () => {
		vi.stubGlobal('fetch', respond(422, { errors: { email: ['is invalid'] } }));

		expect(await api.post('users', { user: {} })).toEqual({ errors: { email: ['is invalid'] } });
	});

	it('returns error bodies on 401 so form actions can display them', async () => {
		vi.stubGlobal('fetch', respond(401, { errors: { credentials: ['invalid'] } }));

		expect(await api.post('users/login', { user: {} })).toEqual({
			errors: { credentials: ['invalid'] }
		});
	});

	it('redirects to /login when the API rejects a provided token (dead session)', async () => {
		vi.stubGlobal('fetch', respond(401, { errors: { token: ['is expired'] } }));

		await expect(api.get('articles/feed', 'expired')).rejects.toMatchObject({
			status: 303,
			location: '/login'
		});
		await expect(api.post('articles/x/favorite', null, 'expired')).rejects.toMatchObject({
			status: 303,
			location: '/login'
		});
	});

	it('throws for tokenless GET requests even when the body has errors, so loads render error pages', async () => {
		vi.stubGlobal('fetch', respond(401, { errors: { auth: ['required'] } }));

		await expect(api.get('articles/feed')).rejects.toMatchObject({ status: 401 });
	});

	it('throws an HTTP error for other failures', async () => {
		vi.stubGlobal('fetch', respond(404, { message: 'not found' }));

		await expect(api.get('articles/missing')).rejects.toMatchObject({ status: 404 });
	});

	it('returns an empty object for empty bodies', async () => {
		vi.stubGlobal('fetch', respond(200));

		expect(await api.del('articles/slug/favorite', 'secret')).toEqual({});
	});
});
