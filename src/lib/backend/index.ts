import { HttpAgent, type ActorSubclass, type HttpAgentOptions } from '@dfinity/agent';
import { authHelper } from '$lib/stores/auth';
import { get } from 'svelte/store';
import { AssetManager } from '@dfinity/assets';
//v2
import { createActor as createNftCanisterAction } from '../declarations/token';
import type { _SERVICE as TOKEN_SERVICE } from '../declarations/token/token.did';
import {
	createActor as createProvisionCanisterActor,
	canisterId as provisionCanId
} from '../declarations/provision';
import type { _SERVICE as PROVISION_CAN_SERVICE } from '../declarations/provision/provision.did';

export const host =
	import.meta.env.NODE_ENV === 'dev'
		? `http://localhost:${import.meta.env.DFX_PORT}`
		: 'https://ic0.app';

export type UnionKeyOf<U> = U extends U ? keyof U : never;

export const ASSET_PROXY_CANISTER_ID = process.env.CANISTER_ID_ASSET_PROXY;
export const ASSET_CANISTER_ID = process.env.CANISTER_ID_ASSET;

export function assetPath(canisterId: string, imagePath: string) {
	return `https://${canisterId}.icp0.io${imagePath}`;
}

export const PROXY_ASSET_HOST = ``;

const agentOptions = (_fetch?: typeof fetch): HttpAgentOptions => {
	const authHelperData = get(authHelper);
	return {
		host,
		fetch: _fetch,
		verifyQuerySignatures: false,
		identity: authHelperData?.identity
	};
};

export function assetManager(canisterId: string, options?: { fetch?: typeof fetch }) {
	const agent = new HttpAgent(agentOptions(options?.fetch));
	return new AssetManager({
		canisterId,
		agent
	});
}

export function nftCanister(
	canisterId: string,
	options?: { fetch?: typeof fetch }
): ActorSubclass<TOKEN_SERVICE> {
	return createNftCanisterAction(canisterId, {
		agentOptions: agentOptions(options?.fetch)
	}) as ActorSubclass<TOKEN_SERVICE>;
}

export function provisionCanister(options?: {
	fetch?: typeof fetch;
}): ActorSubclass<PROVISION_CAN_SERVICE> {
	return createProvisionCanisterActor(provisionCanId, {
		agentOptions: agentOptions(options?.fetch)
	}) as ActorSubclass<PROVISION_CAN_SERVICE>;
}
