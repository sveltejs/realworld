export let user;

function post(endpoint, data) {
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(r => r.json());
}

function interceptUser(response) {
	if (response.user) user = response.user;
	return response;
}

export function init() {
	return fetch(`/auth/user`, { credentials: 'include' })
		.then(r => r.json())
		.then(interceptUser);
}

export function login(credentials) {
	return post(`/auth/login`, credentials).then(interceptUser);
}

export function logout() {
	return post(`/auth/logout`).then(response => {
		user = null;
		return response;
	});
}

export function register(user) {
	return post(`/auth/register`, user).then(interceptUser);
}

export function save(user) {
	return post(`/auth/save`, user).then(interceptUser);
}