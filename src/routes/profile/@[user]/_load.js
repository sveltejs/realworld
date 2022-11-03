export function create_load(endpoint) {
	return async ({ params, fetch }) => {
		const res = await fetch(`/profile/@${params.user}/${endpoint}.json`);
		return await res.json();
	};
}
