<script lang="ts">
	import { logout } from '$lib/auth/init';
	import { adminStore } from '$lib/stores/admin';
	import { authState } from '$lib/stores/auth';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher<{
		selected: void;
	}>();
</script>

<div
	out:fade={{ duration: 100 }}
	class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
	role="menu"
	aria-orientation="vertical"
	aria-labelledby="menu-button"
	tabindex="-1"
>
	<div class="py-1" role="none">
		<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700 hover:bg-gray-100" -->
		{#if $adminStore.isLoggedIn}
			<a
				on:click={() => dispatch('selected')}
				href="/admin"
				class="text-gray-700 cursor-pointer hover:bg-gray-100 block px-4 py-2 text-sm"
				role="menuitem"
				tabindex="-1"
			>
				Admin
			</a>
		{/if}
		<a
			on:click={() => dispatch('selected')}
			href="/collections"
			class="text-gray-700 cursor-pointer hover:bg-gray-100 block px-4 py-2 text-sm"
			role="menuitem"
			tabindex="-1"
		>
			Collections
		</a>
	</div>
	<div class="py-1" role="none">
		<a
			on:click={() => dispatch('selected')}
			href="/about"
			class="text-gray-700 cursor-pointer hover:bg-gray-100 block px-4 py-2 text-sm"
			role="menuitem"
			tabindex="-1"
		>
			About Us
		</a>
	</div>
	<div class="py-1" role="none">
		<svelte:element
			this={$authState.isLoggedIn ? 'button' : 'a'}
			href={$authState.isLoggedIn ? undefined : '/login'}
			on:click={() => {
				if ($authState.isLoggedIn) {
					logout();
				}
				dispatch('selected');
			}}
			class="text-gray-700 w-full text-start cursor-pointer hover:bg-gray-100 block px-4 py-2 text-sm"
			role="menuitem"
			tabindex="-1"
		>
			{#if $authState.isLoggedIn}
				Logout
			{:else}
				Login
			{/if}
		</svelte:element>
	</div>
</div>
