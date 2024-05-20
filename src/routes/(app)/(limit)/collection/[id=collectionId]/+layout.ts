import type { LayoutData } from './$types';

export const load: LayoutData = async ({ params: { id } }) => {
	const _id = id.split('@') || '';

	return {
		minterCanId: _id[0] as string,
		assetCanId: _id[1] as string
	};
};
