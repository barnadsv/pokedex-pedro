import type { RequestHandler } from '../pokemon/$types';

const pokemonId = (url: string) => {
    const arr = url.split('/')
    return arr.at(-2)
}

export const GET: RequestHandler = async () => {
// export const GET: RequestHandler = async ({ url }) => {
//     const page = Number(url.searchParams.get('page') ?? '0')
//     const offset = page * 1300
    const offset = 0;
    const pokeapiUrl = `https://pokeapi.co/api/v2/pokemon?limit=1008&offset=${offset}`
    const res = await fetch(pokeapiUrl)
    const data = await res.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadedPokemon = data.results.map((data: any) => ({
        id: pokemonId(data.url),
        name: data.name,
        url: data.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId(data.url)}.png`
    }));
    return new Response(JSON.stringify(loadedPokemon), { status: 200 });
};