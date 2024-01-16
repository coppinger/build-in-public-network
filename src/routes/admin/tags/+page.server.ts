import { supabase } from '$lib/index';
import slugify from 'slugify';
import { message, superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

import type { Actions, PageServerLoad } from './$types';

const schema = z.object({
	title: z.string(),
	description: z.string(),
	type: z.string()
});

type TagTypes = {
	value: string;
	label: string;
}[];

const tagEnums: TagTypes = [
	{
		value: 'business-model',
		label: 'Business Model'
	},
	{
		value: 'product-type',
		label: 'Product Type'
	},
	{
		value: 'other',
		label: 'Other'
	}
];

async function loadTags() {
	const { data } = await supabase.from('tags').select('*').order('id', { ascending: true });
	return data;
}

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	// Server API:
	const form = await superValidate(schema);

	// Always return { form } in load and form actions.
	return {
		form,
		tags: (await loadTags()) ?? [],
		session: await getSession(),
		tagEnums,
		boop: ['1', '2']
	};
};

export const actions: Actions = {
	create: async ({ request }) => {
		// Use superValidate in form actions too, but with the request
		const form = await superValidate(request, schema);
		console.log(form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		const { data: tagData, error: tagError } = await supabase
			.from('tags')
			.select()
			.eq('title', form.data.title)
			.single();

		if (tagError && tagError.code != 'PGRST116') {
			return fail(500, { form, message: 'Error from Supabase' });
		}

		// The request works, and thus the email already exists

		if (!tagError) {
			return message(form, 'That tag already exists');
		}

		const { error } = await supabase.from('tags').insert({
			title: form.data.title,
			description: form.data.description,
			type: form.data.type,
			slug: slugify(form.data.title, { lower: true })
		});

		if (error) {
			return console.log(error);
		}

		return message(form, 'Tag submitted!');
	},
	toggle: async ({ request }) => {
		const formData = await request.formData();
		const currentStatus = formData.get('currentStatus');
		const currentId = formData.get('currentId');
		console.log('currentStatus:', currentStatus);
		console.log('currentId:', currentId);

		const { data, error } = await supabase
			.from('tags')
			.update({ enabled: currentStatus })
			.eq('id', currentId);

		if (error) {
			console.log(error);
		}
		console.log(data)
	}
};
