<script lang="ts">
	import Button from './ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { navItems } from '$lib/nav-items';

	import { writable } from 'svelte/store';

	export const toggleBrowseMobileFilter = writable(false);

	// Icons
	import {
		IconFilter,
		IconMenu,
		IconList,
		IconInfoSquareRounded,
		IconBrandDiscord,
		IconBrandTwitter,
		IconDropletDown,
		IconChevronDown
	} from '@tabler/icons-svelte';
	import Brand from './Brand.svelte';

	const iconComponents = {
		IconList,
		IconInfoSquareRounded,
		IconBrandDiscord,
		IconBrandTwitter
	};

	export let session: any;
</script>

<nav
	class="fixed bottom-0 left-0 w-full flex items-center justify-stretch gap-6 p-6 bg-neutral-50 border-t"
>
	<Button class="w-full flex gap-2"><IconFilter size={16} /> Filter profiles</Button>
	<Button
		variant="outline"
		on:click={() => {
			$toggleBrowseMobileFilter = !$toggleBrowseMobileFilter;
		}}><IconMenu /></Button
	>
	<Sheet.Root bind:open={$toggleBrowseMobileFilter}>
		<Sheet.Content class="h-full">
			<Sheet.Header class="h-full">
				<Sheet.Description class="h-full">
					<div class="flex flex-col justify-between gap-8 h-full mt-auto">
						<div><Brand short={true} /></div>
						<div class="flex gap-8 flex-col">
							<ul class="flex flex-col gap-8">
								{#each navItems as navItem}
									<li>
										<a class="flex gap-2 font-semibold items-center" href={navItem.path}>
											<svelte:component this={iconComponents[navItem.icon]} />
											{navItem.title}</a
										>
									</li>
								{/each}
							</ul>
							<hr />
							{#if session}
								<a class="flex gap-2 font-semibold mx-auto items-center w-full" href="/profile">
									<div class="inline-block h-8 w-8 rounded-full shrink-0 overflow-hidden">
										<img src="/images/tim-pfp.png" width="32px" height="32px" alt="" />
									</div>
									<span class="whitespace-nowrap overflow-hidden overflow-ellipsis">
										Charlie Coppinger The Third
									</span>
									<IconChevronDown size={16} class="shrink-0" />
								</a>
								<!-- <p>{session.user.id}</p> -->
							{:else}
								<div class="flex flex-col gap-2">
									<Button>Login</Button>
									<Button variant="outline">Register</Button>
								</div>
							{/if}
						</div>
					</div>
				</Sheet.Description>
			</Sheet.Header>
		</Sheet.Content>
	</Sheet.Root>
</nav>
