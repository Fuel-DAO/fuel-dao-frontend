<script lang="ts">
	import { nftCanister } from '$lib/backend';
	import { fromE8s } from '$lib/utils/icp';
	import { onMount, tick } from 'svelte';
	import { getCollectionId } from './collectionId.context';
	import type { CollectionMetadata } from '$lib/types/nftCanister';
	import Button from '$lib/components/button/Button.svelte';

	export let metadata: CollectionMetadata;

	const { minterCanId } = getCollectionId();

	let loading = true;
	let invested = BigInt(0);

	$: investedPercentage = (
		(Number(invested) / (Number(metadata.price) * Number(metadata.supply_cap))) *
		100
	).toFixed(2);

	async function getInvestedAmount() {
		try {
			await tick();
			const actor = nftCanister(minterCanId);
			const res = await (actor as any).get_total_invested();
			invested = res;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	}

	onMount(getInvestedAmount);
</script>

<div class="shrink-0 bg-primary rounded-xl flex flex-col text-white gap-3 p-6 shadow-xl h-fit">
	<div class="font-bold text-5xl">Open</div>
	<div class="text-3xl font-light">Invested</div>
	<div class="text-lg font-bold">{fromE8s(invested).toFixed(4)} ICP</div>
	<div class="w-72 bg-black/20 h-4 rounded-full relative overflow-hidden">
		<div
			style="width: {investedPercentage}%;"
			class="absolute transition-all bg-black left-0 h-full"
		/>
	</div>
	<div class="text-md font-light">Funded {investedPercentage}% till now</div>
	<Button secondary on:click>Invest</Button>
</div>
