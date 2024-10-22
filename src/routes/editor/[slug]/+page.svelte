<script>
	import Editor from '../Editor.svelte';

	const { data, form } = $props();
</script>

<Editor article={data.article} errors={form?.errors} />
