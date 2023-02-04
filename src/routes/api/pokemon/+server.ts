import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    const page = Number(url.searchParams.get('page') ?? '0')
    const offset = page * 100
    const pokeapiUrl = `https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`
    const res = await fetch(pokeapiUrl)
    const data = await res.json()
    const loadedPokemon = data.results.map((data: any, index: number) => ({
        name: data.name,
        id: offset + index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1
            }.png`
    }));
    return new Response(JSON.stringify(loadedPokemon), { status: 200 });
};