<script lang="ts">
	// Types
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { PageData } from './$types';

	// Libraries
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	// Page data
	export let data: PageData;
	let { tags } = data;
	const { tagEnums } = data;

	// Components
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';

	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';

	import { Textarea } from '$lib/components/ui/textarea';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import DataTable from './data-table.svelte';

	const { form, errors, constraints, enhance, message } = superForm(data.form, {
		onUpdated({ form }) {
			if (form.valid) {
				// Successful post! Do some more client-side stuff,
				// like showing a toast notification.
				toast(form.message, { icon: '✅' });
				tags = [...tags, { title: form.data.title }];
			} else {
				toast.error(form.message, { icon: '❌' });
			}
		}
	});

	let open = false;
	let value = '';

	$: selectedValue = tagEnums.find((f) => f.value === value)?.label ?? 'Select a tag type...';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<!-- <SuperDebug data={$form} /> -->

<!-- Useful for testing messages -->
<!--
    <div class="p-4 border-gray-300 border">
	{#if $message}
		<div class="message">{$message}</div>
	{:else}
		<div class="message"><p>No message!</p></div>
	{/if}
</div> -->
<div class="flex flex-col gap-16">
	<h1 class="">Admin -> Tags</h1>
	<div class="flex gap-16 max-w-screen-md w-full">
		<div
			class="flex justify-center w-full min-w-96 border bg-neutral-50 border-neutral-200 rounded-2xl p-8 h-fit"
		>
			<form method="POST" use:enhance class="flex flex-col gap-8 w-full justify-center">
				<div class="flex flex-col gap-2">
					<Label for="email-2">Title</Label>
					<Input
						type="text"
						id="title"
						name="title"
						placeholder="Naughty"
						bind:value={$form.title}
						{...$constraints.title}
					/>
					<p class="text-sm text-muted-foreground">The title for the new tag.</p>
					{#if $errors.title}<span class="text-red-500">{$errors.title}</span>{/if}
				</div>
				<div class="flex flex-col gap-2">
					<Label for="email-2">Description</Label>
					<Textarea
						id="description"
						name="description"
						placeholder="For projects that are very naughty."
						bind:value={$form.description}
						{...$constraints.description}
					/>
					<p class="text-sm text-muted-foreground">The description of the new tag.</p>
					{#if $errors.description}<span class="text-red-500">{$errors.description}</span>{/if}
				</div>
				<div class="">
					<Popover.Root bind:open let:ids>
						<Popover.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								variant="outline"
								role="combobox"
								aria-expanded={open}
								class="w-[200px] justify-between"
							>
								{selectedValue}
								<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</Popover.Trigger>
						<Popover.Content class="w-[200px] p-0">
							<Command.Root>
								<Command.Input placeholder="Search tag types..." />
								<Command.Empty>No tag type found.</Command.Empty>
								<Command.Group>
									{#each tagEnums as tagType}
										<Command.Item
											value={tagType.value}
											onSelect={(currentValue) => {
												value = currentValue;
												$form.type = value;
												closeAndFocusTrigger(ids.trigger);
											}}
										>
											<Check
												class={cn('mr-2 h-4 w-4', value !== tagType.value && 'text-transparent')}
											/>
											{tagType.label}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>
					<Input
						class="hidden"
						aria-hidden
						type="text"
						id="type"
						name="type"
						bind:value={$form.type}
						{...$constraints.type}
					/>
				</div>
				<div>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</div>
		<div class="flex flex-col w-full">
			<p class="font-bold">Current tags:</p>

			<ul class="list-disc list-inside">
				{#each tags as tag}
					<li>{tag.title}</li>
				{/each}
			</ul>
			<div class="container mx-auto py-10">
				<DataTable />
			</div>
		</div>
	</div>
</div>
