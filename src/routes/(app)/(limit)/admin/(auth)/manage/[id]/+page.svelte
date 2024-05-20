<script lang="ts">
	import { onMount } from 'svelte';
	import { provisionCanisterV2 } from '$lib/backend';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import { page } from '$app/stores';
	import ItemInfo from './ItemInfo.svelte';
	import Attachments from './Attachments.svelte';
	import FormHeader from './FormHeader.svelte';
	import InfoSection from './InfoSection.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import { fromE8s } from '$lib/utils/icp';
	import type { _SERVICE } from '$lib/declarations/provision/provision.did';

	let formData: Awaited<ReturnType<_SERVICE['get_request_info']>>[0];
	let pageLoading = true;
	let loading = false;
	let approved = false;
	let canId = {
		assetCanId: '',
		minterCanId: ''
	};

	$: id = $page.params.id;

	async function fetchForm() {
		pageLoading = true;
		const actor = provisionCanisterV2();
		const res = await actor.get_request_info(BigInt(Number(id)));
		if (res[0]) {
			formData = res[0];
		}
		pageLoading = false;
	}

	async function approve(approve: boolean) {
		loading = true;
		try {
			const actor = provisionCanisterV2();
			if (approve) {
				const res = await actor.approve_request(BigInt(id));
				if (!('Ok' in res)) throw 'Error';
				// if ('CanisterId' in res.Ok) {
				// 	canId = {
				// 		assetCanId: res.Ok.CanisterId.asset_canister.toString(),
				// 		minterCanId: res.Ok.CanisterId.minter_canister.toString()
				// 	};
				// }
				approved = true;
				// actor.grant_commit_permission($authState.isLoggedIn)
			} else {
				const res = await actor.reject_request(BigInt(id));
				if (!('Ok' in res)) throw 'Error';
				history.back();
			}
		} finally {
			loading = false;
		}
	}

	onMount(fetchForm);
</script>

{#if pageLoading}
	<div class="flex items-center justify-center py-8">
		<PlusIcon class="w-6 h-6 animate-spin" />
	</div>
{:else if formData}
	<div class="flex flex-col gap-8 divide-y divide-gray-300">
		<InfoSection>
			<FormHeader slot="header" title="Basic details" subtitle={`Form ID: ${id}`}>
				<div class="flex gap-2 items-center">
					<Button disabled={loading || approved} on:click={() => approve(false)} secondary>
						Decline
					</Button>
					<Button disabled={loading || approved} on:click={() => approve(true)}>Approve</Button>
				</div>
			</FormHeader>

			{#if approved}
				<div class="py-4">
					<div>Canisters have been deployed</div>
					<Button href={`/collection/${canId.minterCanId}@${canId.assetCanId}`}>
						View collection
					</Button>
				</div>
			{/if}

			<ItemInfo title="Collection name" value={formData.metadata?.[0]?.name} />
			<ItemInfo title="Description" value={formData.metadata?.[0]?.description} />
			<ItemInfo
				title="Price"
				value={`${fromE8s(formData.metadata?.[0]?.price)} ICP (${formData.metadata?.[0]?.price || 0})`}
			/>
			<ItemInfo title="Supply cap" value={formData.metadata?.[0]?.supply_cap} />
			<ItemInfo title="Submitted by" value={formData.collection_owner.toString()} />
			<ItemInfo title="Images">
				<div
					class="h-[14rem] border rounded p-2 items-center w-full overflow-hidden overflow-x-auto flex gap-2"
				>
					{#if formData.metadata?.[0]?.documents}
						{@const images = formData.metadata?.[0]?.documents}
						{#each images as [_, src], i}
							<div class="p-1 shrink-0 border rounded-md w-52 h-52 relative">
								<img {src} class="h-full w-full rounded-md object-contain" alt={i + ' image'} />
							</div>
						{:else}
							<div class="flex flex-1 items-center justify-center">No images added</div>
						{/each}
					{/if}
				</div>
			</ItemInfo>
		</InfoSection>

		{#if !approved}
			<InfoSection>
				<FormHeader slot="header" title="Collection info" />
				<ItemInfo title="Weight" value={formData.metadata?.[0]?.weight[0]} />
				<ItemInfo title="Drive Type" value={formData.metadata?.[0]?.drive_type[0]} />
				<ItemInfo title="Displays" value={formData.metadata?.[0]?.displays[0]} />
				<ItemInfo title="Seating" value={formData.metadata?.[0]?.seating[0]} />
				<ItemInfo title="Cargo" value={formData.metadata?.[0]?.cargo[0]} />
				<ItemInfo title="Overall height" value={formData.metadata?.[0]?.overall_height[0]} />
				<ItemInfo title="Overall width" value={formData.metadata?.[0]?.overall_width[0]} />
				<ItemInfo title="Track front" value={formData.metadata?.[0]?.track_front[0]} />
				<ItemInfo title="Track rear" value={formData.metadata?.[0]?.track_rear[0]} />
				<ItemInfo title="Ground clearance" value={formData.metadata?.[0]?.ground_clearance[0]} />
				<ItemInfo
					title="Key features"
					value={formData.metadata?.[0]?.key_features?.join(', ') || ''}
				/>
				<ItemInfo title="Range per charge" value={formData.metadata?.[0]?.range_per_charge[0]} />
				<ItemInfo title="Acceleration" value={formData.metadata?.[0]?.acceleration[0]} />
				<ItemInfo title="Charging Speed" value={formData.metadata?.[0]?.charging_speed[0]} />
				<ItemInfo title="Wheels" value={formData.metadata?.[0]?.wheels[0]} />
				<ItemInfo title="Purchase Price" value={formData.metadata?.[0]?.purchase_price[0]} />
				<ItemInfo title="Brochure URL" value={formData.metadata?.[0]?.brochure_url[0]} />
				<ItemInfo title="Battery" value={formData.metadata?.[0]?.battery[0]} />
				<ItemInfo title="Overall Length" value={formData.metadata?.[0]?.overall_length[0]} />
			</InfoSection>
			<InfoSection>
				<FormHeader slot="header" title="Documents" />
				{#if formData.metadata?.[0]?.documents?.[0]?.length}
					<Attachments docs={formData.metadata?.[0]?.documents} />
				{:else}
					<ItemInfo title="Attachments" value="No documents uploaded" />
				{/if}
			</InfoSection>
		{/if}
	</div>
{/if}
