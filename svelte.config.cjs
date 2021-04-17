const vercel = require('@sveltejs/adapter-vercel');

module.exports = {
	kit: {
		adapter: vercel(),
		target: '#svelte'
	}
};
