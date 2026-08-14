import { encode_session } from '$lib/session.js';
import { fail, redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, locals }) {
	if (!locals.user) return;

	// only bounce away if the session is actually alive; a dead one (expired or
	// revoked token) lands here via api.js's 401 redirect, so clear the stale
	// cookie and show the form — otherwise /login would loop back to /
	try {
		await api.get('user', locals.user.token);
	} catch {
		cookies.delete('jwt', { path: '/' });
		locals.user = null;
		return;
	}

	redirect(307, '/');
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const body = await api.post('users/login', {
			user: {
				email: data.get('email'),
				password: data.get('password')
			}
		});

		if (body.errors) {
			return fail(401, body);
		}

		const value = encode_session(body.user);
		cookies.set('jwt', value, { path: '/' });

		redirect(303, '/');
	}
};
