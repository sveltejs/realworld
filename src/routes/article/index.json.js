import * as api from '$lib/api.js';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, locals }) {
	
	if (!locals.user) {
		return { status: 401 };
	}
	
	const form = await request.formData();
	
	const res = await api.post(
		'articles',
		{ article: {
				title: form.get('title'),
				description: form.get('description'),
				body: form.get('body'),
				tagList: form.get('tagList').split(/\t\n, /)
            }
        },
		locals.user && locals.user.token
		);
		
		console.log(res);

		// for AJAX requests, return the newly created comment
	if (request.headers.get('accept') === 'application/json') {
		return {
			status: 201, // created
			body: res.article
		};
	}
	
	// for traditional (no-JS) form submissions, redirect
	// to the new article
	console.log(`redirecting to /article/${article.slug}`);
	

	return {
		status: 303, // see other
		headers: {
			location: `/article/${article.slug}`
		}
	};
};