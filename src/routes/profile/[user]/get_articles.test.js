import { describe, expect, it, vi } from 'vitest';
import { get_articles } from './get_articles.js';
import * as api from '$lib/api.js';
import { page_size } from '$lib/constants.js';

vi.mock('$lib/api.js', () => ({ get: vi.fn() }));

function event(page, user = 'jane') {
	return {
		url: new URL(`http://localhost/profile/${user}${page ? `?page=${page}` : ''}`),
		params: { user },
		locals: { user: { token: 'secret' } }
	};
}

describe('get_articles', () => {
	it('requests the first page of the author feed', async () => {
		api.get.mockResolvedValue({ articles: [], articlesCount: 0 });

		await get_articles(event(null), 'author');

		const [path, token] = api.get.mock.calls.at(-1);
		const q = new URLSearchParams(path.split('?')[1]);
		expect(path).toMatch(/^articles\?/);
		expect(q.get('author')).toBe('jane');
		expect(q.get('limit')).toBe(String(page_size));
		expect(q.get('offset')).toBe('0');
		expect(token).toBe('secret');
	});

	it('offsets by whole pages', async () => {
		api.get.mockResolvedValue({ articles: [], articlesCount: 0 });

		await get_articles(event(3), 'favorited');

		const [path] = api.get.mock.calls.at(-1);
		const q = new URLSearchParams(path.split('?')[1]);
		expect(q.get('favorited')).toBe('jane');
		expect(q.get('offset')).toBe(String(2 * page_size));
	});

	it('rounds the page count up', async () => {
		api.get.mockResolvedValue({ articles: [], articlesCount: page_size + 1 });

		const { pages } = await get_articles(event(null), 'author');

		expect(pages).toBe(2);
	});
});
