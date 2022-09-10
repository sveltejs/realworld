import { json } from '@sveltejs/kit';
import * as api from '$lib/api.js';

export async function POST({ params, locals }) {
	return json(await api.post(`profiles/${params.user}/follow`, null, locals.user.token));
}

export async function DELETE({ params, locals }) {
	return json(await api.del(`profiles/${params.user}/follow`, locals.user.token));
}
