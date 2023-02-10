import type { RequestHandler } from './$types'
import { error } from '@sveltejs/kit'
import { POKEMON_TCG_API_KEY } from '$env/static/private'

const pokemonRealtimeDatabaseUrl = 'https://pokedex-pedro-default-rtdb.firebaseio.com/pokemon/'

const objectMap = (obj: { [s: string]: unknown } | ArrayLike<unknown>, fn: (arg0: unknown, arg1: string, arg2: number) => any) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )

export const GET = (async ({ params, fetch }) => {

    try {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${params.id}`
        const res = await fetch(pokemonUrl)
        const data = await res.json()
        // console.log(data['name'])
        const cardsUrl = `https://api.pokemontcg.io/v2/cards/?q=name:${data['name']}`
        const response = await fetch(cardsUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': POKEMON_TCG_API_KEY
            }
        })
        const cardsData = await response.json()

        const pokedexPedroPokemonsRes = await fetch(`${pokemonRealtimeDatabaseUrl}${params.id}.json`)
        const pokedexPedroData = await pokedexPedroPokemonsRes?.json()
        
        if (pokedexPedroData) data['real_image_url'] = pokedexPedroData['real_image_url']

        data['cards'] = cardsData['data'] as Array<object>
        if (data['cards'].length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cardWithEvolvesFrom = data['cards'].find((card: any) => 'evolvesFrom' in card === true)
            if (cardWithEvolvesFrom !== undefined) data['evolvesFrom'] = cardWithEvolvesFrom['evolvesFrom']
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cardWithEvolvesTo = data['cards'].find((card: any) => 'evolvesTo' in card === true)
            if (cardWithEvolvesTo !== undefined) data['evolvesTo'] = cardWithEvolvesTo['evolvesTo']
        }
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (err) {
        console.error(err)
        throw error(500, 'Erro ao chamar detalhes do Pokemon')
    }

}) satisfies RequestHandler;