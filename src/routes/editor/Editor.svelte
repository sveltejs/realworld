<script>
	import { enhance } from '$app/forms';
	import ListErrors from '$lib/ListErrors.svelte';

	export let article;
	export let errors;

	function add_tag(input) {
		article.tagList = [...article.tagList, input.value];
		input.value = '';
	}

	function remove(index) {
		article.tagList = [...article.tagList.slice(0, index), ...article.tagList.slice(index + 1)];
	}

	function enter(node, callback) {
		function onkeydown(event) {
			if (event.which === 13) callback(node);
		}

		node.addEventListener('keydown', onkeydown);

		return {
			destroy() {
				node.removeEventListener('keydown', onkeydown);
			}
		};
	}
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
							name="tagList"
							class="form-control"
							placeholder="Enter tags"
							use:enter={add_tag}
						/>

						<div class="tag-list">
							{#each article.tagList as tag, i}
								<span class="tag-default tag-pill">
									<i class="ion-close-round" on:click={() => remove(i)} />
									{tag}
								</span>
							{/each}
						</div>
					</fieldset>

					<button class="btn btn-lg pull-xs-right btn-primary">Publish Article</button>
				</form>
			</div>
		</div>
	</div>
</div>
