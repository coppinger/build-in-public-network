<script lang="ts">
	import { IconBrandDiscordFilled, IconBrandTwitterFilled } from '@tabler/icons-svelte';
	export let platform: string;
</script>

<a
	href="#"
	class="flex items-center gap-3 border-neutral-200 border rounded-full bg-white shadow-sm min-h-12"
>
	<div
		class="bg-[#1DA1F2] text-white border border-neutral-200 rounded-full h-12 w-12 flex items-center justify-center"
	>
		{#if platform === 'twitter'}
			<IconBrandTwitterFilled size={20} />
		{:else if platform === 'discord'}
			<IconBrandDiscordFilled size={20} />
		{:else}
			<!-- else content here -->
		{/if}
	</div>
	{platform}
</a>
