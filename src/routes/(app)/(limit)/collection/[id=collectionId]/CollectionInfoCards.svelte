<script lang="ts">
	import type { CollectionMetadata } from '$lib/types/nftCanister';

	export let metadata: CollectionMetadata;

	$: acceleration = metadata.acceleration || '--';
	$: seating = metadata.seating || '--';
	$: range = metadata.range_per_charge || '--';
</script>

<div class="grid col-auto lg:flex items-center gap-2 pt-8">
	<div
		class="border border-black/20 flex-1 rounded-xl p-4 flex flex-col gap-1 text-black items-center"
	>
		<div class="font-bold text-nowrap">Acceleration</div>
		<div class="">{acceleration}</div>
	</div>

	<div
		class="border border-black/20 flex-1 rounded-xl p-4 flex flex-col gap-1 text-black items-center"
	>
		<div class="font-bold text-nowrap">Range per charge</div>
		<div class="">{range} KM</div>
	</div>
	<div
		class="border border-black/20 flex-1 rounded-xl p-4 flex flex-col gap-1 text-black items-center"
	>
		<div class="font-bold text-nowrap">Seating</div>
		<div class="">{seating} Seats</div>
	</div>
</div>
