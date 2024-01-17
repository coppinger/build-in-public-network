<script lang="ts">
	import { cn } from '$lib/utils';
	export let type: string;

	let color = 'blue';

	// To do, change from switch to if/else

	switch (type) {
		case 'business-model':
			color = 'blue';
			text = 'Model';
			break;
		case 'product-type':
			color = 'teal';
			text = 'Product';
			break;
		case 'other':
			color = 'purple';
			text = 'Other';
			break;
	}
</script>

<a
	href={`/tags/${type}`}
	class={cn(`text-xs font-semibold p-1.5 bg-${color}-200 text-${color}-700 rounded`)}>{text}</a
>
