<script context="module">
	import * as api from 'api.js';

	export async function preload({ params }, { user }) {
		const username = params.user.slice(1);

		const { profile } = await api.get(`profiles/${username}`, user && user.token);
		if (!profile) {
			this.error(404, 'Username not found');
		}
		if (params.view !== 'favorites') {
			this.error(404, 'Page not found');
		}
		return { profile, favorites: params.view === 'favorites' };
	}
</script>

<script>
	import { stores, goto } from '@sapper/app';
	import Profile from './_Profile.svelte';

	export let profile, favorites;
	const { session } = stores();
</script>

<svelte:head>
	<title>{profile.username} • Conduit</title>
</svelte:head>

<Profile {profile} {favorites} user={$session.user}/>
