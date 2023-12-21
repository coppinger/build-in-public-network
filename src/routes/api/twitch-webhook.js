import { json } from '@sveltejs/kit';

export const GET = async (event) => {
	const options = {
		status: 418,
		headers: {
			X: 'Gon give it to ya'
		}
	};

	return new Response('Hello', options);
};

export async function POST(event) {
	const {
		locals: { supabase }
	} = event;

	const data = await event.request.formData();
	const email = data.get('email');

	// subscribe the user to the newsletter
	console.log(email);

	// return success
	return new Response(JSON.stringify({ success: true }), {
		headers: {
			'Content-Type': 'application/json',
			'Twitch-Eventsub-Message-Id': 'blah',
			'Twitch-Eventsub-Message-Retry': 'blah',
			'Twitch-Eventsub-Message-Type': 'blah',
			'Twitch-Eventsub-Message-Signature': 'blah',
			'Twitch-Eventsub-Message-Timestamp': 'blah',
			'Twitch-Eventsub-Subscription-Type': 'blah',
			'Twitch-Eventsub-Subscription-Version': 'blah'
		}
	});

	// it's common to return JSON, so SvelteKit has a helper
	return json({ success: true });
}
