import { nftCanister } from '$lib/backend';
import type { CollectionMetadata } from '$lib/types/nftCanister';
import type { PageData } from './$types';

export const load: PageData = async ({ params: { id } }) => {
	const _id = id.split('@') || '';
	const minterCanId = _id[0] as string;

	const actor = nftCanister(minterCanId, { fetch });

	const res = await Promise.all([
		actor.get_metadata(),
		actor.get_total_booked_tokens(),
		actor.get_sale_status()
	]);

	return {
		metadata: res[0] as CollectionMetadata,
		bookedTokens: Number(res[1]),
		status: res[2]
	};
};
