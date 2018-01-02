export function get(req, res) {
	res.redirect(`/user/${req.params.username}/posts/1`);
}