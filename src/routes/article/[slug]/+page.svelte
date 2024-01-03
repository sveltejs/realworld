<script>
	import ArticleMeta from './ArticleMeta.svelte';
	import CommentContainer from './CommentContainer.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{data.article.title}</title>
</svelte:head>

<div class="article-page">
	<div class="banner">
		<div class="container">
			<h1>{data.article.title}</h1>
			<ArticleMeta article={data.article} user={data.user} />
		</div>
	</div>

	<div class="container page">
		<div class="row article-content">
			<div class="col-xs-12">
				<div>
					{@html data.article.body}
				</div>

				<ul class="tag-list">
					{#each data.article.tagList as tag}
						<li class="tag-default tag-pill tag-outline">{tag}</li>
					{/each}
				</ul>
			</div>
		</div>

		<hr />

		<div class="article-actions" />

		<div class="row">
			<CommentContainer comments={data.comments} user={data.user} errors={[]} />
		</div>
	</div>
</div>
