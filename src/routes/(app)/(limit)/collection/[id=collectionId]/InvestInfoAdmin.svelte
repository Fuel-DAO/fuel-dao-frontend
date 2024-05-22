<script lang="ts">
	import type { CollectionMetadata } from '$lib/types/nftCanister';
	import Button from '$lib/components/button/Button.svelte';
	import { getCollectionId } from './collectionId.context';
	import { nftCanister } from '$lib/backend';

	export let metadata: CollectionMetadata;
	export let bookedTokens = 0;

	const { minterCanId } = getCollectionId();

	let confirmAction: '' | 'accept' | 'reject' = '';
	let loading = false;

	$: investedPercentage = bookedTokens ? (bookedTokens / Number(metadata.supply_cap)) * 100 : 0;

	async function concludeSale(action: '' | 'accept' | 'reject') {
    if ( !action ) return;
		loading = true;
		try {
			const actor = nftCanister(minterCanId);
      const promise = (action === 'accept' ? actor.accept_sale() : actor.reject_sale());
      console.log(await promise);
		} finally {
			loading = false;
			location.reload();
		}
	}
</script>

<div
	class="shrink-0 border border-primary bg-green-50 border-dashed rounded-xl flex flex-col text-black gap-3 p-6 shadow-xl h-fit"
>
	<div class="font-bold text-xl">Admin</div>
	<div class="text-lg font-medium">Conclude sale</div>
	{#if investedPercentage < 100}
		<div class="text-xs text-red-600">Warning: Sale has not been completed fully yet</div>
	{/if}

	<div class="flex gap-2">
		<Button disabled={loading} on:click={() => (confirmAction = 'accept')}>Accept sale</Button>
		<Button disabled={loading} secondary on:click={() => (confirmAction = 'reject')}
			>Reject sale</Button
		>
	</div>
	{#if confirmAction }
		<div class="text-sm font-bold">Caution!</div>
		<div class="text-xs">
			You are about to <span class="underline">{confirmAction}</span> the sale.<br /> This will stop
			and complete the sale.
		</div>
		{#if loading}
			<div class="text-xs underline">The sale is being {confirmAction}ed</div>
		{:else}
			<div class="text-xs">Are you sure?</div>
		{/if}
		<div class="flex gap-2">
			<Button disabled={loading} secondary on:click={() => (confirmAction = '')}>Cancel</Button>
			<Button {loading} on:click={() => concludeSale(confirmAction)}>Confirm</Button>
		</div>
	{/if}
</div>
