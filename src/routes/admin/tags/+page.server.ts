import { supabase } from '$lib/index';

export async function load({ locals: { getSession } }) {
	const { data } = await supabase.from('tags').select();

	return {
		table: data ?? [],
		session: await getSession()
	};
}
