export function get(req, res) {
	res.redirect(`/user/${req.params.username}/${req.params.view}/1`);
}