import * as api from '$lib/api.js';

export async function load({ locals, params }) {
	const { profile } = await api.get(`profiles/${params.user}`, locals.user?.token);

	return {
		profile
	};
}
