import { redirect } from '@sveltejs/kit';
import { page } from '$app/stores';

export async function load() {
	if (page.user) {
		throw redirect(302, '/');
	}

	return {};
}
