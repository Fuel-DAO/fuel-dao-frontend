<script lang="ts">
	import type { CollectionMetadata } from '$lib/types/nftCanister';

	export let metadata: CollectionMetadata;

	const renVal = (n: number | string, pre = '€') =>
		n === '--' ? '--' : `${pre ? pre + ' ' : ''} ${n}`;

	$: description = metadata.description || '';
	$: weight = metadata.weight || '';
	$: driveType = metadata.drive_type || '';
	$: displays = metadata.displays || '';
	$: seating = metadata.seating || '';
	$: cargo = metadata.cargo || '';
	$: overallHeight = metadata.overall_height || '';
	$: overallWidth = metadata.overall_width || '';
	$: trackFront = metadata.track_front || '';
	$: groundClearance = metadata.ground_clearance || '';
	$: keyFeatures = metadata.key_features || '';
	$: rangePerCharge = metadata.range_per_charge || '';
	$: trackRear = metadata.track_rear || '';
	$: acceleration = metadata.acceleration || '';
	$: chargingSpeed = metadata.charging_speed || '';
	$: wheels = metadata.wheels || '';
	$: purchasePrice = metadata.purchase_price || '';
	$: brochureUrl = metadata.brochure_url || '';
	$: battery = metadata.battery || '';
	$: overallLength = metadata.overall_length || '';
</script>

<div class="flex flex-col gap-8 py-4">
	<div class="grid grid-cols-3 gap-4">
		<div class="flex flex-col">
			<div class="font-bold">Weight</div>
			<div>{weight}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Drive Type</div>
			<div>{driveType}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Displays</div>
			<div>{displays}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Seating</div>
			<div>{seating}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Cargo</div>
			<div>{cargo}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Overall Height</div>
			<div>{overallHeight}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Overall Width</div>
			<div>{overallWidth}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Track Front</div>
			<div>{trackFront}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Ground Clearance</div>
			<div>{groundClearance}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Key Features</div>
			<div>{keyFeatures}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Range Per Charge</div>
			<div>{rangePerCharge}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Track Rear</div>
			<div>{trackRear}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Acceleration</div>
			<div>{acceleration}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Charging Speed</div>
			<div>{chargingSpeed}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Wheels</div>
			<div>{wheels}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Purchase Price</div>
			<div>{purchasePrice}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Brochure URL</div>
			<div>{brochureUrl}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Battery</div>
			<div>{battery}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Overall Length</div>
			<div>{overallLength}</div>
		</div>
	</div>

	<div class="flex flex-col">
		<div class="font-bold">Description</div>
		<div>{description}</div>
	</div>
</div>
