import * as api from '$lib/api.js';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
	const [{ article }, { comments }] = await Promise.all([
		api.get(`articles/${params.slug}`, locals.user?.token),
		api.get(`articles/${params.slug}/comments`, locals.user?.token)
	]);

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

	deleteArticle: async ({ locals }) => {
		if (!locals.user) throw error(401);
		await api.del(`articles/${article.slug}`, locals.user.token);

		throw redirect(307, '/');
	}
};
