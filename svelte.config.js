import adapter from '@sveltejs/adapter-auto';

export default {
	kit: {
		adapter: adapter(),
		methodOverride: {
			allowed: ['PUT', 'DELETE']
		}
	}
};
