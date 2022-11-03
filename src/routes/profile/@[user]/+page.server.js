import * as api from '$lib/api.js';
import { get_articles } from './get_articles';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const { articles, page } = await get_articles(event, 'author');
	return { articles, page };
}

/** @type {import('./$types').Actions} */
export const actions = {
	toggleFollow: async ({ locals, params, request }) => {
		if (!locals.user) throw error(401);

		const data = await request.formData();
		const following = data.get('following') !== 'on';

		if (following) {
			await api.post(`profiles/${params.user}/follow`, null, locals.user.token);
		} else {
			await api.del(`profiles/${params.user}/follow`, locals.user.token);
		}
	}
};
