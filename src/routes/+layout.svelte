<script>
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import { initStores, user } from '$lib/stores';
	import Nav from '$lib/Nav.svelte';
	import PreloadingIndicator from '$lib/PreloadingIndicator.svelte';

	// On the server, we can only initialize the stores inside the layout
	// because the context isn't available before that
	// On the client, we'd like to do it earlier so we can access it in load
	if (!browser) {
		initStores();
	}

	export let data;

	$: user.set(data.user);
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<Nav />

<main>
	<slot />
</main>
