<script lang="ts" context="module">
	type StatusKey = 'Draft' | 'Live';

	export type BasicInfoData = {
		name: string;
		description: string;
		status: StatusKey;
		supplyCap: number;
		price: number;
		logo: string;
	};
</script>

<script lang="ts">
	import Input from '$lib/components/input/Input.svelte';
	import Textarea from '$lib/components/textarea/Textarea.svelte';
	import Select from '$lib/components/select/Select.svelte';

	export let loading = true;
	export let data: BasicInfoData = {
		name: '',
		description: '',
		status: 'Draft',
		supplyCap: 1000,
		price: 1,
		logo: ''
	};

	const handleStatusChange = ({ detail }: { detail: string }) =>
		(data.status = detail as StatusKey);
</script>

<div class="flex flex-col gap-4">
	<Input disabled={loading} label="Title" bind:value={data.name} placeholder="Enter a title" />
	<Select
		label="Status"
		on:change={handleStatusChange}
		value="Live"
		options={[
			{ value: 'Ended', label: 'Ended' },
			{ value: 'Live', label: 'Live' },
			{ value: 'Draft', label: 'Draft' },
			{ value: 'Upcoming', label: 'Upcoming' }
		]}
	/>
	<Input
		disabled={loading}
		label="Thumbnail Image"
		bind:value={data.logo}
		placeholder="Enter an image url"
	/>
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
	<Textarea
		disabled={loading}
		bind:value={data.description}
		label="Description"
		placeholder="Enter a description"
		rows={5}
	/>
</div>
