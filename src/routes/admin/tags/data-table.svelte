<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';

	// Components
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDown } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import DataTableRadio from './data-table-radio.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';

	// Store
	import { tagsStore } from '$lib/stores/tagsStore';

	export let tags;

	type Tags = {
		id: number;
		title: string;
		slug: string;
		type: 'business-model' | 'product-type' | 'other';
		enabled: boolean;
	};

	const table = createTable(tagsStore, {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'ID',
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'title',
			header: 'Title'
		}),
		table.column({
			accessor: 'slug',
			header: 'Slug'
		}),
		table.column({
			accessor: 'type',
			header: 'Type'
		}),
		table.column({
			accessor: 'enabled',
			header: 'Enabled',

			cell: ({ value, row }) => {
				return createRender(DataTableRadio, {
					enabled: value,
					id: row.cellForId.id.value
				});
			}
		})
	]);
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
</script>

<div class="flex flex-col gap-4 w-full">
	<div class="flex items-center">
		<Input
			class="max-w-sm bg-neutral-50"
			placeholder="Filter emails..."
			type="text"
			bind:value={$filterValue}
		/>
	</div>
	<div class="rounded-md border bg-neutral-50 w-full">
		<Table.Root {...$tableAttrs}>
			<Table.Header class="w-full">
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row class="w-full">
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										{#if cell.id === 'amount'}
											<div class="text-right">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'email'}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown class={'ml-2 h-4 w-4'} />
											</Button>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<pre>{cell.value}</pre>
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										{#if cell.id === 'amount'}
											<div class="text-right font-medium font-black">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'type'}
											<div class="capitalize font-bold">
												<!-- <Render of={cell.render()} /> -->
												<TagBadge type={cell.value} />
												<p>{cell.value}</p>
											</div>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
