<script>
	import { navigating } from '$app/stores';
	import { initStores, user } from '$lib/stores';
	import Nav from '$lib/Nav.svelte';
	import PreloadingIndicator from '$lib/PreloadingIndicator.svelte';

	initStores();

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
