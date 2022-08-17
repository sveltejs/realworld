import { json } from '@sveltejs/kit';
import * as api from '$lib/api.js';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request, locals }) {
	if (!locals.user) {
		throw error(401);
	}

	const form = await request.formData();

	const res = await api.post(
		'articles',
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

	// for AJAX requests, return the newly created article
	if (request.headers.get('accept') === 'application/json') {
		return json(res.article, { status: 201 });
	}

	// for traditional (no-JS) form submissions, redirect
	// to the new article
	console.log(`redirecting to /article/${res.article.slug}`);

	throw redirect(303, `/article/${res.article.slug}`);
}
