import * as api from '$lib/api.js';
import { page_size } from '$lib/constants.js';

export async function get_articles({ query, params, locals }, type) {
	const p = +query.get('page') || 1;

	const q = new URLSearchParams([
		['limit', page_size],
		['offset', (p - 1) * page_size],
		[type, encodeURIComponent(params.user)]
	]);

	const { articles, articlesCount } = await api.get(
		`articles?${q}`,
		locals.user && locals.user.token
	);

	return {
		body: {
			articles,
			pages: Math.ceil(articlesCount / page_size)
		}
	};
}
