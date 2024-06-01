<script>
	import ArticleList from '$lib/ArticleList/index.svelte';

	const { data } = $props();
</script>

<ArticleList articles={data.articles} />
