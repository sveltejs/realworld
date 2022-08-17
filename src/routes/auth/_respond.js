import { error } from '@sveltejs/kit';

export function respond(body) {
	if (body.errors) {
		throw error(401, body);
	}

	const json = JSON.stringify(body.user);
	const value = Buffer.from(json).toString('base64');

	return json(body, {
		headers: {
			'set-cookie': `jwt=${value}; Path=/; HttpOnly`
		}
	});
}
