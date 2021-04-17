const netlify = require('@sveltejs/adapter-netlify');
const vercel = require('@sveltejs/adapter-vercel');
const pkg = require('./package.json');

module.exports = {
	kit: {
		adapter: process.env.VERCEL ? vercel() : netlify(),
		target: '#svelte',
		vite: {
			ssr: {
				// TODO the adapter should make this unnecessary
				noExternal: process.env.NODE_ENV === 'production' ? [
					...Object.keys(pkg.dependencies),
					...Object.keys(pkg.devDependencies)
				] : []
			}
		}
	}
};
