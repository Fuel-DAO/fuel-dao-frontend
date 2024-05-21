<script lang="ts">
	import InfoTitle from './InfoTitle.svelte';
	import type { CollectionMetadata } from '$lib/types/nftCanister';
	import { getCollectionId } from './collectionId.context';

	export let metadata: CollectionMetadata;

	const { assetCanId } = getCollectionId();

	function viewDoc(path: string) {
		const url = `https://${assetCanId}.icp0.io${path}`;
		const a = document.createElement('a');
		a.href = url;
		a.target = '_blank';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
</script>

<div class="flex flex-col gap-8 pt-4 pb-32">
	<div class="rounded-2xl shadow-lg py-4 flex flex-col gap-5">
		{#each metadata.documents as [name, path], i}
			<div
				class="flex items-center justify-between px-6 {i + 1 === metadata.documents.length
					? ''
					: 'pb-4 border-black/10 border-b-[1px]'}"
			>
				<InfoTitle classes="font-bold" title={name} />
				<button on:click={() => viewDoc(path)} class="underline text-lg">View</button>
			</div>
		{:else}
			<div class="flex items-center justify-between px-6">
				<InfoTitle classes="font-light" title="No documents uploaded" />
			</div>
		{/each}
	</div>
</div>
