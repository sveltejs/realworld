<svelte:head>
	<title>Settings • Conduit</title>
</svelte:head>

<div class="settings-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">

				<h1 class="text-xs-center">Your Settings</h1>

				<ListErrors {errors}/>

				<SettingsForm on:save='{({ detail }) => save(detail)}' {...$session.user} {inProgress}/>

				<hr />

				<button class="btn btn-outline-danger" on:click='{logout}'>
					Or click here to logout.
				</button>
			</div>
		</div>
	</div>
</div>

<script>
	import { goto, stores } from '@sapper/app';
	import ListErrors from '../_components/ListErrors.svelte';
	import SettingsForm from './_SettingsForm.svelte';
	import { userSession } from '../../store.js';

	let inProgress, errors, user;
	const { session } = stores();

	function logout() {
		userSession.logout().then(() => {
			goto('/');
		});
	}

	function save(user) {
		inProgress = true;

		userSession.save(user).then(response => {
			user = response.user || user;
			errors = response.errors;
			inProgress = false;
		});
	}
</script>