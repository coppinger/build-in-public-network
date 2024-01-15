<script lang="ts">
	import toast from 'svelte-french-toast';

	//import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data; // : PageData

	const { form, errors, constraints, enhance, message } = superForm(data.form, {
		onUpdated({ form }) {
			console.log('form:', form);
			console.log('errors:', errors);
			console.log('message:', message);
			if (form.valid) {
				// Successful post! Do some more client-side stuff,
				// like showing a toast notification.
				toast(form.message, { icon: '✅' });
			} else {
				toast.error(form.message, { icon: '❌' });
			}
		}
	});

	if ($errors.email) {
		toast.error(`${$errors.email}`);
	}
</script>

<div class="w-fit">
	<SuperDebug data={$form} />

	<div class="p-4 border-gray-300 border">
		{#if $message}
			<div class="message">{$message}</div>
		{:else}
			<div class="message"><p>No message!</p></div>
		{/if}
	</div>

	<form method="POST" use:enhance>
		<label for="name">Name</label>
		<input
			type="text"
			name="name"
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$form.name}
			{...$constraints.name}
		/>
		{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}

		<label for="email">E-mail</label>
		<input
			type="email"
			name="email"
			aria-invalid={$errors.email ? 'true' : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
		{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}

		<div>
			<button>Submit</button>
		</div>
	</form>
</div>

<style>
	.invalid {
		color: red;
	}
</style>
