<script lang="ts">
	import ProfileCard from '$lib/components/profile-card/ProfileCard.svelte';

	export let data;
	const { profiles } = data;
	let { session } = data;
	let { supabase } = data;
	$: ({ supabase } = data);
</script>

<div class="flex flex-col gap-12">
	<h1 class="text-4xl font-medium">
		A curated list of indie hackers and founders who are building in public
	</h1>
	<ul class="grid grid-cols-2 gap-8">
		{#each profiles as profile}
			<li>
				<ProfileCard {profile} />
			</li>
			<li>
				<ProfileCard {profile} />
			</li>
			<li>
				<ProfileCard {profile} />
			</li>
			<li>
				<ProfileCard {profile} />
			</li>
		{/each}
	</ul>
</div>
