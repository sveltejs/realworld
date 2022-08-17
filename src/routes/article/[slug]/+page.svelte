<script>
	import { session } from '$app/stores';
	import { marked } from 'marked';

	import ArticleMeta from './_ArticleMeta.svelte';
	import CommentContainer from './_CommentContainer.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: markup = marked(data.article.body);
</script>

<svelte:head>
	<title>{data.article.title}</title>
</svelte:head>

<div class="article-page">
	<div class="banner">
		<div class="container">
			<h1>{data.article.title}</h1>
			<ArticleMeta article={data.article} user={$session.user} />
		</div>
	</div>

	<div class="container page">
		<div class="row article-content">
			<div class="col-xs-12">
				<div>
					{@html markup}
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
			<CommentContainer slug={data.slug} comments={data.comments} user={$session.user} errors={[]} />
		</div>
	</div>
</div>
