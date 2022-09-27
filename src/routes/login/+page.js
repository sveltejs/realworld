import { redirect } from '@sveltejs/kit';
import { get, user as user_store } from '$lib/stores';

export async function load({ parent }) {
	const user = get(user_store) || (await parent()).user;
	if (user) {
		throw redirect(302, '/');
	}

	return {};
}
