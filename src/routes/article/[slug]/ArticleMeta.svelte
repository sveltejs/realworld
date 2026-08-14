<script>
	import { enhance } from '$app/forms';
	import { placeholder } from '$lib/constants.js';

	const { article, user } = $props();
</script>

<div class="article-meta">
	<a href="/profile/{article.author.username}">
		<img src={article.author.image || placeholder} alt={article.author.username} />
	</a>

	<div class="info">
		<a href="/profile/{article.author.username}" class="author">{article.author.username}</a>
		<span class="date">
			{new Date(article.createdAt).toDateString()}
		</span>
	</div>

	{#if article.author.username === user?.username}
		<span>
			<a href="/editor/{article.slug}" class="btn btn-outline-secondary btn-sm">
				<i class="ion-edit"></i> Edit Article
			</a>

			<form use:enhance method="POST" action="?/deleteArticle">
				<button class="btn btn-outline-danger btn-sm">
					<i class="ion-trash-a"></i> Delete Article
				</button>
			</form>
		</span>
	{:else if user}
		<span>
			<form
				use:enhance
				method="POST"
				action="/profile/{article.author.username}?/toggleFollow&follow={article.author.following
					? 'false'
					: 'true'}"
			>
				<button
					class="btn btn-sm"
					class:btn-secondary={article.author.following}
					class:btn-outline-secondary={!article.author.following}
				>
					<i class="ion-plus-round"></i>
					{article.author.following ? 'Unfollow' : 'Follow'}
					{article.author.username}
				</button>
			</form>

			<form
				use:enhance
				method="POST"
				action="?/toggleFavorite&favorite={article.favorited ? 'false' : 'true'}"
			>
				<button
					class="btn btn-sm"
					class:btn-primary={article.favorited}
					class:btn-outline-primary={!article.favorited}
				>
					<i class="ion-heart"></i>
					{article.favorited ? 'Unfavorite' : 'Favorite'} Article ({article.favoritesCount})
				</button>
			</form>
		</span>
	{/if}
</div>

<style>
	form {
		display: inline-block;
	}
</style>
