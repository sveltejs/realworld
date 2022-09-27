import { redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';
import { get, user as user_store } from '$lib/stores';

export async function load({ parent }) {
	const user = get(user_store) || (await parent()).user;
	if (!user) {
		throw redirect(302, `/login`);
	}

	const { slug } = params;
	const { article } = await api.get(`articles/${slug}`, null);
	return { article, slug };
}
