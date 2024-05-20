<script lang="ts">
	import CaretDownIcon from '../icons/CaretDownIcon.svelte';

	export let title = '';
	export let value = '';
	export let options: { value: string; label: string }[] = [];

	$: selectedLabel = options.find((option) => option.value === value)?.label;
</script>

<div
	class="relative cursor-pointer bg-white shadow-md -ml-px inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-100 hover:bg-gray-50"
>
	{#if $$slots.leading}
		<div class="-ml-0.5 h-5 w-5 text-gray-400">
			<slot name="leading" />
		</div>
	{/if}
	{selectedLabel || title}
	<select bind:value class="absolute inset-0 opacity-0">
		{#each options as { value, label }}
			<option {value}>{label}</option>
		{/each}
	</select>
	<div class="-mr-1 h-5 w-5 text-gray-400">
		<slot name="trailing">
			<CaretDownIcon />
		</slot>
	</div>
</div>
