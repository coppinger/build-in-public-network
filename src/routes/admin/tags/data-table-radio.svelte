<script lang="ts">
	import { enhance } from '$app/forms';

	import { Switch } from '$lib/components/ui/switch';

	export let enabled: boolean;
	export let id: number;
</script>

<form
	method="POST"
	action="?/toggle"
	use:enhance={() => {
		return async ({ update }) => {
			await update({ reset: false });
		};
	}}
>
	<Switch bind:checked={enabled} type="submit" />
	<input class="hidden" aria-hidden type="text" name="currentStatus" bind:value={enabled} />
	<input class="hidden" aria-hidden type="text" name="currentId" bind:value={id} />
</form>
