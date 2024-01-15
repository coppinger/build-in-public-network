<script>
	import toast, { Toaster } from 'svelte-french-toast';
	import '../app.pcss';
</script>

<Toaster />
<div
	class="min-w-screen dark flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-[#00ff00]"
>
	<slot />
</div>
