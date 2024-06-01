import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
export default {
	compilerOptions: {
		runes: true
	},
	kit: {
		adapter: adapter({ runtime: 'edge' })
	}
};
