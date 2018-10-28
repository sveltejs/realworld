export function get(req, res) {
	res.set({
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify({ user: req.session.user || null }));
}