<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { placeholder } from '$lib/constants.js';

	const { children, data } = $props();

	const is_favorites = $derived($page.route.id === '/profile/[user]/favorites');
</script>

<svelte:head>
	<title>{data.profile.username} • Conduit</title>
</svelte:head>

<div class="profile-page">
	<div class="user-info">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<img
						src={data.profile.image || placeholder}
						class="user-img"
						alt={data.profile.username}
					/>
					<h4>{data.profile.username}</h4>
					<p>{data.profile.bio ?? ''}</p>

					{#if data.profile.username === data.user?.username}
						<a href="/settings" class="btn btn-sm btn-outline-secondary action-btn">
							<i class="ion-gear-a"></i>
							Edit Profile Settings
						</a>
					{:else if data.user}
						<form
							method="POST"
							action="/profile/{data.profile.username}?/toggleFollow&follow={data.profile.following
								? 'false'
								: 'true'}"
							use:enhance={({ formElement }) => {
								// optimistic UI
								data.profile.following = !data.profile.following;

								const button = formElement.querySelector('button');
								button.disabled = true;

								return ({ update }) => {
									button.disabled = false;
									update();
								};
							}}
						>
							<button
								class="btn btn-sm action-btn"
								class:btn-secondary={data.profile.following}
								class:btn-outline-secondary={!data.profile.following}
							>
								<i class="ion-plus-round"></i>
								{data.profile.following ? 'Unfollow' : 'Follow'}
								{data.profile.username}
							</button>
						</form>
					{:else}
						<a href="/login">Sign in to follow</a>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-md-10 offset-md-1">
				<div class="articles-toggle">
					<ul class="nav nav-pills outline-active">
						<li class="nav-item">
							<a
								href="/profile/{data.profile.username}"
								class="nav-link"
								class:active={!is_favorites}
							>
								My Articles
							</a>
						</li>

						<li class="nav-item">
							<a
								href="/profile/{data.profile.username}/favorites"
								class="nav-link"
								class:active={is_favorites}
							>
								Favorited Articles
							</a>
						</li>
					</ul>
				</div>

				{@render children()}
			</div>
		</div>
	</div>
</div>
