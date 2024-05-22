<script lang="ts">
	import { adminStore } from '$lib/stores/admin';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button/Button.svelte';
	import { checkIfAdmin } from '$lib/backend/admin';

	let loading = true;
	let error = '';

	async function checkAuthStatus() {
		error = '';
		try {
			await checkIfAdmin();
			if ($adminStore.isLoggedIn) {
				loading = false;
			} else {
				goto('/admin/auth');
			}
		} catch (e) {
			console.error(e);
			error = 'Something went wrong!';
		}
	}

	onMount(checkAuthStatus);
</script>

{#if error}
	<div class="flex w-full flex-col items-center justify-center pt-8">
		<div class="text-sm font-medium">{error}</div>
		<Button on:click={checkAuthStatus}>Try again</Button>
	</div>
{:else if loading}
	<div class="flex w-full items-center justify-center pt-8">
		<PlusIcon class="w-5 h-5 animate-spin" />
	</div>
{:else}
	<slot />
{/if}
