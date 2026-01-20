import axios from "axios";
import { Pokemon, PokemonResults, PokemonFinalObject } from "../type/appTypes";

export const normalizePokemon = async (
  PokemongenOne: Pokemon
): Promise<PokemonFinalObject[]> => {
  try {
    const normalizedData = await Promise.all(
      PokemongenOne.results.map(async (item: PokemonResults) => {
        try {
          const res = await axios.get(item.url);

          const mainImage =
            res.data.sprites.other["official-artwork"].front_default ||
            res.data.sprites.front_default ||
            "";

          return {
            id: res.data.id,
            name: res.data.name ?? "Untitled",
            mainImage,
          };
        } catch (error) {
          console.error("Error fetching Pokémon:", item.name, error);
          return null;
        }
      })
    );

    return normalizedData.filter(
      (pokemon): pokemon is PokemonFinalObject => pokemon !== null
    );
  } catch (error) {
    console.error("Error normalizing Pokémon data:", error);
    return [];
  }
};
