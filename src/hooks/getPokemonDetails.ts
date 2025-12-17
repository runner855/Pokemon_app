import { PokemonDetails } from "../components/PokemonDetails/PokemonDetails";
import {
  PokemonDetailsObject,
  PokemonSpecies,
  PokemonFlavorTextEntry,
} from "../type/appTypes";

export async function getPokemonDetails(
  id: number
): Promise<PokemonDetailsObject | null> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) return null;

    const pokemon = await response.json();

    const speciesResponse = await fetch(pokemon.species.url);
    if (!speciesResponse.ok) return null;

    const species: PokemonSpecies = await speciesResponse.json();

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

    const descriptionEntry = species.flavor_text_entries.find(
      (entry: PokemonFlavorTextEntry) => entry.language.name === "en"
    );

    const description = descriptionEntry
      ? descriptionEntry.flavor_text.replace(/\n|\f/g, " ")
      : "No description available.";

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
      description,
      images: {
        One: pokemon.sprites.other["official-artwork"].front_default,
        Two: pokemon.sprites.other["home"].front_default,
        Three: pokemon.sprites.other["dream_world"].front_default,
        Four: pokemon.sprites.front_default,
        Five: pokemon.sprites.front_shiny,
      },
    };
  } catch (error) {
    console.error("Error in getPokemonDetails:", error);
    return null;
  }
}
