<script lang="ts">
	import { cn } from '$lib/utils';

	export let profile_tag;

	const { title } = profile_tag.tags;
	const { slug } = profile_tag.tags;
	const { type } = profile_tag.tags;

	let color: string;

	$: if (type === 'business-model') {
		color = 'blue';
	} else if (type === 'product-type') {
		color = 'teal';
	} else {
		color = 'purple';
	}
</script>

<a
	href={`/tags/${slug}`}
	class={cn(`text-xs w-fit font-semibold p-1.5 bg-${color}-200 text-${color}-700 rounded`)}
	>{title}</a
>
