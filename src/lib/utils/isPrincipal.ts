import { Principal } from '@dfinity/principal';

export function isPrincipal(p?: string | Principal) {
	try {
		if (!p) return false;
		const r = Principal.from(p);
		return r._isPrincipal ? true : false;
	} catch (_) {
		return false;
	}
}
