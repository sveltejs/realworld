<script>
	import { enhance } from '$app/forms';
	import { placeholder } from '$lib/constants.js';

	const { article, user } = $props();
</script>

<div class="article-preview">
	<div class="article-meta">
		<a href="/profile/{article.author.username}">
			<img src={article.author.image || placeholder} alt={article.author.username} />
		</a>

		<div class="info">
			<a class="author" href="/profile/{article.author.username}">{article.author.username}</a>
			<span class="date">{new Date(article.createdAt).toDateString()}</span>
		</div>

		{#if user}
			<form
				method="POST"
				action="/article/{article.slug}?/toggleFavorite&favorite={article.favorited
					? 'false'
					: 'true'}"
				use:enhance={({ formElement }) => {
					// optimistic UI
					if (article.favorited) {
						article.favorited = false;
						article.favoritesCount -= 1;
					} else {
						article.favorited = true;
						article.favoritesCount += 1;
					}

					const button = formElement.querySelector('button');
					button.disabled = true;

					return ({ update }) => {
						button.disabled = false;
						update();
					};
				}}
				class="pull-xs-right"
			>
				<button class="btn btn-sm {article.favorited ? 'btn-primary' : 'btn-outline-primary'}">
					<i class="ion-heart"></i>
					{article.favoritesCount}
				</button>
			</form>
		{/if}
	</div>

	<a href="/article/{article.slug}" class="preview-link">
		<h1>{article.title}</h1>
		<p>{article.description}</p>
		<span>Read more...</span>
		<ul class="tag-list">
			{#each article.tagList as tag}
				<li class="tag-default tag-pill tag-outline">{tag}</li>
			{/each}
		</ul>
	</a>
</div>
