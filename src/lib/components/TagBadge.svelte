<script lang="ts">
	import { cn } from '$lib/utils';
	export let type: string;

	let color = 'blue';

	// switch (type) {
	// 	case 'business-model':
	// 		color;
	// 		break;

	// 	default:
	// 		break;
	// }
</script>

<a
	href={`/tags/${type}`}
	class={cn(`text-xs font-semibold p-1.5 bg-${color}-200 text-${color}-700 rounded`)}>{type}</a
>
