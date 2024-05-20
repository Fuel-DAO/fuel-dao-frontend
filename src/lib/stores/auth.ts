import type { Identity } from '@dfinity/agent';
import type { AuthClient } from '@dfinity/auth-client';
import type { Principal } from '@dfinity/principal';
import { persisted } from 'svelte-local-storage-store';
import { writable } from 'svelte/store';

export const authHelper = writable<{
	init?: boolean;
	client?: AuthClient;
	identity?: Identity;
	idPrincipal?: Principal;
	userCanisterPrincipal?: Principal;
}>({});

export const authState = persisted<{
	isLoggedIn: boolean;
	idString?: string;
	userCanisterId?: string;
	showLogin: boolean;
	t?: boolean;
}>('auth-state', {
	isLoggedIn: false,
	showLogin: false
});
