import type Pokemon from "../types/pokemon"
import PokemonType from "../types/pokemon_type"

export default class PokemonService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async fetchAllPokemon(url = 'https://pokeapi.co/api/v2/pokemon'): Promise<any> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let pokemon: any = []

        const response = (await fetch(url, {
            method: 'GET'
        }).catch((error) => console.error(error))) as Response

        if (response.ok) {
            pokemon = await response.json()
        }

        return pokemon
    }

    static async fetchPokemonData(id_name: string): Promise<Pokemon> {
        let pokemon: Pokemon = {} as Pokemon

        const response = (await fetch(`https://pokeapi.co/api/v2/pokemon/${id_name}/`, {
            method: 'GET'
        }).catch((error) => console.error(error))) as Response

        if (response.ok) {
            pokemon = await response.json()
        }

        return pokemon
    }

    static async fetchTypes(types: PokemonType[]): Promise<PokemonType[]> {
        const typePromises = types.map(async (type) => {
            const response = await fetch(type.type.url)
            if (response.ok) {
                return response.json()
            }
            return null
        })

        const typeData = await Promise.all(typePromises)
        return types.map((value, index) => {
            return {
                ...value,
                type: {
                    ...value.type,
                    id: typeData[index].id,
                }
            }
        })
    }
}