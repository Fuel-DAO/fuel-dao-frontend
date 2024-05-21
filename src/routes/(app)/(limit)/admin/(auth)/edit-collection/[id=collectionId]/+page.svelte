<script lang="ts">
	import FormHeader, { type SelectedTab } from '$lib/components/data-forms/FormHeader.svelte';
	import BasicInfo, { type BasicInfoData } from '$lib/components/data-forms/BasicInfo.svelte';
	import { setCollectionId } from './collectionId.context';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import { replacer } from '$lib/utils/json';
	import type { CollectionMetadata } from '$lib/types/nftCanister';
	import { nftCanister } from '$lib/backend';
	import ImagesInfo, { type ImagesInfoData } from '$lib/components/data-forms/ImagesInfo.svelte';
	import {
		getUpdateCollectionFormData,
		getInitialUpdateCollectionFormData
	} from '$lib/components/data-forms/form.utils';
	import { Principal } from '@dfinity/principal';
	import { authState } from '$lib/stores/auth';
	import Button from '$lib/components/button/Button.svelte';
	import type { CollectionInfoData } from '$lib/components/data-forms/CollectionInfo.svelte';
	import CollectionInfo from '$lib/components/data-forms/CollectionInfo.svelte';
	import DocumentsInfo from '$lib/components/data-forms/DocumentsInfo.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';

	export let data: PageData;

	const { minterCanId, assetCanId } = data;
	$: setCollectionId(minterCanId, assetCanId);

	let selectedTab: SelectedTab = 'basic';
	let loading = false;
	let showData = false;
	let unauthorized = false;
	let collectionMetadata: CollectionMetadata;

	let basicInfoData: BasicInfoData;
	let collectionInfoData: CollectionInfoData;
	let imagesInfoData: ImagesInfoData;
	let documents: CollectionMetadata['documents'] = [];

	async function editData() {
		if (loading) return;
		try {
			loading = true;
			const actor = nftCanister(minterCanId);
			await actor.update_metadata(
				getUpdateCollectionFormData(
					basicInfoData,
					collectionInfoData,
					imagesInfoData,
					documents,
					Principal.from(assetCanId),
					collectionMetadata
				)[0]
			);
		} finally {
			loading = false;
		}
	}

	async function fetchDetails() {
		loading = true;
		try {
			if (!$authState.isLoggedIn) return (unauthorized = true);
			const actor = nftCanister(minterCanId);
			collectionMetadata = await actor.get_metadata();
			if (collectionMetadata.collection_owner.toText() !== $authState.idString) {
				return (unauthorized = true);
			}
			const data = getInitialUpdateCollectionFormData(collectionMetadata);
			basicInfoData = data.basicInfoData;
			collectionInfoData = data.collectionInfoData;
			imagesInfoData = data.imagesInfoData;
			documents = data.documents;
		} catch (_) {
			console.error('Error updating metadata');
		} finally {
			loading = false;
		}
	}

	onMount(fetchDetails);
</script>

<div class="flex flex-col gap-12">
	{#if unauthorized}
		<div class="text-red-500">Unauthorized</div>
		<Button href="/collection/{minterCanId}@{assetCanId}">Go back</Button>
	{:else}
		<FormHeader
			title="Edit collection"
			bind:loading
			on:cancel={() => history.back()}
			on:save={() => editData()}
			bind:selected={selectedTab}
		>
			<svelte:fragment>
				{#if collectionMetadata}
					{#if selectedTab === 'basic'}
						<BasicInfo edit {loading} bind:data={basicInfoData} />
					{:else if selectedTab === 'info'}
						<CollectionInfo {loading} bind:data={collectionInfoData} />
					{:else if selectedTab === 'images'}
						<ImagesInfo
							bind:loading
							absoluteLogoPath
							bind:data={imagesInfoData}
							assetCanisterId={assetCanId}
							uploadCanisterId={assetCanId}
						/>
					{:else if selectedTab === 'documents'}
						<DocumentsInfo
							bind:loading
							bind:documents
							assetCanisterId={assetCanId}
							uploadCanisterId={assetCanId}
						/>
					{/if}
				{:else}
					<PlusIcon class="w-5 h-5 animate-spin" />
				{/if}
			</svelte:fragment>
		</FormHeader>
	{/if}
</div>

{#if !unauthorized && collectionMetadata}
	<button class="mt-8 text-xs font-mono" on:click={() => (showData = !showData)}>
		{showData ? '▼ Hide' : '▶︎ Show'} metadata JSON
	</button>
	{#if showData}
		<pre transition:slide class="text-sm p-4 mt-8 bg-gray-100 rounded-xl">
    {JSON.stringify(collectionMetadata, replacer, 4)}
  </pre>
	{/if}
{/if}
