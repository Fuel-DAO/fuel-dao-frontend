<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
</script>

<div class="flex flex-col items-center justify-center gap-4">
	<Button href="/admin/new-collection">Submit a new collection</Button>
	<div class="text-sm text-gray-400">or</div>
	<Button secondary href="/admin/manage/list">Manage submitted collections</Button>
</div>
