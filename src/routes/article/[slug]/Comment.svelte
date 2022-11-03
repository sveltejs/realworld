<script>
	import { enhance } from '$app/forms';

	export let comment;
	export let user;
</script>

<div class="card">
	<div class="card-block">
		<p class="card-text">{comment.body}</p>
	</div>

	<div class="card-footer">
		<a href="/profile/@{comment.author.username}" class="comment-author">
			<img src={comment.author.image} class="comment-author-img" alt={comment.author.username} />
		</a>

		<a href="/profile/@{comment.author.username}" class="comment-author">
			{comment.author.username}
		</a>

		<span class="date-posted">{new Date(comment.createdAt).toDateString()}</span>

		{#if user && comment.author.username === user.username}
			<form use:enhance method="POST" action="?/deleteComment&id={comment.id}" class="mod-options">
				<button class="ion-trash-a" aria-label="Delete comment" />
			</form>
		{/if}
	</div>
</div>

<style>
	button {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		font-size: inherit;
		margin-left: 5px;
		opacity: 0.6;
		cursor: pointer;
	}
</style>
