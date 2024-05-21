<script lang="ts" context="module">
	import type { _SERVICE } from '$lib/declarations/provision/provision.did';

	type FormMetadata = Awaited<ReturnType<_SERVICE['get_request_info']>>[0];

	export type FormMetadataWithId = FormMetadata & {
		id: number;
	};
</script>

<script lang="ts">
	import { ASSET_CANISTER_ID, assetPath } from '$lib/backend';

	export let formData: FormMetadataWithId;
</script>

<a href="/admin/manage/{formData.id}" class="flex justify-between gap-x-6 py-5">
	<div class="flex min-w-0 gap-x-4">
		{#if formData.metadata?.[0]?.logo}
			<img
				class="h-12 w-12 flex-none rounded-full bg-gray-50 object-cover"
				src={assetPath(ASSET_CANISTER_ID, formData.metadata[0].logo)}
				alt=""
			/>
		{:else}
			<div class="h-12 w-12 bg-gray-200 rounded-full" />
		{/if}

		<div class="min-w-0 flex-auto">
			<p class="text-sm font-semibold leading-6 text-gray-900">{formData.metadata?.[0]?.name}</p>
			<p class="mt-1 truncate line-clamp-2 text-xs leading-5 text-gray-500">
				{formData.metadata?.[0]?.description}
			</p>
		</div>
	</div>
	<div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
		<p class="text-sm leading-6 text-gray-900">
			Submitted by: {formData.collection_owner.toString()}
		</p>
		<p class="mt-1 text-xs leading-5 text-gray-500">
			Created at {new Date().toDateString()}
		</p>
	</div>
</a>
