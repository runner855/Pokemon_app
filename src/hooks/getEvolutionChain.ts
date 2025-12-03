import { PokemonSpecies } from "../type/appTypes";

export async function getEvolutionChain(id: number): Promise<any> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${id}`
    );
    if (!response.ok) return null;

    const pokemon = await response.json();

    const speciesResponse = await fetch(pokemon.species.url);
    if (!speciesResponse.ok) return null;

    const species: PokemonSpecies = await speciesResponse.json();

    const evolutionChainresponse = await fetch(species.evolution_chain.url);

    console.log("chain", evolutionChainresponse);
    const height = pokemon.height;
    const weight = pokemon.weight;
    const experience = pokemon.base_experience;
    const happiness = species.base_happiness;
    const capture_rate = species.capture_rate;
    const color = species.color.name;
    const growth = species.growth_rate.name;
    const habitat = species.habitat.name;
    const types = pokemon.types.map((item: any) => {
      return item.type.name;
    });

    return {
      id: pokemon.id,
      name: pokemon.name,
      height,
      weight,
      happiness,
      experience,
      capture_rate,
      color,
      growth,
      habitat,
      types,
      images: {
        One: pokemon.sprites.other["official-artwork"].front_default,
        Two: pokemon.sprites.other["home"].front_default,
        Three: pokemon.sprites.other["dream_world"].front_default,
      },
    };
  } catch (error) {
    console.error("Error in getPokemonDetails:", error);
    return null;
  }
}
