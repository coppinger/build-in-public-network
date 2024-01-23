<script lang="ts">
	// Types
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { PageData, ActionData } from './$types';

	// Libraries
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	// Page data
	export let data: PageData;
	let { tags } = data;
	const { tagEnums } = data;

	// Store
	import { tagsStore } from '$lib/stores/tagsStore';

	tagsStore.set(tags);

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
	import TagBadge from '$lib/components/TagBadge.svelte';

	const { form, errors, constraints, enhance, message } = superForm(data.form, {
		onUpdated({ form }) {
			if (form.valid) {
				// Successful post! Do some more client-side stuff,
				// like showing a toast notification.
				toast(form.message.text, { icon: '✅' });

				// console.log('page.svelte', form.message);

				// console.log(form);

				tagsStore.update((tags) => [
					{
						title: form.data.title,
						id: form.message.newId,
						slug: form.message.slug,
						type: form.message.type
					},
					...tags
				]);

				console.log($tagsStore);
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
<div class="flex flex-col gap-8 max-w-screen-lg w-full">
	<h1 class="">Admin -> Tags</h1>
	<div class="flex gap-8 w-full basis-1/4 shrink-1 grow">
		<div
			class="flex justify-center w-full max-w-xs border bg-neutral-50 border-neutral-200 rounded-2xl p-8 h-fit shrink-0 shadow-2xl"
		>
			<form
				method="POST"
				action="?/create"
				use:enhance
				class="flex flex-col gap-8 w-full justify-center"
			>
				<div class="flex flex-col gap-2">
					<Label for="title">Title</Label>
					<Input
						class="bg-white"
						type="text"
						id="title"
						name="title"
						bind:value={$form.title}
						{...$constraints.title}
					/>
					<p class="text-sm text-muted-foreground">The title for the new tag.</p>
					{#if $errors.title}<span class="text-red-500">{$errors.title}</span>{/if}
				</div>
				<div class="flex flex-col gap-2">
					<Label for="description">Description</Label>
					<Textarea
						class="bg-white"
						id="description"
						name="description"
						bind:value={$form.description}
						{...$constraints.description}
					/>
					<p class="text-sm text-muted-foreground">The description of the new tag.</p>
					{#if $errors.description}<span class="text-red-500">{$errors.description}</span>{/if}
				</div>
				<div class="w-full">
					<div class="flex flex-col gap-2">
						<Label for="type">Types</Label>

						<Popover.Root bind:open let:ids>
							<Popover.Trigger asChild let:builder>
								<Button
									builders={[builder]}
									variant="outline"
									role="combobox"
									aria-expanded={open}
									class="w-full justify-between"
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
					</div>
					<div class="flex flex-col gap-2">
						<Input
							class="hidden"
							aria-hidden
							type="text"
							id="type"
							name="type"
							bind:value={$form.type}
							{...$constraints.type}
						/>
						<div class="flex flex-col gap-4 mt-4 border rounded-xl p-4 b-neutral-200">
							<div class="flex justify-between items-center">
								<TagBadge tabIndex={-1} type="business-model" />
								<p class="text-xs text-neutral-500">Business Model</p>
							</div>
							<div class="flex justify-between items-center">
								<TagBadge tabIndex={-1} type="product-type" />
								<p class="text-xs text-neutral-500">Product Type</p>
							</div>
							<div class="flex justify-between items-center">
								<TagBadge tabIndex={-1} type="other" />
								<p class="text-xs text-neutral-500">Other</p>
							</div>
						</div>
					</div>
				</div>
				<div>
					<Button type="submit" class="w-full">Submit</Button>
				</div>
			</form>
		</div>
		<div class="flex flex-col w-full basis-3/4 shrink-1 grow">
			<div class="w-full"><DataTable {tags} deleteForm={data.delteForm} /></div>
		</div>
	</div>
</div>
