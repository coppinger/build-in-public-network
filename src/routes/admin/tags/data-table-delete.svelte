<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Trash2 } from 'lucide-svelte';
	export let id: number;
</script>

<form method="POST" action="?/delete">
	<Button variant="outline" type="submit">
		<Trash2 size="16" />
		<input class="hidden" aria-hidden type="text" bind:value={id} name="currentId" />
	</Button>
</form>
