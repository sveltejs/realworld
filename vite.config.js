import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  rollupOptions: {
    maxParallelFileOps: 5,
  },
};

export default config;
