<script lang="ts">
	import type { LayoutData } from './$types';
	import { setCollectionId } from './collectionId.context';

	export let data: LayoutData;

	$: setCollectionId(data.assetCanId, data.minterCanId);
</script>

<slot />
