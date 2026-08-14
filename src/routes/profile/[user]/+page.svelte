<script>
	import { page } from '$app/state';
	import ArticleList from '$lib/ArticleList/index.svelte';
	import Pagination from '../../Pagination.svelte';

	const { data } = $props();

	const p = $derived(+(page.url.searchParams.get('page') ?? '1'));
</script>

<ArticleList articles={data.articles} />
<Pagination pages={data.pages} {p} href={(n) => `/profile/${page.params.user}?page=${n}`} />
