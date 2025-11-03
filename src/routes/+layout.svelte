<script>
	import { navigating } from '$app/state';
	import Nav from './Nav.svelte';
	import PreloadingIndicator from './PreloadingIndicator.svelte';

	const { children } = $props();
</script>

{#if navigating}
	<PreloadingIndicator />
{/if}

<Nav />

<main>
	{@render children()}
</main>
