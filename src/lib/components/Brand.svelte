<script lang="ts">
	export let short: boolean = false;
</script>

<a href="/" class="flex gap-3 items-center">
	<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M9.5 2V4H4.5V9H2.5V15H4.5V20H9.5V22H15.5V20H20.5V15H22.5V9H20.5V4H15.5V2H9.5ZM6.5 6H9.5V8H15.5V6H18.5V9H16.5V15H18.5V18H15.5V16H9.5V18H6.5V15H8.5V9H6.5V6Z"
			fill="#262626"
		/>
	</svg>
	<p class="text-xl font-black text-neutral-800 whitespace-nowrap">
		{short ? 'BIP Network' : 'Build in Public Network'}
	</p>
</a>
