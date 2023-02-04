import { writable } from 'svelte/store'

export const pokemonStore = writable([])
export const pokemonDetails: any = {}
//let loaded = false

// export const fetchPokemon = async (page: number) => {
// 	//if (loaded) return
// 	const offset = page * 100
// 	const url = `https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`
// 	const res = await fetch(url)
// 	const data = await res.json()
// 	const loadedPokemon = data.results.map((data: any, index: number) => ({
// 		name: data.name,
// 		id: offset + index + 1,
// 		image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1
// 			}.png`
// 	}));
// 	pokemonStore.set(loadedPokemon)
// 	//loaded = true
// }

// export const getPokemonById = async (id: number) => {
// 	// if (pokemonDetails[id]) return pokemonDetails[id]

// 	try {
// 		const url = `https://pokeapi.co/api/v2/pokemon/${id}`
// 		const res = await fetch(url)
// 		const data = await res.json()
// 		pokemonDetails[id] = data
// 		return data
// 	} catch (err) {
// 		console.error(err)
// 		return null
// 	}
// }