import { redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';
import { page_size } from '$lib/constants.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
	// legacy URLs
	const legacy_tag = url.searchParams.get('tag');
	if (legacy_tag) redirect(301, `/tag/${legacy_tag}`);
	if (url.searchParams.get('tab') === 'feed') redirect(301, '/?feed=following');

	const feed = url.searchParams.get('feed');
	if (feed === 'following' && !locals.user) redirect(307, '/login');

	const page = +(url.searchParams.get('page') ?? '1');

	const endpoint = feed === 'following' ? 'articles/feed' : 'articles';

	const q = new URLSearchParams();

	q.set('limit', page_size);
	q.set('offset', (page - 1) * page_size);

	const [{ articles, articlesCount }, { tags }] = await Promise.all([
		api.get(`${endpoint}?${q}`, locals.user?.token),
		api.get('tags', locals.user?.token)
	]);

	return {
		articles,
		pages: Math.ceil(articlesCount / page_size),
		tags
	};
}
