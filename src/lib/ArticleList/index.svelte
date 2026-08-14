<script>
	import { page } from '$app/state';
	import ArticlePreview from './ArticlePreview.svelte';

	const { articles, empty } = $props();
</script>

{#if articles.length === 0}
	<div class="empty-feed-message">
		{#if empty}{@render empty()}{:else}No articles are here... yet.{/if}
	</div>
{:else}
	<div>
		{#each articles as article (article.slug)}
			<ArticlePreview {article} user={page.data.user} />
		{/each}
	</div>
{/if}
