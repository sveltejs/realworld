import { get_articles } from '../_get_articles';

export async function GET(event) {
	return get_articles(event, 'author');
}
