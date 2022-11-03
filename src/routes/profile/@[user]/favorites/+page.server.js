import { get_articles } from '../get_articles';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const { articles, page } = await get_articles(event, 'favorited');
	return { articles, page };
}
