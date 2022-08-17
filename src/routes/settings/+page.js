import { redirect } from '@sveltejs/kit';

export function load({ session }) {
	const { user } = session;

	if (!user) {
		throw redirect(302, '/login');
	}

	return { user };
}
