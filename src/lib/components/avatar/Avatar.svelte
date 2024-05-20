<script lang="ts">
	export let href: string | undefined = '';
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	role="presentation"
	{href}
	on:click
	class="h-10 w-10 bg-black flex items-center text-xl select-none justify-center font-light text-white rounded-full uppercase"
>
	<slot />
</svelte:element>
