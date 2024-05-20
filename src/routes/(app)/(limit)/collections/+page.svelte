<script lang="ts">
	import Card from '$lib/components/card/Card.svelte';
	import Dropdown from '$lib/components/dropdown/Dropdown.svelte';
	import LocationIcon from '$lib/components/icons/LocationIcon.svelte';
	import SortIcon from '$lib/components/icons/SortIcon.svelte';
	import TabsGroup from '$lib/components/tabs-group/TabsGroup.svelte';
	import { nftCanister, provisionCanisterV2 } from '$lib/backend';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import { onMount } from 'svelte';
	import type { CollectionMetadata } from '$lib/types/nftCanister';

	type CollectionId = {
		assetCanId: string;
		minterCanId: string;
	};

	type CollectionDetails = CollectionMetadata & {
		id: CollectionId;
	};

	let loading = true;
	let nfts: CollectionDetails[] = [];

	async function fetchNftDetail(id: CollectionId): Promise<CollectionDetails | undefined> {
		try {
			const r = await nftCanister(id.minterCanId).get_metadata();
			return {
				...r,
				id,
				sample: false
			} as CollectionDetails;
		} catch (e) {
			return undefined;
		}
	}

	async function populatePosts(collections: CollectionId[]) {
		return (await Promise.all(collections.map((id) => fetchNftDetail(id)))).filter(
			Boolean
		) as CollectionDetails[];
	}

	async function fetchCollections() {
		try {
			const actor = provisionCanisterV2();
			const all = await actor.list_collections();

			const res = await populatePosts(
				all.map((o) => ({
					assetCanId: o.asset_canister.toText(),
					minterCanId: o.token_canister.toText()
				}))
			);
			nfts = res;
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}

	onMount(fetchCollections);
</script>

<div class="py-4 sticky top-20 z-40">
	<div
		class="rounded-xl p-4 bg-white/75 flex gap-4 z-[2] justify-between shadow-sm backdrop-blur-xl border-[1px] border-gray-50"
	>
		<TabsGroup defaultValue="Status" selected="all" />
		<div class="flex flex-col lg:flex-row items-end lg:items-center gap-4">
			<Dropdown
				title="Location"
				options={[
					{ value: 'texas', label: 'Texas' },
					{ value: 'winnipeg', label: 'Winnipeg' },
					{ value: 'new york', label: 'New York' },
					{ value: 'california', label: 'California' },
					{ value: 'florida', label: 'Florida' },
					{ value: 'colorado', label: 'Colorado' }
				]}
			>
				<LocationIcon slot="leading" />
			</Dropdown>

			<Dropdown
				title="Sort"
				options={[
					{ value: 'new', label: 'New' },
					{ value: 'popularity', label: 'Popularity' },
					{ value: 'price-lth', label: 'Price: Low to High' },
					{ value: 'price-htl', label: 'Price: High to Low' }
				]}
			>
				<SortIcon slot="leading" />
			</Dropdown>
		</div>
	</div>
</div>

{#if loading}
	<div class="h-full w-full flex items-center justify-center">
		<PlusIcon class="animate-spin w-10 h-10" />
	</div>
{:else}
	<div class="flex py-12 items-center gap-8 justify-normal mx-auto flex-wrap">
		{#each nfts as nft, i}
			<Card
				status="Live"
				href={`/collection/${nft.id.minterCanId}@${nft.id.assetCanId}`}
				title={nft.name}
				desc={nft.description}
				imgSrc={`https://source.unsplash.com/random/?car`}
			/>
		{/each}
	</div>
{/if}
