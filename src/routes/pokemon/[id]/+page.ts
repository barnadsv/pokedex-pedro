import type { PageLoad } from './$types';
import { getPokemonById } from '$lib/stores/pokemon';

export const load = (async ({ params }) => {
    const pokemon = await getPokemonById(parseInt(params.id));
    return {
        pokemon
    }
}) satisfies PageLoad;