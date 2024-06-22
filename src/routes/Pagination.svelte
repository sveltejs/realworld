<script>
	const { pages, p, href } = $props();

	const range = $derived.by(() => {
		const result = [];
		for (let i = 1; i <= pages; i++) {
			result.push(i);
		}
		return result;
	});
</script>

{#if pages > 1}
	<nav>
		<ul class="pagination">
			{#each range as n}
				<li class="page-item" class:active={n == p}><a class="page-link" href={href(n)}>{n}</a></li>
			{/each}
		</ul>
	</nav>
{/if}
