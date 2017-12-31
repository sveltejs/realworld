import { base } from './_config.js';

function send({ method, path, data, token }) {
	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Token ${token}`;
	}

	return fetch(`${base}/${path}`, opts).then(r => method === 'DELETE' ? r.text() : r.json());
}

export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function del(path, token) {
	console.log('deleting with token', token);
	return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
	console.log('posting with token', token);
	return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
}