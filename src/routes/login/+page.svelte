<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import DfinityIcon from '$lib/components/icons/DfinityIcon.svelte';
	import { authState, authHelper } from '$lib/stores/auth';
	import { initializeAuthClient } from '$lib/auth/init';
	import { tick } from 'svelte';
	import logo from '$lib/assets/logo.svg';
	import { adminStore } from '$lib/stores/admin';

	const IDENTITY_PROVIDER =
		import.meta.env.NODE_ENV === 'dev'
			? `http://${process.env.INTERNET_IDENTITY_CANISTER_ID}.localhost:${import.meta.env.DFX_PORT}`
			: 'https://identity.ic0.app/#authorize';

	const DERIVATION_ORIGIN =
		import.meta.env.NODE_ENV === 'dev' ? undefined : 'https://67erj-tiaaa-aaaam-acnxa-cai.icp0.io';

	let error = '';

	async function handleSuccessfulLogin() {
		try {
			const principal = $authHelper.client?.getIdentity()?.getPrincipal();
			await initializeAuthClient();
			await tick();

			$authState.showLogin = false;
		} catch (_) {
			error = 'Something went wrong. Please refresh the page and try login again.';
		} finally {
			$authHelper.init = true;
		}
	}

	function handleError(e?: string) {
		error = 'Error while logging in. Please try again or use a different method';
		console.warn('Error while logging in using, Details: ', e);
		$authHelper.init = true;
	}

	async function handleLogin() {
		$authHelper.init = false;
		await $authHelper.client?.login({
			maxTimeToLive: BigInt(30 * 24 * 60 * 60 * 1000 * 1000 * 1000),
			onSuccess: () => handleSuccessfulLogin(),
			onError: (e) => handleError(e),
			identityProvider: 'https://identity.ic0.app/#authorize'
			// derivationOrigin: DERIVATION_ORIGIN
		});
	}

	async function logout() {
		$authHelper.init = false;
		await $authHelper?.client?.logout();
		adminStore.set({ isLoggedIn: false, key: '' });
		initializeAuthClient();
	}
</script>

<svelte:head>
	<title>FuelDAO | Login</title>
</svelte:head>

<div
	class="flex flex-col overflow-hidden h-screen w-full items-center justify-center pb-20 gap-4 relative"
>
	<div class="flex z-[3] min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
		<div
			class="bg-white/75 backdrop-blur-xl flex flex-col items-center gap-8 px-6 py-12 shadow sm:rounded-lg sm:px-12"
		>
			<a href="/" class="h-full">
				<img src={logo} alt="FuelDAO" class="h-full" />
			</a>
			{#if !$authState.isLoggedIn}
				<h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in or join
				</h2>

				<Button
					disabled={!$authHelper?.init}
					loading={!$authHelper?.init}
					on:click={handleLogin}
					secondary
					class="w-min"
				>
					<div class="flex items-center justify-center gap-2">
						<DfinityIcon class="h-4" />
						<span class="text-nowrap">Login using internet identity</span>
					</div>
				</Button>
				<p class="text-center text-sm text-gray-500 max-w-xs">
					By creating an account you agree to our
					<a href="/tc" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
						Terms and conditions
					</a>
				</p>
			{:else}
				<h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					You are logged in!
				</h2>
				<div class="text-center text-sm text-gray-500">
					<div class="pb-2">Your principal ID:</div>
					<div class="font-mono bg-gray-200 p-2 rounded-md max-w-sm select-all">
						{$authState.idString}
					</div>
				</div>

				<Button href="/collections" class="w-min">View all collections</Button>
				<Button on:click={logout} loading={!$authHelper?.init} secondary class="w-min">
					Logout
				</Button>
			{/if}
		</div>
	</div>
</div>
