<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import { authState } from '$lib/stores/auth';
	import type { CollectionMetadata } from '$lib/types/nftCanister';
	import Actions from './Actions.svelte';
	import Details from './CollectionDetails.svelte';
	import CollectionInfoCards from './CollectionInfoCards.svelte';
	import Tabs from './Tabs.svelte';
	import { getCollectionId } from './collectionId.context';

	export let metadata: CollectionMetadata;

	const tabs = ['details'] as TabType[];
	type TabType = 'details';
	let selected: TabType = 'details';

	const { id } = getCollectionId();
</script>

<div class="flex flex-col grow gap-4">
	<div class="flex flex-col sm:flex-row gap-4 lg:justify-between">
		<div class="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
			<div class="text-2xl lg:text-5xl font-bold">{metadata.name}</div>
			<div
				class="py-2 px-4 text-xs translate-y-1 bg-black rounded-full text-white font-light flex h-min items-center justify-center"
			>
				Live
			</div>
		</div>
		{#if $authState.isLoggedIn && metadata.collection_owner.toText() === $authState.idString}
			<Button secondary href="/admin/edit-collection/{id}">Edit</Button>
		{:else}
			<Actions title={metadata.name} />
		{/if}
	</div>
	<CollectionInfoCards {metadata} />
	<Tabs {tabs} bind:selected />
	{#if selected === 'details'}
		<Details {metadata} />
	{/if}
</div>
