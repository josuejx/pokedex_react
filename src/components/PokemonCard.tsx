import { useEffect, useState } from "react";
import Pokemon from "../types/pokemon";
import PokemonService from "../services/pokemon.services";
import { FastAverageColor } from "fast-average-color";
import Utils from "../utils";

export default function PokemonCard({
  pokemonId, selectPokemon
}: {
    pokemonId: { name: string; url: string };
    selectPokemon: (pokemon: Pokemon) => void;
}) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchPokemonData = async () => {
      const data = await PokemonService.fetchPokemonData(pokemonId.name);
      setPokemon(data);
      setLoading(false);
    };

    fetchPokemonData();
  }, [pokemonId.name]);

  useEffect(() => {
    if (pokemon) {
      getAverageColor();
    }
  }); // Se ejecuta cuando 'pokemon' cambia

  function getAverageColor() {
    const fac = new FastAverageColor();
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = pokemon?.sprites.front_default || "";
    fac.getColorAsync(img).then((color) => {
      if (color) {
        document.getElementById(
          "card_" + pokemonId.name
        )!.style.backgroundColor = color.hex;
        pokemon!.color = color.hex;
      }
    });
  }

  if (loading) {
    return <div className="bg-white rounded-2xl p-4 animate-pulse">
      <div className="flex justify-center items-center mt-2 bg-white rounded-2xl size-40">
      </div>
    </div>;
  }

  return (
    <div id={"card_" + pokemonId.name} className="p-4 rounded-2xl cursor-pointer hover:scale-110 transition" onClick={() => selectPokemon(pokemon!)}>
      <div className="flex justify-between text-2xl">
        <p className="white-text-shadow">
          {Utils.capitalizeFirstLetter(pokemon?.name)}
        </p>
        <p className="white-text-shadow">#{Utils.transform3Digits(pokemon?.order)}</p>
      </div>
      <div className="flex justify-center items-center mt-2 bg-white rounded-2xl">
        <img
          src={pokemon?.sprites.front_default}
          alt={pokemon?.name}
          className="w-40 h-40"
        />
      </div>
    </div>
  );
}
