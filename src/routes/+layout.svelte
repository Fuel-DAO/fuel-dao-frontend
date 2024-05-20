<script lang="ts">
	import '$lib/css/app.css';
	import { browser } from '$app/environment';
	import { initializeAuthClient } from '$lib/auth/init';
	import { onMount } from 'svelte';

	onMount(() => {
		if (browser) {
			initializeAuthClient();
		}
	});
</script>

<slot />
