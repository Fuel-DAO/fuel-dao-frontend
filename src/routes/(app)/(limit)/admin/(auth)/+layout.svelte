<script lang="ts">
	import { adminStore } from '$lib/stores/admin';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { provisionCanisterV2 } from '$lib/backend';
	import Button from '$lib/components/button/Button.svelte';
	import { authState } from '$lib/stores/auth';
	import { Principal } from '@dfinity/principal';

	let loading = true;
	let error = '';

	async function checkAuthStatus() {
		error = '';
		try {
			const actor = provisionCanisterV2();
			const res = await actor.is_admin([Principal.from($authState.idString)]);
			if (res) {
				$adminStore = {
					isLoggedIn: true,
					key: $authState.idString || ''
				};
				loading = false;
			} else {
				gotoAuthPage();
			}
		} catch (e) {
			console.error(e);
			error = 'Something went wrong!';
		}
	}

	function gotoAuthPage() {
		$adminStore = {
			isLoggedIn: false,
			key: ''
		};
		goto('/admin/auth');
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
