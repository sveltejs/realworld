<div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ListErrors {errors}/>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Article Title" bind:value={article.title}>
              </fieldset>

              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="What's this article about?" bind:value={article.description}>
              </fieldset>

              <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" bind:value={article.body}/>
              </fieldset>

              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="Enter tags" use:enter='{addTag}'>

                <div class="tag-list">
                  {#each article.tagList as tag, i}
                    <span class="tag-default tag-pill">
                      <i class="ion-close-round" on:click='{() => remove(i)}'/>
                      {tag}
                    </span>
                  {/each}
                </div>
              </fieldset>

              <button class="btn btn-lg pull-xs-right btn-primary" type="button" disabled={inProgress} on:click='{publish}'>
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>

<script>
  import { goto, stores } from '@sapper/app';
  import ListErrors from '../_components/ListErrors.svelte';
  import * as api from '../_api.js';

  export let params, article;

  let inProgress = false,
    errors;
  const { session } = stores();

  function addTag(input) {
    article.tagList = article.tagList.concat(input.value);
    input.value = '';
  }

  function remove(index) {
    article.tagList = article.tagList.filter((_, i) => index !== i);
  }

  function publish() {

    inProgress = true;
    const promise = !params.slug  ?
      api.post('articles', { article }, $session.user && $session.user.token) :
      api.put(`articles/${params.slug}`, { article }, $session.user && $session.user.token);

    promise.then(response => {
      if (response.article) {
        goto(`/article/${response.article.slug}`);
      }
    });
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