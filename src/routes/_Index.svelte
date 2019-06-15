<script>
	import { onMount } from 'svelte';
	import MainView from './_components/MainView/index.svelte';
	import Tags from './_components/Tags.svelte';
	import * as api from './_api.js';

	let tab;
	let tag;
	let tags;

	function setTags({ detail }) {
		tag = detail.tag;
		tab = "tag";
	}

	onMount(async () => {
		({ tags } = await api.get('tags'));
	});
</script>

<div class="home-page">
	<div class="banner">
		<div class="container">
			<h1 class="logo-font">conduit</h1>
			<p>A place to share your knowledge.</p>
		</div>
	</div>

	<div class="container page">
		<div class="row">
			<MainView {tag} bind:tab />

			<div class="col-md-3">
				<div class="sidebar">
					<p>Popular Tags</p>
					<Tags {tags} on:select='{setTags}' />
				</div>
			</div>
		</div>
	</div>
</div>