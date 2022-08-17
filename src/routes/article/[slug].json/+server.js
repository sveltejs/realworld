import { json } from '@sveltejs/kit';
import * as api from '$lib/api.js';

export async function GET({ params, locals }) {
	const { slug } = params;
	const { article } = await api.get(`articles/${slug}`, locals.user && locals.user.token);

	return json(article);
}

export async function PUT({ request }) {
	console.log('put', request);
}
