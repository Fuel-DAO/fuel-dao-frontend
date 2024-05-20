<script lang="ts">
	import { provisionCanisterV2 } from '$lib/backend';
	import { onMount } from 'svelte';
	import ListItem, { type FormMetadataWithId } from './ListItem.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';

	let forms: FormMetadataWithId[] = [];
	let loading = true;

	async function fetchRequestDetail(id: bigint) {
		try {
			const actor = provisionCanisterV2();
			const r = await actor.get_request_info(id);
			if (r[0]) {
				return {
					id: Number(id),
					...r[0]
				} as FormMetadataWithId;
			}
		} catch (e) {
			return undefined;
		}
	}

	async function fetchList() {
		loading = true;
		const actor = provisionCanisterV2();

		const pendingReqIds = await actor.get_pending_requests();

		const pendingRequests = (
			await Promise.all(pendingReqIds.map((id) => fetchRequestDetail(id)))
		).filter(Boolean) as FormMetadataWithId[];

		forms = pendingRequests;

		loading = false;
	}

	onMount(fetchList);
</script>

{#if loading}
	<div class="flex items-center justify-center py-8">
		<PlusIcon class="w-6 h-6 animate-spin" />
	</div>
{:else}
	<ul role="list" class="divide-y divide-gray-100">
		{#each forms as formData}
			<ListItem {formData} />
		{:else}
			No items to show
		{/each}
	</ul>
{/if}
