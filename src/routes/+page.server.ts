import { supabase } from '$lib/index';

export async function load({ locals: { getSession } }) {
	const { data, error } = await supabase
		.from('profiles')
		.select('*, profiles_tags ( tag_id, tags ( title, slug, type  ) )');

	console.log(data[0].profiles_tags);
	// console.log(error);

	return {
		profiles: data ?? [],
		session: await getSession()
	};
}

export const actions = {
	test: async () => {}
};
