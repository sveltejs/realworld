import { Store } from 'svelte/store.js';
import * as api from './_api.js';
import { base, token, setToken } from './_config.js';

class ConduitStore extends Store {
	login(user) {
		return api.post('users/login', { user }).then(response => {
			if (response.user) {
				setToken(response.user.token);
				this.set({ user: response.user });
			}

			return response;
		});
	}

	logout() {
		setToken(null);
		this.set({ user: null });
	}

	register(user) {
		return api.post('users', { user }).then(response => {
			if (response.user) {
				setToken(response.user.token);
				this.set({ user: response.user });
			}

			return response;
		});
	}

	save(user) {
		return api.put('user', { user }).then(response => {
			if (response.user) {
				setToken(response.user.token);
				this.set({ user: response.user });
			}

			return response;
		});
	}
}

const store = new ConduitStore();

// sign-in automatically
if (token) {
	api.get('user').then(response => {
		if (response.user) {
			console.log(response)
			setToken(response.user.token);
			store.set({ user: response.user });
		}
	});
}

export default store;