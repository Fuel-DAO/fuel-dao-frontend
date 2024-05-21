<script lang="ts">
	import type { CollectionMetadata } from '$lib/types/nftCanister';

	export let metadata: CollectionMetadata;

	$: purchasePrice = metadata.purchase_price || '--';
	$: range = metadata.range_per_charge || '--';
</script>

<div class="grid col-auto lg:flex items-center gap-2 pt-8">
	<div
		class="border border-black/20 flex-1 rounded-xl p-4 flex flex-col gap-1 text-black items-center"
	>
		<div class="font-bold text-nowrap">Purchase price</div>
		<div class="">€ {purchasePrice.toLocaleString()}</div>
	</div>

	<div
		class="border border-black/20 flex-1 rounded-xl p-4 flex flex-col gap-1 text-black items-center"
	>
		<div class="font-bold text-nowrap">Range per charge</div>
		<div class="">{range} KM</div>
	</div>
</div>
