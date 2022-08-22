import { error, json, redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

export async function GET({ params, locals }) {
	const { slug } = params;
	const { comments } = await api.get(`articles/${slug}/comments`, locals.user && locals.user.token);

	return json(comments);
}

export async function POST({ params, request, locals }) {
	if (!locals.user) {
		throw error(401);
	}

	const { slug } = params;
	const form = await request.formData();
	const body = form.get('comment');

	const { comment } = await api.post(
		`articles/${slug}/comments`,
		{ comment: { body } },
		locals.user.token
	);

	// for AJAX requests, return the newly created comment
	if (request.headers.get('accept') === 'application/json') {
		return json(comment, { status: 201 }); // 201 - created
	}

	// for traditional (no-JS) form submissions, redirect
	// back to the article page
	console.log(`redirecting to /article/${slug}`);
	throw redirect(303, `/article/${slug}`);
}
