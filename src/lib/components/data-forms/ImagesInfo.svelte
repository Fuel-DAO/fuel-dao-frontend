<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import Input from '$lib/components/input/Input.svelte';

	export let images: string[] = [];

	let value = '';

	function addDoc() {
		if (value) {
			images.push(value);
			images = images;
			value = '';
		}
	}

	function removeDoc(idx: number) {
		images.splice(idx, 1);
		images = [...images];
	}
</script>

<div class="flex flex-col -mt-8">
	<div
		class="h-[14rem] border rounded p-2 items-center w-full overflow-hidden overflow-x-auto flex gap-2"
	>
		{#each images as src, i}
			<div class="p-1 shrink-0 border rounded-md w-52 h-52 relative">
				<button
					on:click={() => removeDoc(i)}
					class="bg-white rounded-full flex items-center justify-center w-4 h-4 absolute top-2 right-2"
				>
					<PlusIcon class="h-3 w-3 rotate-45" />
				</button>
				<img {src} class="h-full w-full rounded-md object-contain" alt={i + ' image'} />
			</div>
		{:else}
			<div class="flex flex-1 items-center justify-center">No images added yet</div>
		{/each}
	</div>
	<form on:submit|preventDefault={addDoc} class="mt-8 flex flex-col gap-2">
		<Input bind:value label="Add an image URL" placeholder="https://example.com/image.jpg" />
		<Button submit>Add image</Button>
	</form>
</div>
