import { error, redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

export async function load({ locals, params }) {
	if (!locals.user) redirect(302, `/login`);

	const { article } = await api.get(`articles/${params.slug}`, locals.user.token);
	return { article };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ locals, params, request }) => {
		if (!locals.user) error(401);

		const data = await request.formData();

		const result = await api.put(
			`articles/${params.slug}`,
			{
				article: {
					title: data.get('title'),
					description: data.get('description'),
					body: data.get('body'),
					tagList: data.getAll('tag')
				}
			},
			locals.user.token
		);

		if (result.errors) error(400, result.errors);

		redirect(303, `/article/${result.article.slug}`);
	}
};
