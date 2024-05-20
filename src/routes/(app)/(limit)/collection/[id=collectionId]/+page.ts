import { nftCanister } from '$lib/backend';
import type { CollectionMetadata } from '$lib/types/nftCanister';
import type { PageData } from './$types';

export const load: PageData = async ({ params: { id } }) => {
	const _id = id.split('@') || '';
	const minterCanId = _id[0] as string;

	const res = (await nftCanister(minterCanId, {
		fetch
	}).get_metadata()) as CollectionMetadata;

	return {
		metadata: res
	};
};
