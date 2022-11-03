import { invalid, redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (locals.user) throw redirect(307, '/');
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
			return invalid(401, body);
		}

		const value = Buffer.from(JSON.stringify(body.user)).toString('base64');
		cookies.set('jwt', value, { path: '/' });

		throw redirect(307, '/');
	}
};
