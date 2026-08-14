<script>
	import { enhance } from '$app/forms';
	import ListErrors from '$lib/ListErrors.svelte';
	import { escape_html } from '$lib/escape_html.js';

	const { article, errors } = $props();

	let tagList = $state(article.tagList);
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
							defaultValue={article.title}
						/>
					</fieldset>

					<fieldset class="form-group">
						<input
							name="description"
							class="form-control"
							placeholder="What's this article about?"
							defaultValue={article.description}
						/>
					</fieldset>

					<fieldset class="form-group">
						<!-- rendered via @html so hydration leaves the field untouched: Svelte's
						     textarea value handling mutates the element during hydration, which
						     can clobber text typed before hydration completes; the extra \n is
						     eaten by the HTML parser, preserving bodies that start with a newline -->
						{@html `<textarea name="body" class="form-control" rows="8" placeholder="Write your article (in markdown)">\n${escape_html(article.body)}</textarea>`}
					</fieldset>

					<fieldset class="form-group">
						<input
							class="form-control"
							placeholder="Enter tags"
							onkeydown={(event) => {
								if (event.key === 'Enter') {
									event.preventDefault();
									if (!tagList.includes(event.target.value)) {
										tagList.push(event.target.value);
									}

									event.target.value = '';
								}
							}}
						/>
					</fieldset>

					<div class="tag-list">
						{#each tagList as tag, i (tag)}
							<button
								class="tag-default tag-pill"
								type="button"
								onclick={() => {
									tagList.splice(i, 1);
								}}
								aria-label="Remove {tag} tag"
							>
								<i class="ion-close-round"></i>
								{tag}
							</button>
						{/each}
					</div>

					{#each tagList as tag}
						<input hidden name="tag" value={tag} />
					{/each}

					<button class="btn btn-lg pull-xs-right btn-primary" type="submit">Publish Article</button
					>
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
