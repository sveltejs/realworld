<script>
	import Editor from '../Editor.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<Editor article={data.article} errors={form?.errors} />
