<script lang="ts">
	// import { goto } from '$app/navigation'
	import { fade } from 'svelte/transition';
	export let pokemon: any;

	// const onClick = async() => {
	// 	goto(`/pokemon/${pokemon.id}`)
	// }
</script>

<!-- <a
	class="list-none p-6 bg-gray-100 text-gray-800 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
	href={`/pokemon/${pokemon.id}`} on:click={onClick}
	transition:fade
> -->
<a
	class="list-none p-6 bg-gray-100 text-gray-800 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
	href={`/pokemon/${pokemon.id}`}
	transition:fade
>
	<img class="h-40 w-40 " src={pokemon.image} alt={pokemon.name} />
	<h2 class="uppercase text-2xl">{pokemon.id}. {pokemon.name}</h2>
</a>
