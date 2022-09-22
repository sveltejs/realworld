import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
	const { user } = await parent();
	throw redirect(302, user.user ? `/profile/@${user.user.username}` : '/login');
}
