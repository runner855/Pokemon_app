import pokemonApiCall from "../api/pokemonApiCall";
import { normalizePokemon } from "../normalizer/PokemonNormalizer";

export const getPokemon = async () => {
  try {
    const res = await pokemonApiCall.get(`pokemon?offset=25&limit=25`);

    const PokemongenOne = res.data;

    const simplifiedPokemonData = normalizePokemon(PokemongenOne);

    return simplifiedPokemonData;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};
