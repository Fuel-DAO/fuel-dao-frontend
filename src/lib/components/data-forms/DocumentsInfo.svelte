<script lang="ts">
	import { assetManager } from '$lib/backend';
	import type { CollectionMetadata } from '$lib/types/nftCanister';
	import Icon from '../icon/Icon.svelte';
	import DocumentIcon from '../icons/DocumentIcon.svelte';
	import PlusIcon from '../icons/PlusIcon.svelte';

	export let loading = false;
	export let assetCanisterId: string;
	export let uploadCanisterId: string;
	export let documents: CollectionMetadata['documents'] = [];

	let uploadingProgress = 0;
	let error = false;
	let editIdx = -1;
	let editTitleEl: HTMLInputElement;

	async function onSelect(files: FileList | null) {
		error = false;
		if (!files) return (loading = false);
		loading = true;
		uploadingProgress = 0;
		const file = files[0];
		uploadFile(file);
	}

	async function uploadFile(file: File) {
		try {
			const manager = assetManager(uploadCanisterId);
			const res = await manager.store(file, {
				onProgress: (progress) => {
					uploadingProgress = Math.ceil((progress.current / progress.total) * 100);
				}
			});

			documents.push(['', res]);
			documents = [...documents];
		} catch (e) {
			console.error(e);
			error = true;
		} finally {
			loading = false;
		}
	}

	function removeDoc(path: string) {
		const idx = documents.findIndex(([_name, _path]) => _path === path);
		if (idx === -1) return;
		documents.splice(idx, 1);
		documents = [...documents];
	}

	function updateTitle(idx: number) {
		const name = editTitleEl.value;
		documents[idx][0] = name;
		documents = [...documents];
		editIdx = -1;
	}

	function viewDoc(path: string) {
		const url = `https://${assetCanisterId}.icp0.io${path}`;
		const a = document.createElement('a');
		a.href = url;
		a.target = '_blank';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
</script>

<div class="flex flex-col -mt-8 gap-2">
	<span class="text-sm font-medium leading-6 text-gray-900">Documents:</span>
	<div
		class="h-[14rem] border rounded p-2 items-center w-full overflow-hidden overflow-x-auto flex gap-2"
	>
		{#each documents as [name, path], i}
			<div
				class:opacity-50={loading}
				class="p-1 shrink-0 border rounded-md w-64 h-52 relative transition-opacity"
			>
				<button
					disabled={loading}
					on:click={() => removeDoc(path)}
					class="bg-gray-200 z-[2] rounded-full flex items-center justify-center w-6 h-6 absolute top-2 right-2"
				>
					<PlusIcon class="h-4 w-4 rotate-45" />
				</button>
				<button
					disabled={loading}
					on:click={() => viewDoc(path)}
					class="bg-gray-200 z-[2] rounded-full flex items-center justify-center w-6 h-6 absolute top-2 left-2"
				>
					<Icon name="eye" class="h-4 w-4" />
				</button>
				<div
					class="h-full w-full relative flex items-center justify-center bg-gradient-to-t from-gray-100 to-white"
				>
					<DocumentIcon class="h-6 w-6" />
					<div
						class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-gray-300 to-transparent p-2"
					>
						<form
							on:submit={(e) => {
								e.preventDefault();
								updateTitle(i);
							}}
							class="flex items-center justify-between bg-white border py-1 px-2 rounded w-full {editIdx ===
							i
								? 'border-green-600'
								: 'border-gray-300'}"
						>
							{#if editIdx === i}
								<input
									bind:this={editTitleEl}
									type="text"
									value={name}
									class="appearance-none text-xs p-0 outline-none w-full border-0 focus:ring-0"
								/>
							{:else}
								<p class="text-xs text-gray-900">
									{name || path.split('\\')?.pop()?.split('/').pop() || ''}
								</p>
							{/if}
							<button
								type="submit"
								on:click={(e) => {
									e.preventDefault();
									if (editIdx === -1) {
										editIdx = i;
									} else if (editIdx === i) {
										updateTitle(i);
									}
								}}
							>
								<div class="flex items-center justify-center bg-gray-200 rounded-full p-1">
									<Icon class="h-4 w-4" name={editIdx === i ? 'tick' : 'pencil'} />
								</div>
							</button>
						</form>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex flex-1 items-center justify-center">No documents uploaded yet</div>
		{/each}
	</div>
	<div class="mt-4 flex flex-col gap-2">
		<label class="w-min transition-opacity {loading ? 'pointer-events-none opacity-50' : ''}">
			<div
				class="bg-primary shadow-md rounded-full flex items-center gap-2 font-semibold py-2 px-6 hover:bg-green-600 active:bg-green-500 transition-colors cursor-pointer text-nowrap text-sm text-white"
			>
				{#if loading}
					<PlusIcon class="h-4 w-4 animate-spin" />
				{/if}
				<div>
					{loading ? `Uploading... (${uploadingProgress}%)` : 'Upload document'}
				</div>
			</div>

			<input
				disabled={loading}
				on:change={(e) => {
					onSelect(e.currentTarget.files);
					e.currentTarget.value = '';
				}}
				type="file"
				accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf"
				class="sr-only"
			/>
		</label>
	</div>
</div>
