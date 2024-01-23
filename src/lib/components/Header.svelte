<script lang="ts">
	import Brand from './Brand.svelte';

	import { navItems } from '$lib/nav-items';

	import { cn } from '$lib/utils';

	import { page } from '$app/stores';

	const url = $page.url;

	export let session: any;

	// Icons
	import {
		IconList,
		IconInfoSquareRounded,
		IconBrandDiscord,
		IconBrandTwitter,
		IconDropletDown,
		IconChevronDown
	} from '@tabler/icons-svelte';
	import Button from './ui/button/button.svelte';

	const iconComponents = {
		IconList,
		IconInfoSquareRounded,
		IconBrandDiscord,
		IconBrandTwitter
	};
</script>

<!-- {#if $isDesktop}
    <p>'Tis!</p>
{:else}
    <p>'Tisnt!'</p>
{/if} -->

<header class="bg-neutral-50 border-b border-neutral-300 shadow-sm py-8 w-full">
	<div
		class="max-w-screen-2xl w-full flex justify-center items-center lg:justify-between px-20 mx-auto"
	>
		<Brand />
		<nav class="hidden lg:flex items-center">
			<ul class="hidden lg:flex gap-20">
				{#each navItems as navItem}
					<li class="flex items-center gap-2">
						<a
							class={cn(
								'flex gap-2 font-semibold items-center ',
								url.pathname === navItem.path
									? 'text-neutral-800 font-black'
									: 'text-neutral-600 font-semibold'
							)}
							href={navItem.path}
						>
							<svelte:component this={iconComponents[navItem.icon]} class="w-5 h-5" />
							{navItem.title}</a
						>
						{#if navItem.subtitle}
							<p class="text-neutral-400 text-xs font-semibold">{navItem.subtitle}</p>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>
		<div class="hidden lg:flex gap-4 max-w-52">
			{#if !session}
				<a class="flex gap-2 font-semibold mx-auto items-center w-full" href="/profile">
					<div class="inline-block h-8 w-8 rounded-full shrink-0 overflow-hidden">
						<img src="/images/tim-pfp.png" width="32px" height="32px" alt="" />
					</div>
					<span
						class="whitespace-nowrap overflow-hidden overflow-ellipsis text-neutral-600 font-semibold"
					>
						Tim Wheeler</span
					>
					<IconChevronDown size={16} class="shrink-0" />
				</a>
				<!-- <p>{session.user.id}</p> -->
			{:else}
				<div class="flex gap-4">
					<Button>Login</Button>
					<Button variant="outline">Register</Button>
				</div>
			{/if}
		</div>
	</div>
</header>
