<script lang="ts">
	export let title = '';
	export let subtitle = '';
</script>

<div class="px-4 sm:px-0 flex justify-between">
	<div>
		<h3 class="text-base font-semibold leading-7 text-gray-900">{title}</h3>
		<p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{subtitle}</p>
	</div>
	<slot />
</div>
