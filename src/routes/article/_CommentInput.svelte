<form class="card comment-form" on:submit|preventDefault='{submit}'>
	<div class="card-block">
		<textarea class="form-control" placeholder="Write a comment..." bind:value={body} rows="3"/>
	</div>

	<div class="card-footer">
		<img src={user.image} class="comment-author-img" alt={user.username} >
		<button class="btn btn-sm btn-primary" type="submit">Post Comment</button>
	</div>
</form>

<script>
	import { createEventDispatcher } from 'svelte';
	import * as api from '../_api.js';
	
	export let slug, user;
	let body = '';

	function submit(event) {
		api.post(`articles/${slug}/comments`, { comment: { body } }, user && user.token).then(response => {
			if (response.comment) {
				dispatch('commented', response);
				body = '';
			}
		});
	}
		
</script>