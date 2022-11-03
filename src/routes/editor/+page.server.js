import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (!locals.user) throw redirect(302, `/login`);
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ locals, request }) => {
		if (!locals.user) throw error(401);

		const data = await request.formData();

		const result = await api.post(
			'articles',
			{
				article: {
					title: data.get('title'),
					description: data.get('description'),
					body: data.get('body'),
					tagList: data.get('tagList').split(/[\t\n, ]+/)
				}
			},
			locals.user.token
		);

		if (result?.errors) throw error(400, res.errors);

		throw redirect(303, `/article/${res.article.slug}`);
	}
};
