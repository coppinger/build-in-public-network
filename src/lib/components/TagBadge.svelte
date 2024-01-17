<script lang="ts">
	import { cn } from '$lib/utils';
	export let type: string;
	export let tabIndex: boolean = false;

	let color: string;
	let text: string;

	$: if (type === 'business-model') {
		color = 'blue';
		text = 'Model';
	} else if (type === 'product-type') {
		color = 'teal';
		text = 'Product';
	} else {
		color = 'purple';
		text = 'Other';
	}

	// To do, change from switch to if/else
</script>

<a
	href={`/tags/${type}`}
	tabindex={tabIndex}
	class={cn(`text-xs w-fit font-semibold p-1.5 bg-${color}-200 text-${color}-700 rounded`)}
	>{text}</a
>
