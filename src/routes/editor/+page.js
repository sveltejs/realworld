import { redirect } from '@sveltejs/kit';

export function load({ session }) {
	if (!session.user) {
		throw redirect(302, `/login`);
	}

	return {};
}
