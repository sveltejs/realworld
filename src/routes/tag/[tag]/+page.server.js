import * as api from '$lib/api.js';
import { page_size } from '$lib/constants.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params, url }) {
	const page = +(url.searchParams.get('page') ?? '1');

	const q = new URLSearchParams();

	q.set('limit', page_size);
	q.set('offset', (page - 1) * page_size);
	q.set('tag', params.tag);

	const [{ articles, articlesCount }, { tags }] = await Promise.all([
		api.get(`articles?${q}`, locals.user?.token),
		api.get('tags', locals.user?.token)
	]);

	return {
		articles,
		pages: Math.ceil(articlesCount / page_size),
		tags
	};
}
