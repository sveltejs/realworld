import { decode_session } from '$lib/session.js';

/** @type {import('@sveltejs/kit').Handle} */
export function handle({ event, resolve }) {
	const jwt = event.cookies.get('jwt');

	try {
		event.locals.user = jwt ? decode_session(jwt) : null;
	} catch {
		// corrupt cookie — treat as logged out
		event.locals.user = null;
	}

	return resolve(event);
}
