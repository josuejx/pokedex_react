import PokemonGrid from "./components/PokemonGrid";

export default function App() {
  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-center items-center mb-8">
        <img
          src="/src/assets/pokedex-logo.webp"
          alt="Pokemon Logo"
          width={280}
          height={180}
        />
      </div>
      <PokemonGrid />
    </div>
  );
}
