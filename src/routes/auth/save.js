import * as api from '$lib/api.js';
import { respond } from './_respond';

export async function post({ request, locals }) {
	let user = await request.json();

	if (!locals.user) {
		return {
			status: 401
		};
	}

	const { token } = locals.user;
	const body = await api.put(
		'user',
		{
			user // TODO individual properties
		},
		token
	);

	return respond(body);
}
