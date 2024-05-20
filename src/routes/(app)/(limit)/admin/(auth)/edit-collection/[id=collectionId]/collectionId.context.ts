import { setContext, getContext } from 'svelte';

const key = 'COLLECTION_ID';

export const setCollectionId = (assetCanId: string, minterCanId: string) =>
	setContext(key, {
		id: `${minterCanId}@${assetCanId}`,
		assetCanId,
		minterCanId
	});

// access the value inside a child component
export const getCollectionId = () => getContext<ReturnType<typeof setCollectionId>>(key) || {};
