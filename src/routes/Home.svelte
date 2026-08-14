<script>
	import { page } from '$app/state';
	import ArticleList from '$lib/ArticleList/index.svelte';
	import logo from '$lib/assets/conduit-logo.svg';
	import Pagination from './Pagination.svelte';

	const { data, tag = null } = $props();

	const feed = $derived(page.url.searchParams.get('feed'));
	const p = $derived(+(page.url.searchParams.get('page') ?? '1'));
</script>

<div class="home-page">
	{#if !data.user}
		<div class="banner">
			<div class="container">
				<h1 class="logo-font">
					<img src={logo} alt="Conduit" class="banner-logo" />
				</h1>
				<p>A place to share your knowledge.</p>
			</div>
		</div>
	{/if}

	<div class="container page">
		<div class="row">
			<div class="col-md-9">
				<div class="feed-toggle">
					<ul class="nav nav-pills outline-active">
						{#if data.user}
							<li class="nav-item">
								<a
									href="/?feed=following"
									class="nav-link"
									class:active={feed === 'following' && !tag}
								>
									Your Feed
								</a>
							</li>
						{/if}

						<li class="nav-item">
							<a href="/" class="nav-link" class:active={feed !== 'following' && !tag}>
								Global Feed
							</a>
						</li>

						{#if tag}
							<li class="nav-item">
								<a href="/tag/{tag}" class="nav-link active">
									<i class="ion-pound"></i>
									{tag}
								</a>
							</li>
						{/if}
					</ul>
				</div>

				<ArticleList articles={data.articles}>
					{#snippet empty()}
						{#if feed === 'following' && !tag}
							Your feed is empty. Follow some authors from the <a href="/">Global Feed</a>!
						{:else}
							No articles are here... yet.
						{/if}
					{/snippet}
				</ArticleList>
				<Pagination
					pages={data.pages}
					{p}
					href={(n) =>
						tag
							? `/tag/${tag}?page=${n}`
							: feed === 'following'
								? `/?feed=following&page=${n}`
								: `/?page=${n}`}
				/>
			</div>

			<div class="col-md-3">
				<div class="sidebar">
					<p>Popular Tags</p>
					<div class="tag-list">
						{#each data.tags as tag}
							<a href="/tag/{tag}" class="tag-default tag-pill">{tag}</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
