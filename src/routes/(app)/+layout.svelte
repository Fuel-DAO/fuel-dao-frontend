<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
</script>

<svelte:head>
	<title>FuelDAO</title>
</svelte:head>

<div class="w-full flex justify-center">
	<Header />
	<slot />
</div>
