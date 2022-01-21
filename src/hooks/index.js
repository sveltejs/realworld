import * as cookie from 'cookie';

export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');
	event.locals.user = jwt ? JSON.parse(jwt) : null;
	return await resolve(event);
}

export function getSession({ locals }) {
	return {
		user: locals.user && {
			username: locals.user.username,
			email: locals.user.email,
			image: locals.user.image,
			bio: locals.user.bio
		}
	};
}
