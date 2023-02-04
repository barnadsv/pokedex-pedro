<script lang="ts">
	import type { PageData } from './$types';
	import { pokemonDetails } from '$lib/stores/pokemon';

	export let data: PageData;
	const { pokemon } = data;

	pokemonDetails[pokemon.id] = pokemon;

	const type = pokemon.types[0].type.name;
</script>

<svelte:head>
	<title>Pokedex - {pokemon.name}</title>
</svelte:head>

<div class="flex flex-col items-center">
	<h1 class="text-4xl text-center my-8 uppercase">{pokemon.name}</h1>
	<p>
		Type: <strong>{type}</strong> | Height: <strong>{pokemon.height}</strong>
		| Weight: <strong>{pokemon.weight}</strong>
	</p>
	<img class="card-image" src={pokemon.sprites['front_default']} alt={pokemon.name} />
</div>
