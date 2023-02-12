import type { RequestHandler } from '../pokemon/$types';

const pokemonRealtimeDatabaseUrl = 'https://pokedex-pedro-default-rtdb.firebaseio.com/pokemon.json'

const pokemonId = (url: string) => {
    const arr = url.split('/')
    return arr.at(-2) || '0'
}

const objectMap = (obj: { [s: string]: unknown } | ArrayLike<unknown>, fn: (arg0: unknown, arg1: string, arg2: number) => any) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )

export const GET: RequestHandler = async () => {
// export const GET: RequestHandler = async ({ url }) => {
//     const page = Number(url.searchParams.get('page') ?? '0')
//     const offset = page * 1300
    const offset = 0;
    const pokeapiUrl = `https://pokeapi.co/api/v2/pokemon?limit=1008&offset=${offset}`
    const res = await fetch(pokeapiUrl)
    const data = await res.json()

    const pokedexPedroPokemonsRes = await fetch(pokemonRealtimeDatabaseUrl)
    const pokedexPedroData = await pokedexPedroPokemonsRes?.json()

    // console.log(pokedexPedroData)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const podekexPedroObject = objectMap(pokedexPedroData, (poke: any) => ({ real_image_url: poke['real_image_url'], real_image_prop_url: poke['real_image_prop_url'] }))
    
    const realImageUrl = objectMap(pokedexPedroData, (poke: any) => poke['real_image_url'])
    const realImagePropUrl = objectMap(pokedexPedroData, (poke: any) => poke['real_image_prop_url'])
    
    console.log(realImageUrl)
    console.log(realImagePropUrl)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadedPokemon = data.results.map((data: any) => ({
        id: pokemonId(data.url),
        name: data.name,
        url: data.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId(data.url)}.png`,
        // real_image: podekexPedroObject[pokemonId(data.url)]
        real_image: realImageUrl[pokemonId(data.url)],
        real_image_prop: realImagePropUrl[pokemonId(data.url)]
    }));

    return new Response(JSON.stringify(loadedPokemon), { status: 200 });
};