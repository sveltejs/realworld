import { base, token } from './_config.js';

function headers(obj = {}) {
	return Object.assign(token ? { 'Authorization': `Token ${token}` } : {}, obj);
}

export function get(path) {
	return fetch(`${base}/${path}`, { headers: headers() })
		.then(r => r.json());
}

export function del(path) {
	return fetch(`${base}/${path}`, { method: 'DELETE', headers: headers() })
		.then(r => r.json());
}

export function post(path, data) {
	const opts = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: headers({
			'Content-Type': 'application/json'
		})
	}

	return fetch(`${base}/${path}`, opts)
		.then(r => r.json());
}

export function put(path, data) {
	const opts = {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: headers({
			'Content-Type': 'application/json'
		})
	};

	return fetch(`${base}/${path}`, opts)
		.then(r => r.json());
}