import { useEffect, useState } from "react";
import PokemonType from "../types/pokemon_type";
import PokemonService from "../services/pokemon.services";

export default function PokemonTypes({ types }: { types: PokemonType[] }) {
  const [loadedTypes, setLoadedTypes] = useState<PokemonType[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      if (types && types.length > 0) {
        const typesPromise = await PokemonService.fetchTypes(types);
        if (typesPromise) {
          setLoadedTypes(typesPromise);
        }
      }
    };

    fetchTypes();
  }, [types]);

  if (!types || types.length === 0) {
    return <div>No types available</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {loadedTypes.map((t) => (
        <div className="shadow-lg">
          {/* { t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1) } */}
          <img
            src={`/src/assets/sprites/types/${t.type.id}.png`}
            alt={t.type.name}
            className="w-24 object-cover inline-block rounded"
          />
        </div>
      ))}
    </div>
  );
}
