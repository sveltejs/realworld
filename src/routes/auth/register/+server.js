import * as api from '$lib/api.js';
import { respond } from './_respond';

export async function post({ request }) {
	const user = await request.json();

	// TODO individual properties
	const body = await api.post('users', { user });

	return respond(body);
}
