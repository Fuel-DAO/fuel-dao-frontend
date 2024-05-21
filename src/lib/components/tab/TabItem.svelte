<script lang="ts">
	export let secondary = false;
	export let disabled = false;
</script>

<button
	on:click
	{disabled}
	class="{secondary
		? 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 font-medium'
		: 'border-black text-black font-bold'} 
    whitespace-nowrap border-b-2 px-1 pb-4 text-sm transition-all capitalize disabled:opacity-70"
>
	<slot />
</button>
