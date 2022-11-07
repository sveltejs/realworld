<script>
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { enhance } from '$app/forms';
	import ListErrors from '$lib/ListErrors.svelte';

	export let article;
	export let errors;
</script>

<div class="editor-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-10 offset-md-1 col-xs-12">
				<ListErrors {errors} />

				<form use:enhance method="POST">
					<fieldset class="form-group">
						<input
							name="title"
							class="form-control form-control-lg"
							placeholder="Article Title"
							value={article.title}
						/>
					</fieldset>

					<fieldset class="form-group">
						<input
							name="description"
							class="form-control"
							placeholder="What's this article about?"
							value={article.description}
						/>
					</fieldset>

					<fieldset class="form-group">
						<textarea
							name="body"
							class="form-control"
							rows="8"
							placeholder="Write your article (in markdown)"
							value={article.body}
						/>
					</fieldset>

					<fieldset class="form-group">
						<input
							class="form-control"
							placeholder="Enter tags"
							on:keydown={(event) => {
								if (event.key === 'Enter') {
									event.preventDefault();
									if (!article.tagList.includes(event.target.value)) {
										article.tagList = [...article.tagList, event.target.value];
									}

									event.target.value = '';
								}
							}}
						/>
					</fieldset>

					<div class="tag-list">
						{#each article.tagList as tag, i (tag)}
							<button
								transition:scale|local={{ duration: 200 }}
								animate:flip={{ duration: 200 }}
								class="tag-default tag-pill"
								on:click|preventDefault={() => {
									article.tagList = [
										...article.tagList.slice(0, i),
										...article.tagList.slice(i + 1)
									];
								}}
								aria-label="Remove {tag} tag"
							>
								<i class="ion-close-round" />
								{tag}
							</button>
						{/each}
					</div>

					{#each article.tagList as tag}
						<input hidden name="tag" value={tag} />
					{/each}

					<button class="btn btn-lg pull-xs-right btn-primary">Publish Article</button>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.tag-pill {
		border: none;
	}
</style>
