<script>
	import '@fontsource-variable/manrope';
	import toast, { Toaster } from 'svelte-french-toast';
	import '../app.pcss';
</script>

<Toaster />
<div
	class="min-w-screen flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-100"
>
	<slot />
</div>
