export async function load({ params, fetch }) {
	const { slug } = params;
	const [article, comments] = await Promise.all([
		fetch(`/article/${slug}.json`).then((r) => r.json()),
		fetch(`/article/${slug}/comments.json`).then((r) => r.json())
	]);

	return { article, comments, slug };
}
