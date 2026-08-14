import * as api from '$lib/api.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
	const [{ article }, { comments }] = await Promise.all([
		api.get(`articles/${params.slug}`, locals.user?.token),
		api.get(`articles/${params.slug}/comments`, locals.user?.token)
	]);

	const dirty = marked(article.body);
	article.body = sanitizeHtml(dirty);

	return { article, comments };
}

/** @type {import('./$types').Actions} */
export const actions = {
	createComment: async ({ locals, params, request }) => {
		if (!locals.user) error(401);

		const data = await request.formData();

		const result = await api.post(
			`articles/${params.slug}/comments`,
			{
				comment: {
					body: data.get('comment')
				}
			},
			locals.user.token
		);

		if (result.errors) return fail(422, result);
	},

	deleteComment: async ({ locals, params, url }) => {
		if (!locals.user) error(401);

		const id = url.searchParams.get('id');
		const result = await api.del(`articles/${params.slug}/comments/${id}`, locals.user.token);

		if (result.errors) return fail(422, result);
	},

	deleteArticle: async ({ locals, params }) => {
		if (!locals.user) error(401);

		await api.del(`articles/${params.slug}`, locals.user.token);
		redirect(303, '/');
	},

	toggleFavorite: async ({ locals, params, request, url }) => {
		if (!locals.user) error(401);

		// the intent lives in the query string (not the body) so the API call
		// still happens when the client navigates away before the body arrives
		const favorited = url.searchParams.get('favorite') !== 'false';

		const result = favorited
			? await api.post(`articles/${params.slug}/favorite`, null, locals.user.token)
			: await api.del(`articles/${params.slug}/favorite`, locals.user.token);

		if (result.errors) return fail(422, result);

		redirect(303, request.headers.get('referer') ?? `/article/${params.slug}`);
	}
};
