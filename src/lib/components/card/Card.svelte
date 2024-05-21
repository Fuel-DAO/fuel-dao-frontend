<script lang="ts">
	import ImageIcon from '$lib/components/icons/ImageIcon.svelte';
	import type { CollectionMetadata } from '$lib/types/nftCanister';

	export let data: CollectionMetadata;
	export let href: string;
</script>

<a {href} class="rounded-xl relative overflow-hidden shadow-lg w-[20rem]">
	<div
		class="absolute top-2 left-2 rounded-lg bg-white/70 backdrop-blur p-1 px-3 text-black text-xs capitalize"
	>
		Live
	</div>
	{#if data.logo}
		<img alt="Collection preview" src={data.logo} class="w-full h-64 z-[2] object-cover" />
	{:else}
		<div class="flex items-center justify-center w-full h-64 bg-gray-50 animate">
			<ImageIcon class="h-6 w-6" />
		</div>
	{/if}
	<div class="flex flex-col gap-y-1 p-5">
		<div class="font-bold text-sm line-clamp-2 h-max">
			{data.name}
			<br />
		</div>
		{#if data.description}
			<div class="text-sm line-clamp-2 h-max">{data.description} <br /></div>
		{:else}
			<div class="text-sm">
				<span class="font-medium">Range:</span>
				{data.range_per_charge || '--'} Km
			</div>
			<div class="text-sm">
				{data.seating || '--'} Seats {data.drive_type ? `| ${data.drive_type}` : ''}
				{data.acceleration ? `| ${data.acceleration}` : ''}
			</div>
		{/if}
	</div>
</a>
