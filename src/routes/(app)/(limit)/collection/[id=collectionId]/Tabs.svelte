<script lang="ts">
	export let tabs: string[];
	export let selected: string;
</script>

<div class="pt-12 flex items-center justify-center gap-4">
	{#each tabs as option}
		<button
			on:click={() => (selected = option)}
			class="capitalize px-6 pb-2 whitespace-nowrap {selected === option
				? 'font-bold border-b-2 border-black'
				: ''}"
		>
			{option}
		</button>
	{/each}
</div>
