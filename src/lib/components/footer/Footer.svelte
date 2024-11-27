<script lang="ts">
	import logoWhite from '$lib/assets/logo-white.svg';
	import Button from '../button/Button.svelte';

	let email = '';
	let submitted = false;

	async function submitEmail() {
		submitted = true;
		await fetch('https://subscribefueldao-5nps3y6y6a-uc.a.run.app', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email
			})
		});
	}
</script>

<footer
	class="flex flex-col items-start lg:px-16 lg:py-32 px-8 py-16 bg-zinc-800 text-white gap-16"
>
	<img src={logoWhite} alt="FuelDAO" class="h-12" />
	<div
		class="items-center w-full flex flex-col lg:flex-row border border-white lg:border-l-0 lg:border-r-0"
	>
		<div
			class="lg:w-1/3 w-full flex justify-center items-start flex-col border-b lg:border-r self-stretch p-8 border-white"
		>
			<a href="mailto:info@fueldao.io">info@fueldao.io</a>
		</div>
		<div
			class="lg:w-1/3 w-full flex justify-center items-start self-stretch p-8 flex-col lg:border-r border-white"
		>
			<div>Mumbai, India</div>
		</div>
		<div class="lg:w-1/3 lg:flex hidden justify-center items-start self-stretch p-8 flex-col"></div>
	</div>

	<form on:submit|preventDefault={submitEmail} class="flex flex-col lg:gap-4 gap-2">
		<div class="text-xl lg:text-5xl font-thin">Stay informed, join our newsletter</div>
		{#if submitted}
			<div class="lg:text-xl font-thin pt-2">Thank you for joining the newsletter!</div>
		{:else}
			<div class="lg:text-xl font-thin pt-2">Enter your email here</div>
			<div class="flex items-center gap-2 lg:gap-4">
				<input
					required
					type="email"
					bind:value={email}
					placeholder="yourname@email.com"
					class="lg:text-2xl text-lg border border-r-0 border-t-0 border-white/50 focus:border-white transition-colors lg:p-2 p-1 border-l-0 bg-transparent focus:outline-none placeholder:text-white/30"
				/>
				<Button submit secondary class="lg:text-lg lg:py-3 lg:px-8 py-2 px-6">Submit</Button>
			</div>
		{/if}
	</form>
</footer>
