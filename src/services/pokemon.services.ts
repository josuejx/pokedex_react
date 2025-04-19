import type Pokemon from "../types/pokemon"

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
}