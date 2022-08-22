import { error, json } from '@sveltejs/kit';
import * as api from '$lib/api.js';

export async function DELETE({ params, locals }) {
	if (!locals.user) {
		throw error(401);
	}

	const { slug, id } = params;
	const { status, error } = await api.del(`articles/${slug}/comments/${id}`, locals.user.token);

	if (error) {
		throw (status, { error });
	}

	// comment was deleted successfully
	return json({});
}
