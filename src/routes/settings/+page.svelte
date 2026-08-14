<script>
	import { enhance } from '$app/forms';
	import ListErrors from '$lib/ListErrors.svelte';
	import { escape_html } from '$lib/escape_html.js';

	const { data, form } = $props();
</script>

<svelte:head>
	<title>Settings • Conduit</title>
</svelte:head>

<div class="settings-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Your Settings</h1>

				<ListErrors errors={form?.errors} />

				<form
					use:enhance={() => {
						return ({ update }) => {
							// don't clear the form when we update the profile
							update({ reset: false });
						};
					}}
					method="POST"
					action="?/save"
				>
					<fieldset>
						<fieldset class="form-group">
							<input
								class="form-control"
								name="image"
								type="text"
								placeholder="URL of profile picture"
								defaultValue={data.user.image ?? ''}
							/>
						</fieldset>

						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								name="username"
								type="text"
								placeholder="Username"
								defaultValue={data.user.username}
							/>
						</fieldset>

						<fieldset class="form-group">
							<!-- rendered via @html so hydration leaves the field untouched: Svelte's
							     textarea value handling mutates the element during hydration, which
							     can clobber text typed before hydration completes; the extra \n is
							     eaten by the HTML parser, preserving bios that start with a newline -->
							{@html `<textarea class="form-control form-control-lg" name="bio" rows="8" placeholder="Short bio about you">\n${escape_html(data.user.bio ?? '')}</textarea>`}
						</fieldset>

						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								name="email"
								type="email"
								placeholder="Email"
								defaultValue={data.user.email}
							/>
						</fieldset>

						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								name="password"
								type="password"
								placeholder="New Password"
							/>
						</fieldset>

						<button class="btn btn-lg btn-primary pull-xs-right" type="submit">
							Update Settings
						</button>
					</fieldset>
				</form>

				<hr />

				<form use:enhance method="POST" action="?/logout">
					<button class="btn btn-outline-danger">Or click here to logout.</button>
				</form>
			</div>
		</div>
	</div>
</div>
