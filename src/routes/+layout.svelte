<script>
	import { dev } from '$app/environment';
	import { navigating, page } from '$app/state';
	import favicon from '$lib/assets/favicon.ico';
	import Nav from './Nav.svelte';
	import PreloadingIndicator from './PreloadingIndicator.svelte';

	const { children } = $props();

	// Debug interface for the shared RealWorld e2e suite
	// (realworld-e2e-tests/specs/e2e/helpers/debug.ts). Dev server only.
	$effect(() => {
		if (dev) {
			window.__conduit_debug__ = {
				getToken: () => page.data.debug_user?.token ?? null,
				getAuthState: () => (page.data.user ? 'authenticated' : 'unauthenticated'),
				getCurrentUser: () => page.data.debug_user ?? null
			};
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if navigating.from}
	<PreloadingIndicator />
{/if}

<Nav />

<main>
	{@render children()}
</main>
