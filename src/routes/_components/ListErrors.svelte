{#if errors}
	<ul class="error-messages">
		{#each Object.keys(errors) as key}
			<li>{key} {errors[key]}</li>
		{/each}
	</ul>
{/if}

<script>
	export let errors;
</script>