import { AuthClient } from '@dfinity/auth-client';
import { get } from 'svelte/store';
import { authState, authHelper } from '$lib/stores/auth';

export async function logout() {
	toggleInitState(false);
	const authHelperState = get(authHelper);
	await authHelperState.client?.logout();
	const identity = authHelperState.client?.getIdentity();
	const principal = await identity?.getPrincipal();
	authState.set({
		isLoggedIn: false,
		idString: principal?.toText(),
		showLogin: false
	});
	toggleInitState(true);
}

function toggleInitState(init: boolean) {
	authHelper.update((data) => ({
		init,
		...data
	}));
}

export async function initializeAuthClient() {
	toggleInitState(false);
	const authStateData = get(authState);
	const authHelperData = get(authHelper);
	let client: AuthClient | undefined = undefined;
	if (!authHelperData.client) {
		client = await AuthClient.create({
			idleOptions: {
				disableIdle: true,
				disableDefaultIdleCallback: true
			}
		});
	} else {
		client = authHelperData.client;
	}
	const identity = client?.getIdentity();
	const principal = await identity?.getPrincipal();
	if (await client?.isAuthenticated()) {
		authState.set({
			userCanisterId: authStateData.userCanisterId,
			isLoggedIn: true,
			idString: principal?.toText(),
			showLogin: authStateData.showLogin
		});

		authHelper.set({
			init: true,
			client,
			userCanisterPrincipal: authHelperData.userCanisterPrincipal,
			identity,
			idPrincipal: principal
		});
	} else {
		authState.set({
			isLoggedIn: false,
			idString: principal?.toText(),
			showLogin: authStateData.showLogin
		});

		authHelper.set({
			init: true,
			client,
			identity,
			idPrincipal: principal
		});
	}
}
