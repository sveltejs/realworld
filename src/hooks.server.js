/** @type {import('@sveltejs/kit').Handle} */
export function handle({ event, resolve }) {
	const jwt = event.cookies.get('jwt');
	event.locals.user = jwt ? JSON.parse(Buffer.from(jwt, 'base64').toString('utf-8')) : null;

	return resolve(event);
}
