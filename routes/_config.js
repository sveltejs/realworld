export const base = 'https://conduit.productionready.io/api';

export let token = null;
try {
	token = localStorage.getItem('jwt') || null;
} catch (err) {
	// noop
}

export function setToken(_token) {
	localStorage.setItem('jwt', _token || '');
	token = _token;
}