<script lang="ts" context="module">
	export type ImagesInfoData = ReturnType<typeof initImagesInfo>;

	export const initImagesInfo = (data?: CollectionMetadata) => ({
		images: data?.images || [],
		logo: data?.logo || ''
	});
</script>

<script lang="ts">
	import { assetPath, assetManager } from '$lib/backend';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import type { CollectionMetadata } from '$lib/types/nftCanister';

	export let data: ImagesInfoData = initImagesInfo();
	export let absoluteLogoPath = false;
	export let loading = false;
	export let uploadCanisterId = '';
	export let assetCanisterId = '';

	let uploading = false;
	let uploadingProgress = 0;
	let errorAsset = false;
	let errorLogo = false;

	$: disabled = uploading || loading;

	async function onSelect(files: FileList | null, type: 'logo' | 'images') {
		type === 'logo' ? (errorLogo = false) : (errorAsset = false);
		if (!files) return (uploading = false);
		uploading = true;
		uploadingProgress = 0;
		const file = files[0];
		uploadFile(file, type);
	}

	async function uploadFile(file: File, type: 'logo' | 'images') {
		try {
			const manager = assetManager(uploadCanisterId);
			const res = await manager.store(file, {
				onProgress: (progress) => {
					uploadingProgress = Math.ceil((progress.current / progress.total) * 100);
				}
			});
			if (type === 'images') {
				data.images.push(res);
				data.images = [...data.images];
			} else {
				data.logo = res;
			}
		} catch (e) {
			console.error(e);
			type === 'logo' ? (errorLogo = true) : (errorAsset = true);
		} finally {
			uploading = false;
		}
	}

	async function removeImage(path: string, type: 'logo' | 'images') {
		if (type === 'logo') {
			data.logo = '';
		} else {
			const idx = data.images.findIndex((img) => img === path);
			if (idx === -1) return;
			data.images.splice(idx, 1);
			data.images = [...data.images];
		}
		const manager = assetManager(uploadCanisterId);
		await manager.delete(path);
	}
</script>

<div class="flex flex-col -mt-8 gap-4">
	<span class="text-sm font-medium leading-6 text-gray-900">Thumbnail/Logo:</span>
	<div class="h-[14rem] w-[14rem] p-2 border rounded relative">
		{#if data.logo}
			<button
				{disabled}
				on:click={() => removeImage(data.logo, 'logo')}
				class="bg-white rounded-full flex items-center justify-center w-4 h-4 absolute top-2 right-2"
			>
				<PlusIcon class="h-3 w-3 rotate-45" />
			</button>
			<img
				src={absoluteLogoPath ? data.logo : assetPath(assetCanisterId, data.logo)}
				class="h-full w-full rounded-md object-contain"
				alt="logo"
			/>
		{:else}
			<div class="w-full h-full flex items-center justify-center text-sm">No logo uploaded</div>
		{/if}
	</div>
	<div class="mt-4 flex flex-col gap-2">
		<label class="w-min transition-opacity {uploading ? 'pointer-events-none opacity-50' : ''}">
			<div
				class="bg-primary shadow-md rounded-full flex items-center gap-2 font-semibold py-2 px-6 hover:bg-green-600 active:bg-green-500 transition-colors cursor-pointer text-nowrap text-sm text-white"
			>
				{#if uploading}
					<PlusIcon class="h-4 w-4 animate-spin" />
				{/if}
				<div>
					{uploading
						? `Uploading... (${uploadingProgress}%)`
						: data.logo
							? 'Change logo'
							: 'Upload logo'}
				</div>
			</div>

			<input
				{disabled}
				on:change={(e) => {
					onSelect(e.currentTarget.files, 'logo');
					e.currentTarget.value = '';
				}}
				type="file"
				accept="image/*"
				class="sr-only"
			/>
		</label>
	</div>
	<span class="text-sm font-medium leading-6 text-gray-900">Images:</span>
	<div
		class="h-[14rem] border rounded p-2 items-center w-full overflow-hidden overflow-x-auto flex gap-2"
	>
		{#each data.images as path, i}
			<div
				class:opacity-50={uploading}
				class="p-1 shrink-0 border rounded-md w-52 h-52 relative transition-opacity"
			>
				<button
					{disabled}
					on:click={() => removeImage(path, 'images')}
					class="bg-white rounded-full flex items-center justify-center w-4 h-4 absolute top-2 right-2"
				>
					<PlusIcon class="h-3 w-3 rotate-45" />
				</button>
				<img
					src={assetPath(assetCanisterId, path)}
					class="h-full w-full rounded-md object-contain"
					alt={i + ' image'}
				/>
			</div>
		{:else}
			<div class="flex flex-1 text-sm items-center justify-center">No images added yet</div>
		{/each}
	</div>
	<div class="mt-4 flex flex-col gap-2">
		<label class="w-min transition-opacity {uploading ? 'pointer-events-none opacity-50' : ''}">
			<div
				class="bg-primary shadow-md rounded-full flex items-center gap-2 font-semibold py-2 px-6 hover:bg-green-600 active:bg-green-500 transition-colors cursor-pointer text-nowrap text-sm text-white"
			>
				{#if uploading}
					<PlusIcon class="h-4 w-4 animate-spin" />
				{/if}
				<div>
					{uploading ? `Uploading... (${uploadingProgress}%)` : 'Upload image'}
				</div>
			</div>

			<input
				{disabled}
				on:change={(e) => {
					onSelect(e.currentTarget.files, 'images');
					e.currentTarget.value = '';
				}}
				type="file"
				accept="image/*"
				class="sr-only"
			/>
		</label>
	</div>
</div>
