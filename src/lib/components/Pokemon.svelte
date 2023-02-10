<script lang="ts">
	import { fade } from 'svelte/transition';
	import { loading } from '$lib/stores/loading'

	export let pokemon: any;
</script>

<a
	class="list-none p-6 bg-gray-500 text-white text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
	href={`/pokemon/${pokemon.id}`} on:click={() => $loading = true}
	transition:fade
>
	{#if pokemon['real_image']}
		<img class="h-40 w-40 " src={pokemon['real_image']} alt={pokemon.name} />
	{:else}
		<img class="h-40 w-40 " src={pokemon.image} alt={pokemon.name} />
	{/if}
	<h2 class="uppercase text-xl">{pokemon.id}. {pokemon.name}</h2>
</a>
