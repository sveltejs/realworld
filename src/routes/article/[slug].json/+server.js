import { error, json } from '@sveltejs/kit';
import * as api from '$lib/api.js';

export async function GET({ params, locals }) {
	const { slug } = params;
	const { article } = await api.get(`articles/${slug}`, locals.user && locals.user.token);

	return json(article);
}

export async function PUT({ params, request, locals }) {
	const form = await request.formData();
	const slug = params.slug ;

	const res = await api.put(
		`articles/${slug}`,
		{
			article: {
				title: form.get('title'),
				description: form.get('description'),
				body: form.get('body'),
				tagList: form.get('tagList').split(/[\t\n, ]+/)
			}
		},
		locals.user && locals.user.token
	);

	if (res?.errors) {
		throw error(400, res.errors);
	}

	return json(res.article);
}
