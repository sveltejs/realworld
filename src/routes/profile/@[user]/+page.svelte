<script>
	import ArticleList from '$lib/ArticleList/index.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<ArticleList articles={data.articles} />
