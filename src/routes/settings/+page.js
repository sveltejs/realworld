import { redirect } from '@sveltejs/kit';

export function load({ parent }) {
	const { user } = await parent();

	if (!user) {
		throw redirect(302, '/login');
	}

	return { user };
}
