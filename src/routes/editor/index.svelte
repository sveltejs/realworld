<script>
	import Editor from './_Editor.svelte';
	let article = { title: '', description: '', body: '', tagList: [] };
</script>

<Editor {article}/>