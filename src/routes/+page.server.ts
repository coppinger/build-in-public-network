import { supabase } from '$lib/index';

export async function load({ locals: { getSession } }) {
	const { data } = await supabase.from('test').select();

	return {
		table: data ?? [],
		session: await getSession()
	};
}

export const actions = {
	test: async () => {}
};
