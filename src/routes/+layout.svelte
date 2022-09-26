<script>
	import { page } from '$app/stores';
	import { session } from '../stores/sessions';
	import { navigating } from '$app/stores';
	import Nav from '$lib/Nav.svelte';
	import PreloadingIndicator from '$lib/PreloadingIndicator.svelte';

	$session = $page.data;
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<Nav />

<main>
	<slot />
</main>
