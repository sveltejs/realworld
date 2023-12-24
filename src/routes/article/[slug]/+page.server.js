import * as api from '$lib/api.js';
import { error, redirect } from '@sveltejs/kit';
import { marked } from 'marked';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
	const [{ article }, { comments }] = await Promise.all([
		api.get(`articles/${params.slug}`, locals.user?.token),
		api.get(`articles/${params.slug}/comments`, locals.user?.token)
	]);

	article.body = marked(article.body);

	return { article, comments };
}

/** @type {import('./$types').Actions} */
export const actions = {
	createComment: async ({ locals, params, request }) => {
		if (!locals.user) throw error(401);

		const data = await request.formData();

		await api.post(
			`articles/${params.slug}/comments`,
			{
				comment: {
					body: data.get('comment')
				}
			},
			locals.user.token
		);
	},

	deleteComment: async ({ locals, params, url }) => {
		if (!locals.user) throw error(401);

		const id = url.searchParams.get('id');
		const result = await api.del(`articles/${params.slug}/comments/${id}`, locals.user.token);

		if (result.error) throw error(result.status, result.error);
	},

	deleteArticle: async ({ locals, params }) => {
		if (!locals.user) throw error(401);

		await api.del(`articles/${params.slug}`, locals.user.token);
		throw redirect(307, '/');
	},

	toggleFavorite: async ({ locals, params, request }) => {
		if (!locals.user) throw error(401);

		const data = await request.formData();
		const favorited = data.get('favorited') !== 'on';

		if (favorited) {
			api.post(`articles/${params.slug}/favorite`, null, locals.user.token);
		} else {
			api.del(`articles/${params.slug}/favorite`, locals.user.token);
		}

		throw redirect(307, request.headers.get('referer') ?? `/article/${params.slug}`);
	}
};
