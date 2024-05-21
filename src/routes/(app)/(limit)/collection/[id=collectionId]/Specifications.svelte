<script lang="ts">
	import type { CollectionMetadata } from '$lib/types/nftCanister';

	export let metadata: CollectionMetadata;

	const renVal = (n: number | string, pre = '€') =>
		n === '--' ? '--' : `${pre ? pre + ' ' : ''} ${n}`;

	$: description = metadata.description || 'No description provided';
	$: weight = metadata.weight || '--';
	$: driveType = metadata.drive_type || 'Electric';
	$: displays = metadata.displays || 'N/A';
	$: seating = metadata.seating || '5 Seater';
	$: cargo = metadata.cargo || '--';
	$: overallHeight = metadata.overall_height || '--';
	$: overallWidth = metadata.overall_width || '--';
	$: overallLength = metadata.overall_length || '--';
	$: trackRear = metadata.track_rear || '--';
	$: trackFront = metadata.track_front || '--';
	$: groundClearance = metadata.ground_clearance || 'N/A';
	$: keyFeatures = metadata.key_features[0]
		? metadata.key_features
		: ['Tesla Autopilot', '0-60 in 3.2s'];
	$: rangePerCharge = metadata.range_per_charge || '--';

	$: acceleration = metadata.acceleration || '0-60 in 3.2s';
	$: chargingSpeed = metadata.charging_speed || '400';
	$: wheels = metadata.wheels || '18"';
	$: purchasePrice = metadata.purchase_price?.toLocaleString() || 'N/A';
	$: brochureUrl = metadata.brochure_url || '';
	$: battery = metadata.battery || '-- KwH';
</script>

<div class="flex flex-col gap-8 py-4">
	<div class="grid grid-cols-3 gap-4">
		<div class="flex flex-col">
			<div class="font-bold">Purchase price</div>
			<div class="font-light">€ {purchasePrice.toLocaleString()}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Weight</div>
			<div class="font-light">{weight} Kg</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Drive Type</div>
			<div class="font-light">{driveType}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Displays</div>
			<div class="font-light">{displays}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Seating</div>
			<div class="font-light">{seating}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Cargo</div>
			<div class="font-light">{cargo} L</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Overall Height</div>
			<div class="font-light">{overallHeight} mm</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Overall Width</div>
			<div class="font-light">{overallWidth} mm</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Overall Length</div>
			<div class="font-light">{overallLength} mm</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Ground Clearance</div>
			<div class="font-light">{groundClearance} mm</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Track Front</div>
			<div class="font-light">{trackFront} mm</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Track Rear</div>
			<div class="font-light">{trackRear} mm</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Key Features</div>
			<div class="font-light">{keyFeatures.join(', ')}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Range Per Charge</div>
			<div class="font-light">{rangePerCharge} KM</div>
		</div>

		<div class="flex flex-col">
			<div class="font-bold">Acceleration</div>
			<div class="font-light">{acceleration}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Charging Speed</div>
			<div class="font-light">{chargingSpeed} V</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Wheels</div>
			<div class="font-light">{wheels}</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Brochure URL</div>
			{#if brochureUrl}
				<a target="_blank" href={brochureUrl} class="font-light">Link </a>
			{:else}
				<div class="font-light">N/A</div>
			{/if}
		</div>
		<div class="flex flex-col">
			<div class="font-bold">Battery</div>
			<div class="font-light">{battery}</div>
		</div>
	</div>

	<div class="flex flex-col">
		<div class="font-bold">Description</div>
		<div class="font-light">{description}</div>
	</div>
</div>
