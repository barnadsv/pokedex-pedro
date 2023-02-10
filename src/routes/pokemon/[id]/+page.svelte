<script lang="ts">
	import type { PageData } from './$types'
	import { pokemonDetails } from '$lib/stores/pokemon'
	import { loading } from '$lib/stores/loading'
	import CardList from '$lib/components/Cards.svelte'
	import Card from '$lib/components/CardProxy.svelte'

	export let data: PageData;

	$: ({ pokemon } = data)
	$: console.log('pokemon', pokemon)
	
	let type: any
	$: if (pokemon) {
			if (!pokemon.message) {
				console.log(pokemon)
				pokemonDetails[pokemon.id] = pokemon;
				type = pokemon.types[0].type.name;
			}
			$loading = false
		}

</script>

<svelte:head>
	<title>Pokedex - {pokemon.name}</title>
</svelte:head>

<div class="flex flex-col items-center">
	{#if pokemon.message}
		<p>{pokemon.message}</p>
	{:else}
		<h1 class="text-4xl text-center my-8 uppercase">{pokemon.name}</h1>
		<!-- <img class="card-image" src={pokemon.sprites['front_default']} alt={pokemon.name} /> -->

		{#if pokemon['real_image_url']}
			<img class="h-28 w-28 " src={pokemon['real_image_url']} alt={pokemon.name} />
		{:else}
			<img class="h-28 w-28 " src={pokemon.sprites['front_default']} alt={pokemon.name} />
		{/if}

		<p class="my-4">
			Type: <strong>{type}</strong> | Height: <strong>{pokemon.height}</strong>
			| Weight: <strong>{pokemon.weight}</strong>
		</p>

		<!-- <div class="py-4 grid gap-4 md:grid-cols-4 grid-cols-1">
			{#each pokemon.cards as card}
				<img class="card-image" src={card.images.small} alt={card.name} />
			{/each}
		</div> -->
		<!-- <h1 class="text-3xl text-center my-4">Evolução</h1> -->

		<h1 class="text-3xl text-center my-4">Cards</h1>
		<CardList>
			{#each pokemon.cards as card, id}
				<Card
					id={card.id}
					name={card.name}
					img={card.images.large}
					number={card.number}
					types={card.types}
					supertype={card.supertype}
					subtypes={card.subtypes}
					rarity={card.rarity}
				/>
			{/each}
		</CardList>
		<!-- <p>{JSON.stringify(pokemon, null, 2)}</p> -->
	{/if}
</div>

<style lang="postcss">
	.card-image {
		max-width: 200px;
	}
</style>
