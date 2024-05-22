import { Principal } from '@dfinity/principal';
import { provisionCanister } from './index';
import { get } from 'svelte/store';
import { authState } from '$lib/stores/auth';
import { adminStore } from '$lib/stores/admin';

function updateAdminStore(isAdmin: boolean, key: string) {
	adminStore.set({
		isLoggedIn: isAdmin,
		key
	});
}

export async function checkIfAdmin() {
	const authStateData = get(authState);
	if (!authStateData.isLoggedIn) return updateAdminStore(false, '');
	const actor = provisionCanister();
	const res = await actor.is_admin([Principal.from(authStateData.idString)]);
	if (res) {
		return updateAdminStore(true, authStateData.idString || '');
	} else {
		return updateAdminStore(false, '');
	}
}
