<script>
	import { navigating } from '$app/stores';
	import Nav from '$lib/Nav.svelte';
	import PreloadingIndicator from '$lib/PreloadingIndicator.svelte';

	export let data;
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<Nav user={data.user} />

<main>
	<slot />
</main>
