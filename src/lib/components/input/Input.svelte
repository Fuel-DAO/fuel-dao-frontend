<script lang="ts">
	import { onMount } from 'svelte';

	export let label: string;
	export let value: string | number = '';
	export let placeholder: string = '';
	export let type: 'text' | 'password' | 'number' | 'email' = 'text';
	export let disabled = false;
	export let required = false;
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	let classes = '';
	export { classes as class };

	let inputEl: HTMLInputElement;

	onMount(() => (inputEl.type = type));
</script>

<label
	class="flex flex-col gap-2 transition-opacity {classes} {disabled
		? 'pointer-events-none opacity-50'
		: 'opacity-100'}"
>
	<span class="text-sm font-medium leading-6 text-gray-900">{label}{required ? ' *' : ''}</span>
	<input
		{min}
		{max}
		{required}
		{disabled}
		bind:this={inputEl}
		{placeholder}
		bind:value
		class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
	/>
</label>
