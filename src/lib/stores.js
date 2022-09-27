import { getContext, setContext } from 'svelte';
import { get as get_store_value, writable } from 'svelte/store';
import { browser } from '$app/environment';

// safely create a store in order to avoid
// https://github.com/sveltejs/kit/discussions/4339

const KEY = 'realworld-stores';

const createStores = () => ({
	user: writable()
});

let globalStores;
export const initStores = () => {
	if (browser) {
		globalStores = createStores();
	} else {
		setContext(KEY, createStores());
	}
}

const getStores = () => browser ? globalStores : getContext(KEY);

export const user = {
	subscribe(fn) {
		return getStores().user.subscribe(fn);
	},
	set(value) {
		return getStores().user.set(value);
	}
};

export const get = function(store) {
	return browser && globalStores ? get_store_value(store) : undefined;
}
