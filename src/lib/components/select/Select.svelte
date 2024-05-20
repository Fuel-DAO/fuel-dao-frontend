<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let value = '';
	export let disabled = false;
	export let options: { value: string; label: string }[] = [];

	const dispatch = createEventDispatcher<{
		change: string;
	}>();

	function handleChange(e: Event) {
		dispatch('change', (e.target as HTMLSelectElement).value);
	}
</script>

<label class="flex flex-col gap-2">
	<span class="text-sm font-medium leading-6 text-gray-900">{label}</span>
	<select
		{disabled}
		on:change={handleChange}
		bind:value
		class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:black sm:text-sm sm:leading-6"
	>
		{#each options as { value, label }}
			<option {value}>{label}</option>
		{/each}
	</select>
</label>
