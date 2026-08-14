<script>
	import { enhance } from '$app/forms';
	import { placeholder } from '$lib/constants.js';

	const { comment, user } = $props();
</script>

<div class="card">
	<div class="card-block">
		<p class="card-text">{comment.body}</p>
	</div>

	<div class="card-footer">
		<a href="/profile/{comment.author.username}" class="comment-author">
			<img
				src={comment.author.image || placeholder}
				class="comment-author-img"
				alt={comment.author.username}
			/>
		</a>

		<a href="/profile/{comment.author.username}" class="comment-author">
			{comment.author.username}
		</a>

		<span class="date-posted">{new Date(comment.createdAt).toDateString()}</span>

		{#if user && comment.author.username === user.username}
			<span class="mod-options">
				<form use:enhance method="POST" action="?/deleteComment&id={comment.id}">
					<button aria-label="Delete comment"><i class="ion-trash-a"></i></button>
				</form>
			</span>
		{/if}
	</div>
</div>

<style>
	.mod-options form {
		display: inline;
	}

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
