import { redirect } from '@sveltejs/kit';

export function load({ session }) {
	throw redirect(302, session.user ? `/profile/@${session.user.username}` : '/login');
}
