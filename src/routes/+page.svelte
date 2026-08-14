<script>
	import Home from './Home.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>Conduit</title>
</svelte:head>

<Home {data} />
