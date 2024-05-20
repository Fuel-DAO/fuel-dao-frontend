<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import FormHeader, { type SelectedTab } from '$lib/components/data-forms/FormHeader.svelte';
	import BasicInfo, { type BasicInfoData } from '$lib/components/data-forms/BasicInfo.svelte';
	import { provisionCanisterV2 } from '$lib/backend';
	import { slide } from 'svelte/transition';
	import { replacer } from '$lib/utils/json';
	import ImagesInfo from '$lib/components/data-forms/ImagesInfo.svelte';
	import { getNewCollectionFormData } from '$lib/components/data-forms/form.utils';
	import type { CollectionInfoData } from '$lib/components/data-forms/CollectionInfo.svelte';
	import CollectionInfo from '$lib/components/data-forms/CollectionInfo.svelte';

	let selectedTab: SelectedTab = 'basic';
	let loading = false;
	let res: any;

	let basicInfoData: BasicInfoData;
	let collectionInfoData: CollectionInfoData;
	let collectionImages: string[] = [];

	async function submitForm() {
		if (loading) return;
		try {
			loading = true;
			const actor = provisionCanisterV2();
			res = await actor.add_collection_request(
				getNewCollectionFormData(basicInfoData, collectionInfoData)
			);
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex flex-col gap-12 pb-16">
	{#if res}
		<pre transition:slide class="text-sm p-4 mt-8 bg-gray-100 rounded-xl">{JSON.stringify(
				res,
				replacer,
				4
			)}</pre>

		<Button href="/admin/manage/list">Approve/Deny on admin panel</Button>
	{:else}
		<FormHeader
			title="New Collection"
			bind:selected={selectedTab}
			on:cancel={() => history.back()}
			on:save={() => submitForm()}
			{loading}
		>
			<svelte:fragment slot="subtitle">
				<div class="text-sm text-gray-500">Submit data to create a new collection.</div>
				<div class="text-sm text-gray-400">
					Submitted form will be approved by an admin for listing.
				</div>
			</svelte:fragment>
			<svelte:fragment>
				{#if selectedTab === 'basic'}
					<BasicInfo {loading} bind:data={basicInfoData} />
				{:else if selectedTab === 'info'}
					<CollectionInfo {loading} bind:data={collectionInfoData} />
				{:else if selectedTab === 'images'}
					<ImagesInfo bind:images={collectionImages} />
				{/if}
			</svelte:fragment>
		</FormHeader>
	{/if}
</div>
