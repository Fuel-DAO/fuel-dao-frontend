<script lang="ts">
	import Dropdown from '../dropdown/Dropdown.svelte';
	import HomeIcon from '../icons/HomeIcon.svelte';

	export let defaultValue: string;
	export let selected = '';
	export let options: { value: string; label: string }[] = [
		{
			value: 'all',
			label: 'All'
		},
		{
			value: 'available',
			label: 'Available'
		},
		{
			value: 'upcoming',
			label: 'Upcoming'
		}
	];
</script>

<div>
	<div class="sm:hidden">
		<Dropdown title="Availability" {options} value={selected || defaultValue}>
			<HomeIcon slot="leading" />
		</Dropdown>
	</div>
	<div class="hidden sm:block">
		<nav class="flex space-x-4" aria-label="Tabs">
			{#each options as { value, label }}
				<button
					on:click={() => (selected = value)}
					class=" rounded-md px-3 py-2 text-sm font-medium {selected === value
						? 'bg-white border-[1px] border-gray-100 shadow-md text-black'
						: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}"
				>
					{label}
				</button>
			{/each}
		</nav>
	</div>
</div>
