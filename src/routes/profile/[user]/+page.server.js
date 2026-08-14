import * as api from '$lib/api.js';
import { error, fail } from '@sveltejs/kit';
import { get_articles } from './get_articles';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const { articles, pages } = await get_articles(event, 'author');
	return { articles, pages };
}

/** @type {import('./$types').Actions} */
export const actions = {
	toggleFollow: async ({ locals, params, url }) => {
		if (!locals.user) error(401);

		// the intent lives in the query string (not the body) so the API call
		// still happens when the client navigates away before the body arrives
		const following = url.searchParams.get('follow') !== 'false';

		const result = following
			? await api.post(`profiles/${params.user}/follow`, null, locals.user.token)
			: await api.del(`profiles/${params.user}/follow`, locals.user.token);

		if (result.errors) {
			return fail(422, result);
		}
	}
};
