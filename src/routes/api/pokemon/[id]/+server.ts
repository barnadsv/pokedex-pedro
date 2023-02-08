import type { RequestHandler } from './$types'
import { error } from '@sveltejs/kit'
import { POKEMON_TCG_API_KEY } from '$env/static/private'

export const GET = (async ({ params }) => {

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
        // console.log(cardsData)
        data['cards'] = cardsData['data']
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (err) {
        console.error(err)
        throw error(500, 'Erro ao chamar detalhes do Pokemon')
    }

}) satisfies RequestHandler;