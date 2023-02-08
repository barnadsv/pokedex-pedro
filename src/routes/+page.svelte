<script lang="ts">
	import type { PageData } from './$types';
	import Pokemon from '$lib/components/Pokemon.svelte';
	import RightSvg from '$lib/components/RightSvg.svelte';
	import LeftSvg from '$lib/components/LeftSvg.svelte';
	import { pokemonStore } from '$lib/stores/pokemon';
	let searchTerm = '';
	let page = 0;
	let filteredPokemon: any[] = [];

	export let data: PageData;

	$: pokemonStore.set(data.pokemons);

	const incrementPage = async () => {
		page = page < 12 ? page + 1 : page;
		const pokemons = await fetch(`api/pokemons/${page}`)
		pokemonStore.set(await pokemons.json());
	};

	const decrementPage = async () => {
		page = page > 0 ? page - 1 : page;
		const pokemons = await fetch(`api/pokemons/${page}`)
		pokemonStore.set(await pokemons.json());
	};

	$: {
		if (searchTerm) {
			filteredPokemon = $pokemonStore.filter((pokemon: PokemonType) =>
				pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredPokemon = [...$pokemonStore];
		}
	}

	$: leftArrowColor = page === 0 ? 'lightgray' : 'black';
	$: rightArrowColor = page === 12 ? 'lightgray' : 'black';
</script>

<svelte:head>
	<title>Pokedex do Pedro</title>
</svelte:head>

<div class="w-full flex">
	<div
		class="cursor-pointer"
		class:disabled={page === 0}
		on:click={decrementPage}
		on:keydown={decrementPage}
	>
		<LeftSvg {leftArrowColor} />
	</div>
	<input
		class="w-full rounded-md text-lg p-4 border-2 border-gray-200 mx-4"
		bind:value={searchTerm}
		placeholder="Busca Pokemon"
	/>
	<div
		class="cursor-pointer"
		class:disabled={page === 12}
		on:click={incrementPage}
		on:keydown={incrementPage}
	>
		<RightSvg {rightArrowColor} />
	</div>
</div>

<div class="py-4 grid gap-4 md:grid-cols-4 grid-cols-1">
	{#each filteredPokemon as pokemon}
		<Pokemon {pokemon} />
	{/each}
</div>

<style lang="postcss">
	.disabled {
		cursor: not-allowed;
	}
</style>
