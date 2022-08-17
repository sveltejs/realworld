export async function load({ params, fetch }) {
	const res = await fetch(`/profile/@${params.user}.json`);

	return {
		profile: await res.json()
	};
}
