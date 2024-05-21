<script lang="ts">
	import type { CollectionMetadata } from '$lib/types/nftCanister';
	import Button from '$lib/components/button/Button.svelte';

	export let metadata: CollectionMetadata;

	$: investedPercentage = (
		(Number(metadata.total_supply) / Number(metadata.supply_cap)) *
		100
	).toFixed(2);
</script>

<div class="shrink-0 bg-primary rounded-xl flex flex-col text-white gap-3 p-6 shadow-xl h-fit">
	<div class="font-bold text-5xl">Open</div>
	<div class="text-3xl font-light">Invested</div>
	<div class="text-lg font-bold">{Number(metadata.total_supply).toFixed(4)} ICP</div>
	<div class="w-72 bg-black/20 h-4 rounded-full relative overflow-hidden">
		<div
			style="width: {investedPercentage}%;"
			class="absolute transition-all bg-white rounded-full left-0 h-full"
		/>
	</div>
	<div class="text-md font-light">Funded {investedPercentage}% till now</div>
	<Button secondary on:click>Invest</Button>
</div>
