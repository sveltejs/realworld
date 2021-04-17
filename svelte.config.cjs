const vercel = require('@sveltejs/adapter-vercel');
const pkg = require('./package.json');

module.exports = {
	kit: {
		adapter: vercel(),
		target: '#svelte',
		vite: {
			ssr: {
				// TODO the adapter should make this unnecessary
				noExternal: [
					...Object.keys(pkg.dependencies),
					...Object.keys(pkg.devDependencies)
				]
			}
		}
	}
};
