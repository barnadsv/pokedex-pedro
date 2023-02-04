import type { RequestHandler } from './$types'
import { error } from '@sveltejs/kit'

export const GET = (async ({ params }) => {

    try {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${params.id}`
        console.log('pokemonUrl', pokemonUrl)
        const res = await fetch(pokemonUrl)
        const data = await res.json()
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (err) {
        console.error(err)
        throw error(500, 'Erro ao chamar detalhes do Pokemon')
    }

}) satisfies RequestHandler;