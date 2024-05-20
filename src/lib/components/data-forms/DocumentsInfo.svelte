<script lang="ts" context="module">
	type Documents = [string, string][];
	type DocumentsMap = {
		url: string;
		name: string;
	};
</script>

<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import DocumentUpload from './DocumentUpload.svelte';

	export let loading = false;
	export let documents: Documents[] | undefined = [];

	let documentsMap: DocumentsMap[] = [];

	$: mapDocuments(documents);

	function mapDocuments(documents?: Documents[]) {
		//@ts-ignore
		documentsMap = documents ? documents.map(([name, url]) => ({ name, url })) : [];
	}

	function addDoc() {
		documentsMap.push({
			url: '',
			name: ''
		});
		documentsMap = [...documentsMap];
	}

	function removeDoc(idx: number) {
		documentsMap.splice(idx, 1);
		documentsMap = [...documentsMap];
	}
</script>

<div class="flex flex-col -mt-8">
	{#each documentsMap as { name }, i}
		<DocumentUpload
			bind:loading
			{name}
			type="document"
			on:delete={() => removeDoc(i)}
			on:file={({ detail }) => console.log(detail)}
		/>
	{/each}
	<div class="mt-8">
		<Button on:click={addDoc}>Add new</Button>
	</div>
</div>
