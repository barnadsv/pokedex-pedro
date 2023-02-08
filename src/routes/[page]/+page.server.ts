import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {

    console.log(params.page)
    const fetchPokemons = async (page: string) => {
        const res = await fetch(`/api/pokemons/${page}`)
        const data = await res.json()
        // console.log(data)
        return data
    }

    return {
        pokemons: fetchPokemons(params.page)
    }

}) satisfies PageServerLoad;