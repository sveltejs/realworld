import { error } from '@sveltejs/kit';
import * as api from '$lib/api.js';
import { respond } from '../_respond';

export async function POST({ request, locals }) {
	if (!locals.user) {
		throw error(401);
	}

	const user = await request.json();
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
