<script lang="ts">
	import '../app.css';
	import { loading } from '$lib/stores/loading'
	import Loader from '$lib/components/Loader.svelte'
	import Nav from '$lib/components/Nav.svelte';

	let size = '100'
	let unit = 'px'
</script>

<div class="p-8 max-w-6xl mx-auto">
	<Nav />
	<slot />
	{#if $loading}
		<div class="fixed left-0 top-0 w-full h-full z-50 flex justify-center items-center bg-neutral-900/70">
			<Loader
			{size}
			{unit}
			ballTopLeft="#FF3E00"
			ballTopRight="#F8B334"
			ballBottomLeft="#40B3FF"
			ballBottomRight="#676778"
		/>
		</div>
	{/if}
</div>
