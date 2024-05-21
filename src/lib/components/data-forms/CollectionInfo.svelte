<script lang="ts" context="module">
	export type CollectionInfoData = ReturnType<typeof initCollectionInfo>;

	export const initCollectionInfo = (data?: CollectionMetadata) => ({
		weight: data?.weight || 0,
		drive_type: data?.drive_type || '',
		displays: data?.displays || '',
		seating: data?.seating || '',
		cargo: data?.cargo || 0,
		overall_height: data?.overall_height || 0,
		overall_width: data?.overall_width || 0,
		track_front: data?.track_front || 0,
		ground_clearance: data?.ground_clearance || 0,
		key_features: data?.key_features?.join(', ') || '',
		range_per_charge: data?.range_per_charge || 0,
		track_rear: data?.track_rear || 0,
		acceleration: data?.acceleration || '',
		charging_speed: data?.charging_speed || '',
		wheels: data?.wheels || 0,
		purchase_price: Number(data?.purchase_price) || 0,
		brochure_url: data?.brochure_url || '',
		battery: data?.battery || '',
		overall_length: data?.overall_length || 0
	});
</script>

<script lang="ts">
	import Input from '$lib/components/input/Input.svelte';
	import type { CollectionMetadata } from '$lib/types/nftCanister';

	export let loading = true;
	export let data: CollectionInfoData = initCollectionInfo();
</script>

<div class="flex flex-col gap-4">
	<Input disabled={loading} label="Purchase price" type="number" bind:value={data.purchase_price} />
	<Input disabled={loading} label="Weight" type="number" bind:value={data.weight} />
	<Input disabled={loading} label="Drive Type" type="number" bind:value={data.drive_type} />
	<Input disabled={loading} label="Displays" type="text" bind:value={data.displays} />
	<Input disabled={loading} label="Seating" type="text" bind:value={data.seating} />
	<Input disabled={loading} label="Cargo" type="number" bind:value={data.cargo} />
	<Input disabled={loading} label="Overall height" type="number" bind:value={data.overall_height} />
	<Input disabled={loading} label="Overall width" type="number" bind:value={data.overall_width} />
	<Input disabled={loading} label="Track front" type="number" bind:value={data.track_front} />
	<Input
		disabled={loading}
		label="Ground clearance"
		type="number"
		bind:value={data.ground_clearance}
	/>
	<Input disabled={loading} label="key_features" type="text" bind:value={data.key_features} />
	<Input
		disabled={loading}
		label="Range per charge"
		type="number"
		bind:value={data.range_per_charge}
	/>
	<Input disabled={loading} label="Track Rear" type="number" bind:value={data.track_rear} />
	<Input disabled={loading} label="Acceleration" type="text" bind:value={data.acceleration} />
	<Input disabled={loading} label="Charging Speed" type="text" bind:value={data.charging_speed} />
	<Input disabled={loading} label="Wheels" type="number" bind:value={data.wheels} />
	<Input disabled={loading} label="Brochure URL" type="text" bind:value={data.brochure_url} />
	<Input disabled={loading} label="Battery" type="text" bind:value={data.battery} />
	<Input disabled={loading} label="Overall Length" type="number" bind:value={data.overall_length} />
</div>
