import { describe, expect, it, vi } from 'vitest';
import * as api from '$lib/api.js';
import { load as load_articles } from './+page.server.js';
import { load as load_favorites } from './favorites/+page.server.js';

// Finding 3: get_articles returns { articles, pages } but both profile loads
// destructure { articles, page } — so the page count never reaches the page
// and articles beyond the first 10 are unreachable.

vi.mock('$lib/api.js', () => ({ get: vi.fn() }));

function event() {
	return {
		url: new URL('http://localhost/profile/jane'),
		params: { user: 'jane' },
		locals: { user: { token: 'secret' } }
	};
}

describe('profile loads', () => {
	it('exposes the page count for the articles tab', async () => {
		api.get.mockResolvedValue({ articles: [], articlesCount: 25 });

		const result = await load_articles(event());

		expect(result.pages).toBe(3);
	});

	it('exposes the page count for the favorites tab', async () => {
		api.get.mockResolvedValue({ articles: [], articlesCount: 25 });

		const result = await load_favorites(event());

		expect(result.pages).toBe(3);
	});
});
