import type { _SERVICE } from '$lib/declarations/token/token.did';

export type CollectionMetadata = Awaited<ReturnType<_SERVICE['get_metadata']>>;
