import { init } from 'sapper/runtime.js';
import { Store } from 'svelte/store.js';
import { routes } from './manifest/client.js';

// `routes` is an array of route objects injected by Sapper
init(document.querySelector('#sapper'), routes, {
	store: data => {
		console.log(data);
		const store = new Store(data);
		window.store = store;
		return store;
	}
});

if (module.hot) module.hot.accept();