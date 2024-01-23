<script lang="ts">
	import type { PageData } from './$types';

	import { mediaQuery } from 'svelte-legos';

	import '@fontsource-variable/manrope';
	import toast, { Toaster } from 'svelte-french-toast';
	import '../app.pcss';
	import Header from '$lib/components/Header.svelte';
	import MobileNav from '$lib/components/MobileNav.svelte';

	export let data: PageData;
	let { session } = data;
	let { supabase } = data;
	$: ({ supabase } = data);
</script>

<Toaster />

<div class="min-w-screen flex min-h-screen flex-col items-center gap-4 w-full text-neutral-800">
	<Header {session} />
	<main class="px-6 py-12">
		<slot />
	</main>
	<div class="block lg:hidden">
		<MobileNav {session} />
	</div>
</div>
