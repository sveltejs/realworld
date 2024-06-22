<script>
	import { enhance } from '$app/forms';

	const { article, user } = $props();
</script>

<div class="article-meta">
	<a href="/profile/@{article.author.username}">
		<img src={article.author.image} alt={article.author.username} />
	</a>

	<div class="info">
		<a href="/profile/@{article.author.username}" class="author">{article.author.username}</a>
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
	{/if}
</div>
