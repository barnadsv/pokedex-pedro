<script lang="ts">
	import type { PageData } from './$types';
	import Pokemon from '$lib/components/Pokemon.svelte';
	// import RightSvg from '$lib/components/RightSvg.svelte';
	// import LeftSvg from '$lib/components/LeftSvg.svelte';
	import { pokemonStore } from '$lib/stores/pokemon';
	let searchTerm = '';
	// let page = 0;
	let filteredPokemon: any[] = [];

	export let data: PageData;

	$: pokemonStore.set(data.pokemons);

	// $: console.log($pokemonStore)

	// const incrementPage = async () => {
	// 	page = page < 12 ? page + 1 : page;
	// 	const pokemons = await fetch(`api/pokemons/${page}`)
	// 	pokemonStore.set(await pokemons.json());
	// };

	// const decrementPage = async () => {
	// 	page = page > 0 ? page - 1 : page;
	// 	const pokemons = await fetch(`api/pokemons/${page}`)
	// 	pokemonStore.set(await pokemons.json());
	// };

	$: {
		if (searchTerm) {
			filteredPokemon = $pokemonStore.filter((pokemon: PokemonType) =>
				pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredPokemon = [...$pokemonStore];
		}
	}

	// $: leftArrowColor = page === 0 ? 'lightgray' : 'black';
	// $: rightArrowColor = page === 12 ? 'lightgray' : 'black';
</script>

<svelte:head>
	<title>Pokedex do Pedro</title>
</svelte:head>

<div class="w-full flex mt-6">
	<!-- <div
		class="cursor-pointer"
		class:disabled={page === 0}
		on:click={decrementPage}
		on:keydown={decrementPage}
	>
		<LeftSvg {leftArrowColor} />
	</div> -->
	<div class="flex justify-center w-full mb-3">
		<div class="xl:w-96">
			<div class="input-group relative flex flex-row items-stretch w-full">
				<input type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Busca Pokémon" aria-label="Search" aria-describedby="button-addon2" bind:value={searchTerm}>
				<!-- <button class="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded rounded-tl-none rounded-bl-none shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
				</svg>
				</button> -->
			</div>
		</div>
	</div>
	<!-- <input
		class="w-full rounded-md text-lg p-4 border-2 border-gray-200 mx-4"
		bind:value={searchTerm}
		placeholder="Busca Pokemon"
	/> -->
	<!-- <div
		class="cursor-pointer"
		class:disabled={page === 12}
		on:click={incrementPage}
		on:keydown={incrementPage}
	>
		<RightSvg {rightArrowColor} />
	</div> -->
</div>

<div class="py-4 grid gap-4 md:grid-cols-4 grid-cols-1">
	{#each filteredPokemon as pokemon}
		<Pokemon {pokemon} />
	{/each}
</div>

<!-- <style lang="postcss">
	.disabled {
		cursor: not-allowed;
	}
</style> -->
