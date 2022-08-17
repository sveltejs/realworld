import * as api from '$lib/api.js';

export async function POST({ params, locals }) {
	return {
		body: await api.post(`profiles/${params.user}/follow`, null, locals.user.token)
	};
}

export async function DELETE({ params, locals }) {
	return {
		body: await api.del(`profiles/${params.user}/follow`, locals.user.token)
	};
}
