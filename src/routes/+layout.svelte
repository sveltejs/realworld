<script>
	import { navigating } from '$app/stores';
	import Nav from './Nav.svelte';
	import PreloadingIndicator from './PreloadingIndicator.svelte';

	const { children } = $props();
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<Nav />

<main>
	{@render children()}
</main>
