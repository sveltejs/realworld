<script>
	import Editor from './Editor.svelte';

	const { form } = $props();
</script>

<Editor
	article={{
		title: '',
		description: '',
		body: '',
		tagList: []
	}}
	errors={form?.errors}
/>
