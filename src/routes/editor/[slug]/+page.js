import { redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

export async function load({ params, session }) {
	if (!session.user) {
		throw redirect(302, `/login`);
	}

	const { slug } = params;
	const { article } = await api.get(`articles/${slug}`, null);
	return { article, slug };
}
