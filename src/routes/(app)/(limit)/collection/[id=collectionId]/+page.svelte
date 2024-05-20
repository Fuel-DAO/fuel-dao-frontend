<script lang="ts">
	import InvestComplete from '$lib/components/popup/InvestComplete.svelte';
	import type { PageData } from './$types';
	import InvestInfo from './InvestInfo.svelte';
	import CollectionHeader from './CollectionHeader.svelte';
	import placeholder from '$lib/assets/placeholder.png';
	import { getCollectionId } from './collectionId.context';

	export let data: PageData;

	let showInvestPopup = false;

	const { minterCanId } = getCollectionId();

	$: metadata = data.metadata;
	$: _images = metadata.images
		? metadata.images
		: ['https://source.unsplash.com/random/?car', 'https://source.unsplash.com/random/?car'];
	$: images = (_images || []).reduce((acc, _c, i, v) => {
		if (i % 2 === 0) acc.push(v.slice(i, i + 2));
		return acc;
	}, []);
</script>

<div class="w-full flex flex-col items-center gap-4 pb-8">
	<div class="flex flex-col lg:flex-row gap-2 lg:h-[40rem] w-full overflow-hidden overflow-x-auto">
		<img alt="House" src={_images[0]} class="rounded-xl lg:h-[37rem] lg:grow object-cover" />

		{#each images as [im1, im2]}
			<div class="flex basis-[25%] shrink-0 flex-col gap-2 lg:h-[37rem]">
				<img alt="House" src={im1 || placeholder} class="rounded-xl h-[18.25rem] object-cover" />
				{#if im2}
					<img alt="House" src={im2 || placeholder} class="rounded-xl h-[18.25rem] object-cover" />
				{/if}
			</div>
		{/each}
	</div>
	<div class="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
		<CollectionHeader {metadata} />
		<InvestInfo
			{metadata}
			on:click={() => {
				showInvestPopup = true;
			}}
		/>
	</div>
</div>

{#if showInvestPopup}
	<InvestComplete bind:show={showInvestPopup} />
{/if}
