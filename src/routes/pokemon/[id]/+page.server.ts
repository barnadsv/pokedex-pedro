import type { PageServerLoad } from './$types';
import { getPokemonById } from '$lib/stores/pokemon';

export const load = (async ({ params }) => {
    const pokemon = await getPokemonById(parseInt(params.id));
    return {
        pokemon
    }
}) satisfies PageServerLoad;