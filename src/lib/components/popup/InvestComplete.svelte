<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import PlusIcon from '../icons/PlusIcon.svelte';
	import Button from '../button/Button.svelte';

	export let show = false;
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
		<div class="text-3xl">Invest</div>

		<div class="flex flex-col gap-8 items-center">
			<div>The sale has not started yet</div>
			<Button on:click={() => (show = false)}>Close</Button>
		</div>
	</div>
</div>
