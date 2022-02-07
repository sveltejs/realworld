import { get_articles } from './_get_articles';

export async function get(event) {
	return get_articles(event, 'favorited');
}
