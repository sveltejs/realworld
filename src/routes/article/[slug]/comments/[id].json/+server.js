import * as api from '$lib/api.js';

export async function DELETE({ params, locals }) {
	if (!locals.user) {
		return { status: 401 };
	}

	const { slug, id } = params;
	const { status, error } = await api.del(`articles/${slug}/comments/${id}`, locals.user.token);

	if (error) {
		return { status, body: { error } };
	}
}
