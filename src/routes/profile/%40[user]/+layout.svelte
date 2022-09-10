<script>
	import { page, session } from '$app/stores';

	/** @type {import('./$types').PageData} */
	export let data;

	// TODO would be nice to have a more idiomatic solution to this —
	// https://github.com/sveltejs/kit/issues/269
	$: segments = $page.url.pathname.split('/');
	$: is_favorites = segments.length === 4 && segments[3] === 'favorites';
	$: is_user = $session.user && data.profile.username === $session.user.username;

	let current_token;
	async function toggle_following() {
		const token = (current_token = {});

		const { following, username } = data.profile;

		// optimistic UI
		data.profile.following = !data.profile.following;

		const res = await fetch(`/profile/@${username}/follow`, {
			method: following ? 'delete' : 'post'
		});

		const result = await res.json();

		// synchronise with the server, in case it disagrees
		// with our optimistic UI for some reason — but only
		// if the button wasn't re-toggled in the meantime
		if (token === current_token) {
			data.profile = result.profile;
		}
	}
</script>

<svelte:head>
	<title>{data.profile.username} • Conduit</title>
</svelte:head>

<div class="profile-page">
	<div class="user-info">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<img src={data.profile.image} class="user-img" alt={data.profile.username} />
					<h4>{data.profile.username}</h4>
					{#if data.profile.bio}
						<p>{data.profile.bio}</p>
					{/if}

					{#if is_user}
						<a href="/settings" class="btn btn-sm btn-outline-secondary action-btn">
							<i class="ion-gear-a" />
							Edit Profile Settings
						</a>
					{:else if $session.user}
						<button
							class="btn btn-sm action-btn {data.profile.following
								? 'btn-secondary'
								: 'btn-outline-secondary'}"
							on:click={toggle_following}
						>
							<i class="ion-plus-round" />
							{data.profile.following ? 'Unfollow' : 'Follow'}
							{data.profile.username}
						</button>
					{:else}<a href="/login">Sign in to follow</a>{/if}
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
								href="/profile/@{data.profile.username}"
								class="nav-link"
								rel="prefetch"
								class:active={!is_favorites}>Articles</a
							>
						</li>

						<li class="nav-item">
							<a
								href="/profile/@{data.profile.username}/favorites"
								class="nav-link"
								rel="prefetch"
								class:active={is_favorites}>Favorites</a
							>
						</li>
					</ul>
				</div>

				<slot />
			</div>
		</div>
	</div>
</div>
