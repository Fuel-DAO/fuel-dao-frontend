<script lang="ts">
	import type { CollectionMetadata } from '$lib/types/nftCanister';

	export let metadata: CollectionMetadata;

	$: purchasePrice = metadata.underlying_asset_price || '--';
	$: yields = metadata.yields || '--';
	$: projectedRent = metadata.projected_rent || '--';
	$: minInvestment = metadata.min_investment || '--';
	$: yearBuilt = metadata.year_built || '--';
</script>

<div class="grid col-auto lg:flex items-center gap-2 pt-8">
	<div
		class="border border-black/20 flex-1 rounded-xl p-4 flex flex-col gap-1 text-black items-center"
	>
		<div class="font-bold text-nowrap">Purchase price</div>
		<div class="">€ {purchasePrice.toLocaleString()}</div>
	</div>
	{#if yields !== '--'}
		<div
			class="border border-black/20 flex-1 rounded-xl p-4 flex flex-col gap-1 text-black items-center"
		>
			<div class="font-bold">Yield</div>
			<div class="">{yields}%</div>
		</div>
	{/if}
	{#if projectedRent !== '--'}
		<div
			class="border border-black/20 flex-1 rounded-xl p-4 flex flex-col gap-1 text-black items-center"
		>
			<div class="font-bold text-nowrap">Projected Rent</div>
			<div class="">€ {projectedRent.toLocaleString()}</div>
		</div>
	{/if}
	{#if minInvestment !== '--'}
		<div
			class="border border-black/20 flex-1 rounded-xl p-4 flex flex-col gap-1 text-black items-center"
		>
			<div class="font-bold text-nowrap">Min. Investment</div>
			<div class="">{minInvestment.toLocaleString()} ICP</div>
		</div>
	{/if}
	<div
		class="border border-black/20 flex-1 rounded-xl p-4 flex flex-col gap-1 text-black items-center"
	>
		<div class="font-bold text-nowrap">Year Built</div>
		<div class="">{yearBuilt}</div>
	</div>
</div>
