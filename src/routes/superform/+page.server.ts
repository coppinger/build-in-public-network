import { supabase } from '$lib/index';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

import type { Actions, PageServerLoad } from './$types';

const schema = z.object({
	name: z.string().default('Hello world!'),
	email: z.string().email()
});

export const load: PageServerLoad = async () => {
	// Server API:
	const form = await superValidate(schema);

	// Always return { form } in load and form actions.
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		// Use superValidate in form actions too, but with the request
		const form = await superValidate(request, schema);
		console.log('POST', form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		// TODO: Do something with the validated data
		console.log(form.data.name);

		const { data: emailData, error: emailError } = await supabase
			.from('test')
			.select()
			.eq('email', form.data.email)
			.single();

		if (!emailError) {
			return fail(500, { form, message: 'The server shit the bed' });
		}

		console.log(emailData);
		console.log(emailError);

		const { error } = await supabase
			.from('test')
			.insert({ profile_name: form.data.name, email: form.data.email });

		// Yep, return { form } here too
		return { form };
	}
};
