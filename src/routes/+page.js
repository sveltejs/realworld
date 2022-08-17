export async function load({ url, fetch }) {
	const [{ articles, pages }, { tags }] = await Promise.all([
		fetch(`/articles.json${url.search}`, { credentials: 'include' }).then((r) => r.json()),
		fetch('/tags.json').then((r) => r.json())
	]);

	return {
		articles,
		pages,
		tags
	};
}
