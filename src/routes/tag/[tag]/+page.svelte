<script>
	import { page } from '$app/state';
	import Home from '../../Home.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>#{page.params.tag} • Conduit</title>
</svelte:head>

<Home {data} tag={page.params.tag} />
