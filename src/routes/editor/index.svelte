<Editor {article} {params}/>

<script context="module">
	export function preload({ params }) {
		if (params.slug === undefined) {
			return { params };
		}

		return api.get(`articles/${params.slug}`, null).then(({ article }) => {
			return { article, params };
		});
	}
</script>
<script>
	import { goto } from '@sapper/app';
	import ListErrors from '../_components/ListErrors.svelte';
	import Editor from './_Editor.svelte';
	import * as api from '../_api.js';

	export let 
		params,
		article = {
			title: '',
			description: '',
			body: '',
			tagList: []
		}
</script>