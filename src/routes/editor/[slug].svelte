<script context="module">
	import * as api from 'api.js';

	export async function preload({ params }) {
		const { slug } = params;
		const { article } = await api.get(`articles/${slug}`, null);
		return { article, slug };
	}
</script>

<script>
	import Editor from './_Editor.svelte';

	export let slug;
	export let article;
</script>

<Editor {article} {slug}/>