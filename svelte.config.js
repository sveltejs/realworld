import adapter from '@sveltejs/adapter-vercel';

export default {
	kit: {
		adapter: adapter({ runtime: 'edge' })
	}
};
