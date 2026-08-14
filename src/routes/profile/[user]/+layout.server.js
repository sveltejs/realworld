import { redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

export async function load({ locals, params, url }) {
	// legacy /profile/@username URLs
	if (params.user.startsWith('@')) {
		redirect(308, url.pathname.replace('/@', '/') + url.search);
	}

	const { profile } = await api.get(`profiles/${params.user}`, locals.user?.token);

	return {
		profile
	};
}
