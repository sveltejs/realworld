import * as api from '../_api.js';

export function post(req, res) {
	delete req.session.user;
	res.end('logged out');
}