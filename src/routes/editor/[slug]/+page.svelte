<script>
	import Editor from '../_Editor.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Editor article={data.article} slug={data.slug} />
