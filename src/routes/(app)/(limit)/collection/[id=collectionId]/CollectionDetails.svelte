<script lang="ts">
	import type { CollectionMetadata } from '$lib/types/nftCanister';

	export let metadata: CollectionMetadata;

	const renVal = (n: number | string, pre = '€') =>
		n === '--' ? '--' : `${pre ? pre + ' ' : ''} ${n}`;

	$: description = metadata.description || 'No description provided';
	$: weight = metadata.weight || '-- Kg';
	$: driveType = metadata.drive_type || 'Electric';
	$: displays = metadata.displays || 'N/A';
	$: seating = metadata.seating || '5 Seater';
	$: cargo = metadata.cargo || '-- L';
	$: overallHeight = metadata.overall_height || '-- mm';
	$: overallWidth = metadata.overall_width || '-- mm';
	$: trackFront = metadata.track_front || 'N/A';
	$: groundClearance = metadata.ground_clearance || 'N/A';
	$: keyFeatures = metadata.key_features[0]
		? metadata.key_features
		: ['Tesla Autopilot', '0-60 in 3.2s'];
	$: rangePerCharge = metadata.range_per_charge || '-- Km';
	$: trackRear = metadata.track_rear || 'N/A';
	$: acceleration = metadata.acceleration || '0-60 in 3.2s';
	$: chargingSpeed = metadata.charging_speed || '400 Kw';
	$: wheels = metadata.wheels || '18"';
	$: purchasePrice = metadata.purchase_price || 'N/A';
	$: brochureUrl = metadata.brochure_url || '';
	$: battery = metadata.battery || '-- KwH';
	$: overallLength = metadata.overall_length || '-- mm';
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
			<div>{keyFeatures.join(', ')}</div>
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
