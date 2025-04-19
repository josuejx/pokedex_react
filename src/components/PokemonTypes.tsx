import PokemonType from "../types/pokemon_type";

export default function PokemonTypes({ types }: { types: PokemonType[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {types.map((t) => (
        <div className="bg-white rounded-lg p-1 text-sm border border-gray-300 shadow-md">
          { t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1) }
        </div>
      ))}
    </div>
  );
}
