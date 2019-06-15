<script>
	import { goto } from '@sapper/app';
	import ListErrors from '../_components/ListErrors.svelte';
	import { userSession } from '../../store.js';

	let email = '';
	let password = '';
	let errors = null;

	async function submit(event) {
		const response = await userSession.login({ email, password });

		// TODO handle network errors
		if (response.errors) {
			errors = response.errors;
		} else {
			goto('/');
		}
	}
</script>

<svelte:head>
	<title>Sign in • Conduit</title>
</svelte:head>

<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Sign In</h1>
				<p class="text-xs-center">
					<a href="/register">Need an account?</a>
				</p>

				<ListErrors {errors}/>

				<form on:submit|preventDefault='{submit}'>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="email" placeholder="Email" bind:value={email}>
					</fieldset>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="password" placeholder="Password" bind:value={password}>
					</fieldset>
					<button class="btn btn-lg btn-primary pull-xs-right" type="submit" disabled='{!email || !password}'>
						Sign in
					</button>
				</form>
			</div>
		</div>
	</div>
</div>