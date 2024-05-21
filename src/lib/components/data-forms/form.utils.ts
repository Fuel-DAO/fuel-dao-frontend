import type { _SERVICE as PROVISION_SERVICE } from '$lib/declarations/provision/provision.did';
import type { _SERVICE as TOKEN_SERVICE } from '$lib/declarations/token/token.did';
import { fromE8s, toE8s } from '$lib/utils/icp';
import { Principal } from '@dfinity/principal';
import type { BasicInfoData } from './BasicInfo.svelte';
import type { CollectionInfoData } from './CollectionInfo.svelte';
import type { CollectionMetadata } from '$lib/types/nftCanister';
import type { ImagesInfoData } from './ImagesInfo.svelte';
import { isPrincipal } from '$lib/utils/isPrincipal';

export function getNewCollectionFormData(
	basicInfoData: BasicInfoData,
	collectionInfoData: CollectionInfoData,
	imagesInfoData: ImagesInfoData,
	documents: CollectionMetadata['documents']
): Parameters<PROVISION_SERVICE['add_collection_request']>[0] {
	return {
		name: basicInfoData.name,
		description: basicInfoData.description,
		supply_cap: BigInt(basicInfoData.supplyCap),
		logo: imagesInfoData.logo,
		price: BigInt(toE8s(basicInfoData.price)),
		token: Principal.from(process.env.ICP_LEDGER_CANISTER_ID),
		symbol: basicInfoData.symbol,
		treasury: Principal.from(basicInfoData.treasury),
		documents,
		images: imagesInfoData.images,
		purchase_price: BigInt(collectionInfoData.purchase_price),
		weight: collectionInfoData.weight,
		drive_type: collectionInfoData.drive_type,
		displays: collectionInfoData.displays,
		seating: collectionInfoData.seating,
		cargo: collectionInfoData.cargo,
		overall_height: collectionInfoData.overall_height,
		overall_width: collectionInfoData.overall_width,
		track_front: collectionInfoData.track_front,
		ground_clearance: collectionInfoData.ground_clearance,
		key_features: collectionInfoData.key_features.split(',').map((feature) => feature.trim()),
		range_per_charge: collectionInfoData.range_per_charge,
		track_rear: collectionInfoData.track_rear,
		acceleration: collectionInfoData.acceleration,
		charging_speed: collectionInfoData.charging_speed,
		wheels: collectionInfoData.wheels,
		brochure_url: collectionInfoData.brochure_url,
		battery: collectionInfoData.battery,
		overall_length: collectionInfoData.overall_length
	};
}

export function getUpdateCollectionFormData(
	basicInfoData: BasicInfoData,
	collectionInfoData: CollectionInfoData,
	imagesInfoData: ImagesInfoData,
	documents: CollectionMetadata['documents'],
	assetCanisterId: Principal,
	collectionMetadata: CollectionMetadata
): Parameters<TOKEN_SERVICE['update_metadata']> {
	return [
		{
			asset_canister: [assetCanisterId],
			name: [basicInfoData.name],
			description: [basicInfoData.description],
			supply_cap: [BigInt(basicInfoData.supplyCap)],
			logo: [imagesInfoData.logo],
			price: [BigInt(toE8s(basicInfoData.price))],
			token: [collectionMetadata.token],
			symbol: [basicInfoData.symbol],
			treasury: [collectionMetadata.treasury],
			documents: [documents],
			images: [imagesInfoData.images],
			purchase_price: [BigInt(collectionInfoData.purchase_price) || BigInt(0)],
			weight: [collectionInfoData.weight || 0],
			drive_type: [collectionInfoData.drive_type || ''],
			displays: [collectionInfoData.displays || ''],
			seating: [collectionInfoData.seating || ''],
			cargo: [collectionInfoData.cargo || 0],
			overall_height: [collectionInfoData.overall_height || 0],
			overall_width: [collectionInfoData.overall_width || 0],
			track_front: [collectionInfoData.track_front || 0],
			ground_clearance: [collectionInfoData.ground_clearance || 0],
			key_features: [
				collectionInfoData.key_features.split(',').map((feature) => feature.trim()) || 0
			],
			range_per_charge: [collectionInfoData.range_per_charge || 0],
			track_rear: [collectionInfoData.track_rear || 0],
			acceleration: [collectionInfoData.acceleration || ''],
			charging_speed: [collectionInfoData.charging_speed || ''],
			wheels: [collectionInfoData.wheels || 0],
			brochure_url: [collectionInfoData.brochure_url || ''],
			battery: [collectionInfoData.battery || ''],
			overall_length: [collectionInfoData.overall_length || 0]
		}
	];
}

export function getInitialUpdateCollectionFormData(data: CollectionMetadata) {
	return {
		basicInfoData: {
			name: data.name,
			symbol: data.symbol,
			description: data.description,
			treasury: data.treasury && isPrincipal(data.treasury) ? data.treasury.toText() : '',
			price: Number(fromE8s(data.price)),
			supplyCap: Number(data.supply_cap)
			// status: 'Live'
		} satisfies BasicInfoData,
		imagesInfoData: {
			logo: data.logo,
			images: data.images
		} satisfies ImagesInfoData,
		documents: data.documents,
		collectionInfoData: {
			purchase_price: Number(data.purchase_price) || 0,
			weight: data.weight || 0,
			drive_type: data.drive_type || '',
			displays: data.displays || '',
			seating: data.seating || '',
			cargo: data.cargo || 0,
			overall_height: data.overall_height || 0,
			overall_width: data.overall_width || 0,
			track_front: data.track_front || 0,
			ground_clearance: data.ground_clearance || 0,
			key_features: data.key_features.join(', ') || '',
			range_per_charge: data.range_per_charge || 0,
			track_rear: data.track_rear || 0,
			acceleration: data.acceleration || '',
			charging_speed: data.charging_speed || '',
			wheels: data.wheels || 0,
			brochure_url: data.brochure_url || '',
			battery: data.battery || '',
			overall_length: data.overall_length || 0
		} satisfies CollectionInfoData
	};
}
