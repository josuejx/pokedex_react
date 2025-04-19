import PokemonType from "./pokemon_type"
import type Stat from "./stat"

export default interface Pokemon {
    order: number,
    name: string,
    height: number,
    weight: number,
    color: string,
    types: PokemonType[],
    stats: Stat[],
    sprites: {
        front_default: string
    },
    species: {
        name: string,
        url: string
    }
}