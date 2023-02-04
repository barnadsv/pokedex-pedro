import type { RequestHandler } from './$types'
import { error } from '@sveltejs/kit'

export const GET = (async ({ params }) => {

    try {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${params.id}`
        const res = await fetch(pokemonUrl)
        const data = await res.json()
        console.log(data['name'])
        const cardsUrl = `https://api.pokemontcg.io/v2/cards/?q=name:${data['name']}`
        const response = await fetch(cardsUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': '0e9e0461-ba73-4c8b-b0c2-24c78f3ce055'
            }
        })
        const cards = await response.json()
        console.log(cards)
        data['cards'] = cards
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (err) {
        console.error(err)
        throw error(500, 'Erro ao chamar detalhes do Pokemon')
    }

}) satisfies RequestHandler;