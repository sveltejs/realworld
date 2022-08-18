import { error, json } from '@sveltejs/kit';

export function respond(body) {
	if (body.errors) {
		throw error(401, body);
	}

	const value = Buffer.from(JSON.stringify(body.user)).toString('base64');

	return json(body, {
		headers: {
			'set-cookie': `jwt=${value}; Path=/; HttpOnly`
		}
	});
}
