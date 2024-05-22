<script lang="ts">
	import InvestPopup from '$lib/components/popup/InvestPopup.svelte';
	import type { PageData } from './$types';
	import InvestInfo from './InvestInfo.svelte';
	import CollectionHeader from './CollectionHeader.svelte';
	import placeholder from '$lib/assets/placeholder.png';
	import { getCollectionId } from './collectionId.context';
	import { assetPath } from '$lib/backend';
	import { adminStore } from '$lib/stores/admin';
	import InvestInfoAdmin from './InvestInfoAdmin.svelte';

	export let data: PageData;

	const { minterCanId, assetCanId } = getCollectionId();
	const { metadata, bookedTokens, status: _status } = data;

	const status = Object.keys(_status)[0] as 'Live' | 'Rejected' | 'Accepted';

	let showInvestPopup = false;

	$: _images = metadata?.images?.length ? metadata.images : [placeholder, placeholder];
	$: images = (_images || []).reduce((acc, _c, i, v) => {
		if (i === 0) return acc;
		if (i % 2 !== 0) acc.push(v.slice(i, i + 2));
		return acc;
	}, []);
</script>

<div class="w-full flex flex-col items-center gap-4 pb-8">
	<div
		class="flex flex-col lg:flex-row gap-2 lg:h-[40rem] w-full overflow-hidden overflow-x-auto relative"
	>
		{#if metadata.logo}
			<div
				class="absolute h-16 lg:h-28 top-4 shadow-md z-[2] left-4 w-16 lg:w-28 rounded-full overflow-hidden"
			>
				<img
					alt="Collection logo"
					class="h-full w-full object-cover object-center"
					src={metadata.logo}
				/>
			</div>
		{/if}
		<img
			alt="Collection"
			src={_images[0] ? assetPath(assetCanId, _images[0]) : placeholder}
			class="rounded-xl lg:h-full lg:grow object-cover"
		/>

		{#each images as [im1, im2], i}
			<div class="flex basis-[25rem] shrink-0 flex-col gap-2 lg:h-full">
				<img
					alt="Collection preview {i}"
					src={im1 ? assetPath(assetCanId, im1) : placeholder}
					class="rounded-xl h-1/2 object-cover"
				/>
				{#if im2}
					<img
						alt="Collection preview {i}"
						src={assetPath(assetCanId, im2)}
						class="rounded-xl h-1/2 object-cover"
					/>
				{/if}
			</div>
		{/each}
	</div>
	<div class="flex flex-col lg:flex-row gap-8 pt-6 w-full max-w-6xl">
		<CollectionHeader {metadata} {status} />
		<div class="flex flex-col gap-8">
			<InvestInfo
				{metadata}
				{bookedTokens}
				{status}
				on:click={() => {
					showInvestPopup = true;
				}}
			/>
			{#if $adminStore.isLoggedIn && status === 'Live'}
				<InvestInfoAdmin {metadata} {bookedTokens} />
			{/if}
		</div>
	</div>
</div>

{#if showInvestPopup}
	<InvestPopup bind:show={showInvestPopup} {minterCanId} />
{/if}
