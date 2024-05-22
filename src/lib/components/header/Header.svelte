<script lang="ts">
	import { page } from '$app/stores';
	import { adminStore } from '$lib/stores/admin';
	import { authState } from '$lib/stores/auth';
	import Avatar from '../avatar/Avatar.svelte';
	import logo from '$lib/assets/logo.svg';
	import MenuIcon from '../icons/MenuIcon.svelte';
	import UserIcon from '../icons/UserIcon.svelte';
	import HeaderMenu from './HeaderMenu.svelte';
	import { checkIfAdmin } from '$lib/backend/admin';

	let menuOpen = false;

	$: showControls =
		$page.url.pathname.includes('collection') || $page.url.pathname.includes('admin');

	$: if ($authState) {
		checkIfAdmin();
	}
</script>

<div
	class="w-full fixed z-50 h-20 shadow-sm flex items-center justify-between px-8 font-light transition-all bg-white/90 backdrop-blur-md"
>
	{#if showControls}
		<button on:click={() => history.back()} class="z-[1] hidden lg:block">← Go back</button>
		<button on:click={() => history.back()} class="z-[1] lg:hidden pr-4">←</button>
	{/if}

	<div
		class="absolute z-0 inset-x-0 flex items-center pl-8
		{showControls ? 'justify-center' : 'justify-start'}"
	>
		<a href="/">
			<img src={logo} alt="FuelDAO" class="lg:h-8 h-5" />
		</a>
	</div>
	<div class="lg:hidden absolute right-8">
		<button on:click={() => (menuOpen = !menuOpen)}>
			<MenuIcon class="h-6 w-6" />
		</button>
		{#if menuOpen}
			<HeaderMenu on:selected={() => (menuOpen = false)} />
		{/if}
	</div>
	<div class="absolute z-[1] lg:flex hidden right-8 items-center gap-8">
		{#if $adminStore.isLoggedIn}
			<a href="/admin">Admin</a>
		{/if}
		<a href="/collections">Collections</a>
		<Avatar href="/login">
			{#if $authState.isLoggedIn}
				U
			{:else}
				<UserIcon class="h-4 w-4" />
			{/if}
		</Avatar>
	</div>
</div>
