import * as api from '$lib/api.js';

export async function get({ params, locals }) {
	const { slug } = params;
	const { article } = await api.get(`articles/${slug}`, locals.user && locals.user.token);

	return {
		body: article
	};
}

export async function put(request) {
	console.log('put', request);
}
