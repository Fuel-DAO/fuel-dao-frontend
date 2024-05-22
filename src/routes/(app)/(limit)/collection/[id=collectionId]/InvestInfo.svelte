<script lang="ts">
	import type { CollectionMetadata } from '$lib/types/nftCanister';
	import Button from '$lib/components/button/Button.svelte';
	import { fromE8s } from '$lib/utils/icp';

	export let metadata: CollectionMetadata;
	export let bookedTokens = 0;
	export let status: 'Live' | 'Rejected' | 'Accepted';

	$: investedPercentage = bookedTokens
		? ((bookedTokens / Number(metadata.supply_cap)) * 100).toFixed(2)
		: 0;
</script>

<div class="shrink-0 bg-primary rounded-xl flex flex-col text-white gap-3 p-6 shadow-xl h-fit">
	<div class="font-bold text-5xl">{status === 'Live' ? 'Open' : 'Closed'}</div>

	<div class="text-2xl">
		Invested <span class="font-bold">{(bookedTokens * fromE8s(metadata.price)).toFixed(4)} ICP</span
		>
	</div>

	<div class="w-72 bg-black/20 h-4 rounded-full relative overflow-hidden">
		<div
			style="width: {investedPercentage}%;"
			class="absolute transition-all bg-white rounded-full left-0 h-full"
		/>
	</div>
	<div class="text-md font-light">
		Funded {investedPercentage}% {status === 'Live' ? 'till now' : ''}
	</div>
	<Button secondary disabled={status !== 'Live'} on:click>Invest</Button>
</div>
