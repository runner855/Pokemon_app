import pokemonApiCall from "../api/pokemonApiCall";
import { normalizePokemon } from "../normalizer/PokemonNormalizer";

export const getPokemon = async (pageNumber: number) => {
  try {
    const limit = 25;
    const offset = (pageNumber - 1) * limit;

    const res = await pokemonApiCall.get(
      `pokemon?limit=${limit}&offset=${offset}`
    );

    const simplifiedPokemonData = await normalizePokemon(res.data);
    return simplifiedPokemonData;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};
