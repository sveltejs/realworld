import { json } from '@sveltejs/kit';
import * as api from '$lib/api';
import { page_size } from '$lib/constants';

export async function GET({ url: { searchParams }, locals }) {
	const tab = searchParams.get('tab') || 'all';
	const tag = searchParams.get('tag');
	const page = +searchParams.get('page') || 1;

	const endpoint = tab === 'feed' ? 'articles/feed' : 'articles';

	const q = new URLSearchParams();

	q.set('limit', page_size);
	q.set('offset', (page - 1) * page_size);

	if (tag) {
		q.set('tag', tag);
	}

	const { articles, articlesCount } = await api.get(
		`${endpoint}?${q}`,
		locals.user && locals.user.token
	);

	return json({
		articles,
		pages: Math.ceil(articlesCount / page_size)
	});
}
