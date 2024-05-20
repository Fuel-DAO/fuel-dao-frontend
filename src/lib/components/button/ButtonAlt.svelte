<script lang="ts">
	export let href: string | undefined = undefined;
	export let target: '_blank' | '' | undefined = undefined;
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{target}
	{href}
	class="bg-transparent inline-flex ring-1 font-medium ring-black hover:ring-black/30 hover:bg-white/30 active:bg-white/80 transition-all py-2 px-4"
>
	<slot />
</svelte:element>
