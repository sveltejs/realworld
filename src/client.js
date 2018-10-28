import * as sapper from '../__sapper__/client.js';
import { Store } from 'svelte/store.js';

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

sapper.start({
	target: document.querySelector('#sapper'),
	store: data => {
		return new ConduitStore(data);
	}
});