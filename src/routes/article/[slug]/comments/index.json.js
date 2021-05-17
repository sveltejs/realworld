import * as api from '$lib/api.js';

export async function get({ params, locals }) {
	const { slug } = params;
	const { comments } = await api.get(
		`articles/${slug}/comments`,
		locals.user && locals.user.token
	);

	return {
		body: comments
	};
}

export async function post({ params, body: form, headers, locals }) {
	if (!locals.user) {
		return { status: 401 };
	}

	const { slug } = params;
	const body = form.get('comment');

	const { comment } = await api.post(
		`articles/${slug}/comments`,
		{ comment: { body } },
		locals.user.token
	);

	// for AJAX requests, return the newly created comment
	if (headers.accept === 'application/json') {
		return {
			status: 201, // created
			body: comment
		};
	}

	// for traditional (no-JS) form submissions, redirect
	// back to the article page
	console.log(`redirecting to /article/${slug}`);
	return {
		status: 303, // see other
		headers: {
			location: `/article/${slug}`
		}
	};
}
