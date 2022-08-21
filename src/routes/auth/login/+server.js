import * as api from '$lib/api.js';
import { respond } from '../_respond';

export async function POST({ request }) {
	const json = await request.json();
	const body = await api.post('users/login', {
		user: {
			email: json.email,
			password: json.password
		}
	});

	return respond(body);
}
