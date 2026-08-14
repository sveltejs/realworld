import { error, redirect } from '@sveltejs/kit';

const base = 'https://api.realworld.show/api';

async function send({ method, path, data, token }) {
	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Token ${token}`;
	}

	const res = await fetch(`${base}/${path}`, opts);
	if (res.ok || res.status === 422) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}

	// the API rejected credentials we sent — the session is dead (expired/revoked
	// token), so send the user to the login page instead of a 401 error page.
	// The login load is the janitor that clears the stale cookie.
	if (res.status === 401 && token) {
		redirect(303, '/login');
	}

	// surface API validation errors (e.g. 401 invalid credentials) to form actions —
	// but only for mutations: loads (always GETs) must throw so a rejected token
	// renders an error page instead of resolving with undefined data
	if (method !== 'GET' && [400, 401, 403].includes(res.status)) {
		try {
			const data = JSON.parse(await res.text());
			if (data?.errors) return data;
		} catch {
			// fall through to the generic error
		}
	}

	error(res.status);
}

export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function del(path, token) {
	return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
	return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
}
