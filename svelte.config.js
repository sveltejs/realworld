import netlify from '@sveltejs/adapter-netlify';
import vercel from '@sveltejs/adapter-vercel';

export default {
	kit: {
		adapter: process.env.VERCEL ? vercel() : netlify(),
		target: '#svelte'
	}
};
