import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {

    const fetchPokemons = async () => {
        const res = await fetch('/api/pokemons')
        const data = await res.json()
        return data
    }

    return {
        pokemons: fetchPokemons()
    }

}) satisfies PageServerLoad;