import * as cookie from 'cookie';

export function handle({ headers }) {
	const cookies = cookie.parse(headers.cookie || '');
	const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');
	request.locals.user = jwt ? JSON.parse(jwt) : null;
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
