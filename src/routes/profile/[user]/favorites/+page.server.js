import { get_articles } from '../get_articles';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const { articles, pages } = await get_articles(event, 'favorited');
	return { articles, pages };
}
