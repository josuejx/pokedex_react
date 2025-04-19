import { useEffect, useState } from "react";
import PokemonService from "../services/pokemon.services";
import PokemonCard from "./PokemonCard";
import ModalPokemonDetails from "./ModalPokemonDetails";
import Pokemon from "../types/pokemon";

export default function PokemonGrid() {
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
  const [nextPage, setNextPage] = useState<string | undefined>("");
  const [previousPage, setPreviousPage] = useState<string | undefined>("");
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>(undefined);

  useEffect(() => {
    const fetchPokemons = async () => {
      const data = await PokemonService.fetchAllPokemon();

      setPokemons(data.results);
      setNextPage(data.next);
      setPreviousPage(data.previous);
    };

    fetchPokemons();
    setLoading(false);
  }, []);

  async function handleNextPage() {
    setLoading(true);
    const data = await PokemonService.fetchAllPokemon(nextPage);

    setPokemons(data.results);
    setNextPage(data.next);
    setPreviousPage(data.previous);
    setLoading(false);
  }

  async function handlePreviousPage() {
    setLoading(true);
    const data = await PokemonService.fetchAllPokemon(previousPage);

    setPokemons(data.results);
    setNextPage(data.next);
    setPreviousPage(data.previous);
    setLoading(false);
  }

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {pokemons.map((pokemon) => (
            <PokemonCard pokemonId={pokemon} selectPokemon={setSelectedPokemon} />
          ))}
        </div>
        <div className="flex justify-end items-center space-x-4 mt-4">
          <button
            onClick={handlePreviousPage}
            className="p-2 rounded bg-slate-500 text-white cursor-pointer hover:scale-110 hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={!previousPage}
          >
            Previous
          </button>

          <button
            onClick={handleNextPage}
            className="p-2 rounded bg-slate-500 text-white cursor-pointer hover:scale-110 hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={!nextPage}
          >
            Next
          </button>
        </div>

        <ModalPokemonDetails isOpen={selectedPokemon != undefined} onClose={() => { setSelectedPokemon(undefined); }} pokemon={selectedPokemon!} />
      </div>
    );
  }
}
