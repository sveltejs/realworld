import { dev } from '$app/environment';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
	return {
		user: locals.user && {
			username: locals.user.username,
			email: locals.user.email,
			image: locals.user.image,
			bio: locals.user.bio
		},
		// full user (including token) for the e2e debug interface — dev server only
		debug_user: dev && locals.user ? locals.user : null
	};
}
