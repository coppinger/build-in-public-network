<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import DataTableActions from './data-table-actions.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDown } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import DataTableRadio from './data-table-radio.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';

	type Tags = {
		id: number;
		title: string;
		slug: string;
		type: 'business-model' | 'product-type' | 'other';
		enabled: boolean;
	};

	export let tags: Tags[];

	type Payment = {
		id: string;
		amount: number;
		status: 'pending' | 'processing' | 'success' | 'failed';
		email: string;
	};

	const data: Payment[] = [
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'success',
			email: 'ken99@yahoo.com'
		},
		{
			id: 'm5gr84i9',
			amount: 214,
			status: 'processing',
			email: 'jimmy@yahoo.com'
		},
		{
			id: 'm5gr84i9',
			amount: 1337,
			status: 'pending',
			email: 'bob@yahoo.com'
		},
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'success',
			email: 'ken99@yahoo.com'
		},
		{
			id: 'm5gr84i9',
			amount: 214,
			status: 'processing',
			email: 'jimmy@yahoo.com'
		},
		{
			id: 'm5gr84i9',
			amount: 1337,
			status: 'pending',
			email: 'bob@yahoo.com'
		},
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'success',
			email: 'ken99@yahoo.com'
		},
		{
			id: 'm5gr84i9',
			amount: 214,
			status: 'processing',
			email: 'jimmy@yahoo.com'
		},
		{
			id: 'm5gr84i9',
			amount: 1337,
			status: 'pending',
			email: 'bob@yahoo.com'
		},
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'success',
			email: 'ken99@yahoo.com'
		},
		{
			id: 'm5gr84i9',
			amount: 214,
			status: 'processing',
			email: 'jimmy@yahoo.com'
		},
		{
			id: 'm5gr84i9',
			amount: 1337,
			status: 'pending',
			email: 'bob@yahoo.com'
		}
		//...
	];

	const table = createTable(readable(tags), {
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
			header: 'Type',
			cell: ({ value }) => {
				if (value) {
					return createRender(TagBadge, {
						type: value
					});
				} else {
					return 'null';
				}
			}
		}),
		table.column({
			accessor: 'enabled',
			header: 'Enabled',
			cell: ({ value, row }) => {
				return createRender(DataTableRadio, {
					enabled: value,
					id: row.cells[0].value
				});
			}
		})
	]);
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
</script>

<div class="flex flex-col gap-4">
	<div class="flex items-center">
		<Input
			class="max-w-sm bg-neutral-50"
			placeholder="Filter emails..."
			type="text"
			bind:value={$filterValue}
		/>
	</div>
	<div class="rounded-md border bg-neutral-50">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
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
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										{#if cell.id === 'amount'}
											<div class="text-right font-medium font-black">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'status'}
											<div class="capitalize font-bold">
												<Render of={cell.render()} />
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