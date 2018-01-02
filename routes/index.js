export function get(req, res) {
	res.redirect(req.session.user ? '/feed/latest/1' : '/feed/global/1');
}