<script lang="ts">
	import Tag from '../Tag.svelte';
	import TagBadge from '../TagBadge.svelte';
	import PlatformBadge from './PlatformBadge.svelte';

	export let profile;
	const {
		name,
		location,
		pfp_url,
		started_on,
		revenue,
		exits,
		profiles_tags: profile_tags
	} = profile;
</script>

<div class="flex flex-col gap-6 border border-neutral-300 bg-neutral-50 rounded-2xl shadow-sm p-6">
	<div class="flex flex-col gap-6">
		<!-- pfp_url, username, location -->
		<div class="flex gap-4 items-center">
			<div class="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
				<img src={pfp_url} alt="" width="56px" height="56px" />
			</div>
			<div class="flex flex-col">
				<p class="text-lg font-bold">{name}</p>
				<p class="text-neutral-600 font-semibold">{location}</p>
			</div>
		</div>
		<!-- started, revenue, exits -->
		<ul class="flex gap-10 items-center">
			<li class="flex flex-col">
				<p class="text-neutral-500 font-semibold">Started</p>
				<p class="font-bold">{started_on}</p>
			</li>
			<li class="flex flex-col">
				<p class="text-neutral-500 font-semibold">Revenue</p>
				<p class="font-bold">{revenue}</p>
			</li>
			<li class="flex flex-col">
				<p class="text-neutral-500 font-semibold">Exits</p>
				<p class="font-bold">{exits}</p>
			</li>
		</ul>
	</div>
	<div class="flex flex-col gap-4">
		<ul class="flex gap-2">
			{#each profile_tags as profile_tag}
				<Tag {profile_tag} />
			{/each}
			<li>
				<a href="#" class="text-neutral-500 font-semibold text-xs">view all tags</a>
			</li>
		</ul>
	</div>
	<div class="">
		<PlatformBadge />
	</div>
</div>
