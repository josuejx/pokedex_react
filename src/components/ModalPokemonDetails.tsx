import Pokemon from "../types/pokemon";
import Utils from "../utils";
import BaseStats from "./BaseStats";
import PokemonTypes from "./PokemonTypes";

export default function ModalPokemonDetails({
  isOpen,
  onClose,
  pokemon,
}: {
  isOpen: boolean;
  onClose: () => void;
  pokemon: Pokemon;
}) {
  if (!isOpen) return null;

  if (!pokemon) {
    return <></>;
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="bg-white mx-10 min-h-1/2 rounded-2xl flex flex-col animate-zoom-in animate-duration-100">
        <div
          onClick={(e) => e.stopPropagation()}
          id={"card_" + pokemon.name}
          className="rounded-2xl p-4 flex flex-col"
          style={{ backgroundColor: pokemon.color }}
        >
          <button
            onClick={onClose}
            className="p-2 bg-white font-bold rounded-full size-7 flex items-center justify-center self-end cursor-pointer hover:scale-125 transition"
          >
            X
          </button>
          <div className="self-center flex justify-center items-center px-10">
            <img
              // src={pokemon?.sprites.front_default}
              src={"/src/assets/sprites/pokemon/"+ pokemon?.id + ".gif"}
              alt={pokemon?.name}
              className="size-fit"
            />
            <div className="flex flex-col justify-between p-6">
              <div>
                <p className="white-text-shadow text-lg font-bold">
                  #{Utils.transform3Digits(pokemon?.order)}
                </p>
                <p className="white-text-shadow text-3xl font-bold">
                  {Utils.capitalizeFirstLetter(pokemon?.name)}
                </p>
              </div>
              <PokemonTypes types={pokemon?.types} />
            </div>
          </div>
        </div>
        <div className="grow flex items-center justify-center px-10">
          <BaseStats stats={pokemon?.stats} />
        </div>
      </div>
    </div>
  );
}
