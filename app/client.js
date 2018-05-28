import { init } from 'sapper/runtime.js';
import { routes } from './manifest/client.js';
import { Store } from 'svelte/store.js';
import App from './App.html';

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

class ConduitStore extends Store {
	login(credentials) {
		return post(`auth/login`, credentials).then(response => {
			if (response.user) this.set({ user: response.user });
			return response;
		});
	}

	logout() {
		return post(`auth/logout`).then(response => {
			this.set({ user: null });
			return response;
		});
	}

	register(user) {
		return post(`auth/register`, user).then(response => {
			if (response.user) this.set({ user: response.user });
			return response;
		});
	}

	save(user) {
		return post(`auth/save`, user).then(response => {
			if (response.user) this.set({ user: response.user });
			return response;
		});
	}
}

init({
	target: document.querySelector('#sapper'),
	routes,
	App,
	store: data => {
		return new ConduitStore(data);
	}
});