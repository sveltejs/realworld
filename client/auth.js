import store from './store.js';

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
	if (response.user) store.set({ user: response.user });
	return response;
}

export function register(user) {
	return post(`/auth/register`, user).then(interceptUser);
}

export function save(user) {
	return post(`/auth/save`, user).then(interceptUser);
}

export function login(credentials) {
	return post(`/auth/login`, credentials).then(interceptUser);
}

export function logout() {
	return post(`/auth/logout`).then(response => {
		store.set({ user: null });
		return response;
	});
}