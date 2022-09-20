import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
	const { user } = await parent();
	throw redirect(302, user ? `/profile/@${user.username}` : '/login');
}
