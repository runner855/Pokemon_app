import { PokemonSpecies } from "../type/appTypes";

// Recursively extract species names from evolution chain
function extractEvolutionNames(chain: any, arr: string[] = []) {
  arr.push(chain.species.name);

  if (chain.evolves_to.length > 0) {
    chain.evolves_to.forEach((evo: any) => extractEvolutionNames(evo, arr));
  }

  return arr;
}

export async function getEvolutionChain(id: number): Promise<any> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) return null;

    const pokemon = await response.json();

    const speciesResponse = await fetch(pokemon.species.url);
    if (!speciesResponse.ok) return null;

    const species: PokemonSpecies = await speciesResponse.json();

    const evolutionResponse = await fetch(species.evolution_chain.url);
    if (!evolutionResponse.ok) return null;

    const evolution = await evolutionResponse.json();
    const evolutionNames = extractEvolutionNames(evolution.chain);

    const EvolutionImages = await Promise.all(
      evolutionNames.map(async (name) => {
        const evoRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!evoRes.ok) return { name, image: null };
        const evoData = await evoRes.json();

        return {
          name,
          image: evoData.sprites?.front_default ?? null,
        };
      })
    );

    return {
      id: evolution.id,
      name: evolution.chain.species.name,
      EvolutionImages,
    };
  } catch (error) {
    console.error("Error in getPokemonDetails:", error);
    return null;
  }
}
