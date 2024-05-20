import { persisted } from 'svelte-local-storage-store';

export const adminStore = persisted('ad', {
	key: '',
	isLoggedIn: false
});
