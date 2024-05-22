<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import Button from '../button/Button.svelte';
	import PlusIcon from '../icons/PlusIcon.svelte';
	import CopyIcon from '../icons/CopyIcon.svelte';
	import Input from '../input/Input.svelte';
	import { onDestroy } from 'svelte';
	import { nftCanister } from '$lib/backend';
	import { authState } from '$lib/stores/auth';
	import { fromE8s } from '$lib/utils/icp';
	import CopyButton from '../button/CopyButton.svelte';
	import { Principal } from '@dfinity/principal';
	import type { CollectionMetadata } from '$lib/types/nftCanister';

	export let show = false;
	export let minterCanId: string;

	const TRANSFER_PRICE = 10_000n;

	let nftToBuy = 1;
	let paymentInfo = {
		loaded: false,
		transferTo: '',
		nftPrice: 0
	};

	let pollInterval: ReturnType<typeof setInterval>;
	let step: 1 | 2 | 3 = 1;
	let paymentStatus = 'pending';
	let metadata: CollectionMetadata;
	let tokenBalance = 0;

	$: currentInvestment =
		metadata?.price && tokenBalance ? (fromE8s(metadata.price) * tokenBalance).toFixed(4) : 0;

	async function checkPaymentStatus() {
		const actor = nftCanister(minterCanId);
    const res = await actor.book_tokens({ quantity: BigInt(nftToBuy) });
    if ('Ok' in res) {
      paymentStatus = 'completed';
    }
	}

	async function startPoll() {
		pollInterval = setInterval(() => checkPaymentStatus(), 10000);
	}

	async function getPaymentInfo() {
		const actor = nftCanister(minterCanId);
		const transferToAccount = await actor.get_escrow_account();
		metadata = await actor.get_metadata();
		const currentInvestment = await actor.get_booked_tokens([Principal.from($authState.idString)]);
		tokenBalance = Number(currentInvestment);

		paymentInfo = {
			loaded: true,
			transferTo: transferToAccount.accountId,
			nftPrice: Number(metadata.price)
		};
	}

	async function copy(text: string) {
		try {
			await navigator.clipboard.writeText(text);
		} catch (e) {
			console.error(e);
		}
	}

	$: step === 2 && getPaymentInfo();
	$: step === 3 && startPoll();
	$: (step !== 3 || paymentStatus === 'completed') && clearInterval(pollInterval);

	onDestroy(() => clearInterval(pollInterval));
</script>

<div
	transition:fade={{ duration: 100 }}
	class="fixed inset-0 flex items-center justify-center h-full w-full z-[100]"
>
	<div class="absolute inset-0 bg-black/50 z-[1]"></div>
	<div
		in:scale={{ start: 0.9, delay: 100, duration: 100 }}
		class="bg-white z-[2] max-w-2xl w-full px-16 py-12 flex flex-col items-center gap-12 relative shadow-xl rounded-lg"
	>
		<button on:click={() => (show = false)} class="absolute top-4 right-4 z-[2]">
			<PlusIcon class="h-5 w-5 rotate-45" />
		</button>
		<div class="text-3xl">{step === 3 ? 'Pay' : 'Invest'}</div>

		{#if !$authState.isLoggedIn}
			<div class="flex flex-col gap-8 items-center">
				<div>You need to login before you can invest</div>
				<Button href="/login">Click to login</Button>
			</div>
		{:else if step === 1}
			<div class="flex flex-col gap-8 items-center w-full">
				<div>Complete KYC to continue</div>
				<iframe title="KYC" class="w-full h-[28rem] rounded-xl" src={''} />
				<div class="text-xs text-black">
					Having issue with KYC? <button on:click={() => (step = 2)}>Click here.</button>
				</div>
			</div>
		{:else if step === 2}
			<form
				on:submit|preventDefault={() => (step = 3)}
				class="flex w-full flex-col items-center gap-12 relative"
			>
				{#if !paymentInfo.loaded}
					<div class="absolute inset-0 flex flex-col gap-4 items-center justify-center">
						<div>Fetching payment information</div>
						<PlusIcon class="h-4 w-4 animate-spin" />
					</div>
				{/if}
				<div
					class="w-full gap-8 flex flex-col transition-opacity {paymentInfo.loaded
						? 'opacity-100'
						: 'opacity-0'}"
				>
					<div class="flex w-full items-center justify-between text-sm gap-4">
						<div>NFT Price:</div>
						<div class="font-bold">{fromE8s(paymentInfo.nftPrice)} ICP</div>
					</div>
					<div class="flex w-full items-center justify-between text-sm gap-4">
						<div>Current investment:</div>
						<div class="font-bold">{currentInvestment} ICP</div>
					</div>
					<Input
						bind:value={nftToBuy}
						required
						min={1}
						label="Number of NFTs to buy"
						type="number"
						placeholder="(in USD)"
					/>
					<hr />
					<div class="flex w-full items-center justify-between text-sm gap-4">
						<div>Amount to pay:</div>
						<div class="font-bold">
							{nftToBuy * fromE8s(paymentInfo.nftPrice) + fromE8s(TRANSFER_PRICE)} ICP
						</div>
					</div>
				</div>
				<Button disabled={!paymentInfo.loaded} submit>Proceed to payment</Button>
			</form>
		{:else if step === 3}
			<div class="flex flex-col w-full items-center gap-4 text-sm">
				{#if paymentStatus === 'completed'}
					<div class="flex flex-col items-center justify-center gap-4 h-full w-full">
						<div class="flex w-full items-start justify-between text-sm gap-4">
							<div>Amount for NFT:</div>
							<div class="font-bold text-xs w-1/2 break-all text-right">
								{nftToBuy * fromE8s(paymentInfo.nftPrice) + fromE8s(TRANSFER_PRICE)} ICP
							</div>
						</div>
						<div
							class="bg-green-100 h-24 w-24 rounded-full text-xl flex items-center justify-center text-white"
						>
							✅
						</div>
						<div class="font-bold py-4 text-2xl">Transaction successful</div>
						<Button on:click={() => (show = false)}>Close</Button>
					</div>
				{:else}
					{@const amount = nftToBuy * fromE8s(paymentInfo.nftPrice) + fromE8s(TRANSFER_PRICE)}
					<div class="flex w-full items-start justify-between text-sm gap-4">
						<div>Amount to pay:</div>
						<div class="flex items-center gap-2 justify-end">
							<div class="font-bold whitespace-nowrap text-xs break-all text-right">
								<span class="select-all">{amount}</span> <span class="opacity-50">ICP</span>
							</div>
							<CopyButton on:click={() => copy(amount.toString())}>
								<CopyIcon class="w-3 h-3" />
							</CopyButton>
						</div>
					</div>
					<div class="flex w-full items-start justify-between text-sm gap-4">
						<div class="text-nowrap">Transferring to:</div>
						<div class="flex items-center gap-2 justify-end">
							<div class="font-bold text-xs break-all select-all text-right w-1/2">
								{paymentInfo.transferTo}
							</div>
							<CopyButton on:click={() => copy(paymentInfo.transferTo)}>
								<CopyIcon class="w-3 h-3" />
							</CopyButton>
						</div>
					</div>

					<hr />

					<PlusIcon class="h-4 w-4 animate-spin" />
					<div class="text-center text-sm">
						<span>Waiting for payment</span>
						<button on:click={checkPaymentStatus} class="underline text-xs font-bold">
							Check now
						</button>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
