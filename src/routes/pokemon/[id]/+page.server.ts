import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {

    const fetchPokemon = async (id: string) => {
        const res = await fetch(`/api/pokemon/${id}`)
        const data = await res.json()
        return data
    }

    return {
        pokemon: fetchPokemon(params.id)
    }

}) satisfies PageServerLoad;
