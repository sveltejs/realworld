import * as api from '$lib/api.js';
import { page_size } from '$lib/constants.js';

export async function get_articles({ url, params, locals }, type) {
	const p = +url.searchParams.get('page') || 1;

	const q = new URLSearchParams();
	q.set('limit', page_size);
	q.set('offset', (p - 1) * page_size);
	q.set(type, params.user);

	const { articles, articlesCount } = await api.get(
		`articles?${q}`,
		locals.user && locals.user.token
	);

	return {
		articles,
		pages: Math.ceil(articlesCount / page_size)
	};
}
