<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import Button from '../button/Button.svelte';
	import PlusIcon from '../icons/PlusIcon.svelte';
	import CopyIcon from '../icons/CopyIcon.svelte';
	import Input from '../input/Input.svelte';
	import { onDestroy } from 'svelte';
	import { nftCanister } from '$lib/backend';
	import { authState } from '$lib/stores/auth';
	import { Principal } from '@dfinity/principal';
	import { isPrincipal } from '$lib/utils/isPrincipal';
	import { fromE8s } from '$lib/utils/icp';
	import CopyButton from '../button/CopyButton.svelte';
	export let show = false;
	// export let showWarning = false;
	export let minterCanId: string;

	let nftToBuy = 1;
	let initLoading = true;
	let nnsAccountId = '';
	let initError = '';
	let paymentInfo = {
		transferTo: '',
		nftPrice: 0,
		currentInvestment: 0
	};

	let pollInterval: ReturnType<typeof setInterval>;
	let step: 1 | 2 | 3 | 4 = 1;
	let paymentStatus = 'pending';

	async function checkPaymentStatus() {
		const actor = nftCanister(minterCanId);
		const res = await (actor as any).primary_sale();
		console.log({ paymentRes: res });
		if ('Ok' in res) {
			paymentStatus = 'completed';
		}
	}

	async function startPoll() {
		const actor = nftCanister(minterCanId);
		const details = await (actor as any).get_payment_details();
		if ('Ok' in details) {
			paymentInfo = {
				transferTo: details.Ok[0],
				nftPrice: Number(details.Ok[1]),
				currentInvestment: Number(details.Ok[2])
			};
		}
		pollInterval = setInterval(() => checkPaymentStatus(), 5000);
	}

	async function saveNnsAccountId() {
		initLoading = true;
		initError = '';
		if (!nnsAccountId) return;
		try {
			if (!isPrincipal(nnsAccountId)) {
				initError =
					'Invalid principal. Please copy the correct principal from NNS Dapp settings page.';
				return false;
			}
			const actor = nftCanister(minterCanId);
			const res = await (actor as any).update_NNS_account(Principal.from(nnsAccountId));
			console.log({ update_NNS_account: res });
			if ('Ok' in res) {
				step = 3;
			} else {
				initLoading = false;
			}
		} catch {
			initError = 'Something went wrong, please try again!';
		} finally {
			initLoading = false;
		}
	}

	async function init() {
		try {
			const actor = await nftCanister(minterCanId);
			const res = await (actor as any).get_NNS_account();
			console.log({ get_NNS_account: res });
			if ('Ok' in res) {
				nnsAccountId = res.Ok.toString();
				step = 3;
			}
		} finally {
			initLoading = false;
		}
	}

	async function getPaymentInfo() {
		const actor = nftCanister(minterCanId);
		const details = await (actor as any).get_payment_details();
		console.log({ get_payment_details: details });
		if ('Ok' in details) {
			paymentInfo = {
				transferTo: details.Ok[0],
				nftPrice: Number(details.Ok[1]),
				currentInvestment: Number(details.Ok[2])
			};
		}
	}

	async function copy(text: string) {
		try {
			await navigator.clipboard.writeText(text);
		} catch (e) {
			console.error(e);
		}
	}

	$: step === 2 && init();
	$: step === 3 && getPaymentInfo();
	$: step === 4 && startPoll();
	$: (step !== 4 || paymentStatus === 'completed') && clearInterval(pollInterval);

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
		<div class="text-3xl">{step === 4 ? 'Pay' : 'Invest'}</div>

		{#if !$authState.isLoggedIn}
			<div class="flex flex-col gap-8 items-center">
				<div>You need to login before you can invest</div>
				<Button href="/login">Click to login</Button>
			</div>
		{:else if step === 1}
			<div class="flex flex-col gap-8 items-center w-full">
				<div>Complete KYC to continue</div>
				<iframe title="KYC" class="w-full h-[28rem] rounded-xl" src={''} />
				<div class="text-xs text-white">
					Having issue with KYC? <button on:click={() => (step = 2)}>Click here.</button>
				</div>
			</div>
		{:else if step === 2}
			<div>
				{#if initLoading}
					<PlusIcon class="h-5 w-5 animate-spin" />
				{:else}
					<form on:submit|preventDefault={saveNnsAccountId} class="flex flex-col gap-4">
						<div class="font-md font-medium">
							You need to link your NNS Dapp account to continue
						</div>

						<div class="flex flex-col gap-2">
							<Input
								bind:value={nnsAccountId}
								label="NNS Principal ID"
								required
								placeholder="Enter NNS principal ID"
							/>
							{#if initError}
								<div class="text-xs text-red-500">{initError}</div>
							{/if}
							<div class="text-sm">
								Note: Please make sure funds are always transferred from this account. You can visit <a
									class="underline"
									href="https://nns.ic0.app/settings/"
									target="_blank">this link</a
								> to get the ID.
							</div>
						</div>

						<Button submit>Link</Button>
					</form>
				{/if}
			</div>
		{:else if step === 3}
			<form
				on:submit|preventDefault={() => (step = 4)}
				class="flex w-full flex-col items-center gap-12"
			>
				<div class="w-full gap-8 flex flex-col">
					<div class="flex w-full items-center justify-between text-sm gap-4">
						<div>NFT Price:</div>
						<div class="font-bold">{fromE8s(paymentInfo.nftPrice)} ICP</div>
					</div>
					<div class="flex w-full items-center justify-between text-sm gap-4">
						<div>Current investment:</div>
						<div class="font-bold">{fromE8s(paymentInfo.currentInvestment)} ICP</div>
					</div>
					<Input
						bind:value={nftToBuy}
						required
						min={1}
						label="Number of NFTs to buy"
						type="number"
						placeholder="(in USD)"
					/>
					<div>
						<span class="text-sm font-medium leading-6 text-gray-900">Linked NNS Account ID:</span>
						<div>{nnsAccountId}</div>
					</div>
					<hr />
					<div class="flex w-full items-center justify-between text-sm gap-4">
						<div>Amount to pay:</div>
						<div class="font-bold">{nftToBuy * fromE8s(paymentInfo.nftPrice)} ICP</div>
					</div>
				</div>
				<Button submit>Proceed to payment</Button>
			</form>
		{:else if step === 4}
			<div class="flex flex-col w-full items-center gap-4 text-sm">
				{#if paymentStatus === 'completed'}
					<div class="flex flex-col items-center justify-center gap-4 h-full w-full">
						<div class="flex w-full items-start justify-between text-sm gap-4">
							<div>Amount for NFT:</div>
							<div class="font-bold text-xs w-1/2 break-all text-right">
								{nftToBuy * fromE8s(paymentInfo.nftPrice)} ICP
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
					{@const amount = nftToBuy * fromE8s(paymentInfo.nftPrice)}
					<div class="flex w-full items-start justify-between text-sm gap-4">
						<div>Amount to pay:</div>
						<div class="flex items-center gap-2">
							<div class="font-bold whitespace-nowrap text-xs w-1/2 break-all text-right">
								{amount} ICP
							</div>
							<CopyButton on:click={() => copy(amount.toString())}>
								<CopyIcon class="w-3 h-3" />
							</CopyButton>
						</div>
					</div>
					<div class="flex w-full items-start justify-between text-sm gap-4">
						<div>Transferring from account:</div>
						<div class="font-bold text-xs w-1/2 break-all text-right">
							{nnsAccountId}
						</div>
					</div>
					<hr />

					<div class="flex w-full items-start justify-between text-sm gap-4">
						<div>Transferring to:</div>
						<div class="flex items-center gap-2">
							<div class="font-bold text-xs w-1/2 break-all text-right">
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
