import { init } from 'sapper/runtime.js';
import { routes } from './manifest/client.js';
import store from '../client/store.js';

// `routes` is an array of route objects injected by Sapper
init(document.querySelector('#sapper'), routes, {
	store: data => {
		store.set(data);
		window.store = store;
		return store;
	}
});

if (module.hot) module.hot.accept();