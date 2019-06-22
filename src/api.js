import {send} from './utils'

const base = 'https://conduit.productionready.io/api';

function prefix(path) {
	return `${base}/${path}`
}

export function get(path, token) {
	return send({ method: 'GET', path: prefix(path), token });
}

export function del(path, token) {
	return send({ method: 'DELETE', path: prefix(path), token });
}

export function post(path, data, token) {
	return send({ method: 'POST', path: prefix(path), data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path: prefix(path), data, token });
}