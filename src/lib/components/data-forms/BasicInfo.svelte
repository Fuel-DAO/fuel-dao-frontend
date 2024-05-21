<script lang="ts" context="module">
	type StatusKey = 'Draft' | 'Live';

	export type BasicInfoData = ReturnType<typeof initBasicInfo>;

	export const initBasicInfo = (data?: CollectionMetadata) => ({
		name: data?.name || '',
		description: data?.description || '',
		supplyCap: Number(data?.supply_cap) || 1000,
		price: Number(data?.price) || 1,
		treasury: data?.treasury.toString() || '',
		symbol: data?.symbol || 'ICP'
	});
</script>

<script lang="ts">
	import Input from '$lib/components/input/Input.svelte';
	import Textarea from '$lib/components/textarea/Textarea.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import type { CollectionMetadata } from '$lib/types/nftCanister';
	import { isPrincipal } from '$lib/utils/isPrincipal';

	export let loading = true;
	export let edit = false;
	export let data: BasicInfoData = initBasicInfo();

	// const handleStatusChange = ({ detail }: { detail: string }) =>
	// 	(data.status = detail as StatusKey);
</script>

<div class="flex flex-col gap-4">
	<Input disabled={loading} label="Title" bind:value={data.name} placeholder="Enter a title" />
	<Select
		label="Status"
		value="Live"
		options={[
			{ value: 'Ended', label: 'Ended' },
			{ value: 'Live', label: 'Live' },
			{ value: 'Draft', label: 'Draft' },
			{ value: 'Upcoming', label: 'Upcoming' }
		]}
	/>
	<div class="flex flex-col gap-1">
		<Input
			disabled={loading || edit}
			label="Treasury Principal ID"
			bind:value={data.treasury}
			placeholder="Enter a valid principal ID"
		/>
		{#if edit}
			<div class="text-black/70 text-xs">Treasury ID can't be changed</div>
		{:else if isPrincipal(data.treasury)}
			<div class="text-green-500 text-xs">NNS Principal ID is valid</div>
		{:else}
			<div class="text-red-500 text-xs">
				Invalid NNS Principal ID. Please correct this before submitting the form
			</div>
		{/if}
	</div>
	<Input
		disabled={loading}
		type="number"
		label="Price (in ICP)"
		bind:value={data.price}
		placeholder="Price (in ICP)"
	/>
	<Input
		disabled={loading}
		type="number"
		label="Supply cap (number of NFTs)"
		bind:value={data.supplyCap}
		placeholder="Supply cap"
	/>
	<Select label="Symbol" bind:value={data.symbol} options={[{ value: 'ICP', label: 'ICP' }]} />
	<Textarea
		disabled={loading}
		bind:value={data.description}
		label="Description"
		placeholder="Enter a description"
		rows={5}
	/>
</div>
