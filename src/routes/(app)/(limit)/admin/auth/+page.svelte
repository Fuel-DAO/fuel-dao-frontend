<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button/Button.svelte';
	import { adminStore } from '$lib/stores/admin';
	import { authState } from '$lib/stores/auth';

	$: if ($adminStore.isLoggedIn && $authState.isLoggedIn) {
		goto('/admin');
	}
</script>

<div class="flex flex-col items-center justify-center gap-4">
	<div class="font-bold text-xl">Admin</div>

	{#if $authState.isLoggedIn}
		<div>You're not authorized</div>
		<div class="text-sm">User ID: {$authState.idString}</div>
		<Button href="/admin">Refresh</Button>
	{:else}
		<div>You need to first login using Internet Identity</div>
		<div class="text-sm">User ID: {$authState.idString}</div>

		<Button href="/login">Login</Button>
	{/if}
</div>
