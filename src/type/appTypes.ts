export enum AppUrls {
  HOME = "/home",
  POKEMON = "/pokemon",
  POKEMON_DETAILS = "/pokemon/pokemon_details",
  POKEMON_FAVORITES = "/favorites",
}

export interface SearchBarProps {
  queryValue: string;
  setQueryValue: (queryValue: string) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface LinksObject {
  height: number;
  href: string;
  rel: string;
  render: string;
  size: number;
  width: number;
}

/* Pokemon */

export interface Pokemon {
  count: number;
  next: string;
  previous: null;
  results: PokemonResults[];
}

export interface PokemonResults {
  name: string;
  url: string;
}

export interface PokemonResultsData {
  abilities: PokemonAbilities[];
  base_experience: number;
  cries: PokemonCries;
  forms: PokemonSingleAbility[];
  game_indices: PokemonGameIndices[];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMoves[];
  name: string;
  order: number;
  past_abilities: PokemonPastAbilities[];
  past_types: [];
  species: PokemonSingleAbility;
  sprites: PokemonSprites;
  versions: PokemonSpritesVersions;
  stats: [];
  types: [];
  weight: number;
}

export interface PokemonAbilities {
  ability: PokemonSingleAbility;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSingleAbility {
  name: string;
  url: string;
}

export interface PokemonCries {
  latest: string;
  legacy: string;
}

export interface PokemonGameIndices {
  game_index: number;
  version: PokemonSingleAbility;
}

export interface PokemonMoves {
  move: PokemonSingleAbility;
  version_group_details: PokemonVersionGroupDetails[];
}

export interface PokemonVersionGroupDetails {
  level_learned_at: number;
  move_learn_method: PokemonSingleAbility;
  order: null;
  version_group: PokemonSingleAbility;
}

export interface PokemonPastAbilities {
  abilities: PokemonAbilities;
  generation: PokemonSingleAbility;
}

export interface PokemonSpritesOtherDreamWorld {
  front_default: string;
  front_female: null;
}

export interface PokemonSpritesOtherHome {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}
export interface PokemonSpritesOtherArtwork {
  front_default: string;
  front_shiny: string;
}

export interface PokemonSpritesOtherShowdown {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export interface PokemonSpritesOther {
  dream_world: PokemonSpritesOtherDreamWorld;
  home: PokemonSpritesOtherHome;
  official_artwork: PokemonSpritesOtherArtwork;
  showdown: PokemonSpritesOtherShowdown;
}

export interface PokemonGenerationOneRedBlue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface PokemonGenerationOneYellow {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface PokemonGenerationOne {
  red_blue: PokemonGenerationOneRedBlue;
  yellow: PokemonGenerationOneYellow;
}

export interface PokemonGenerationTwoCrystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface PokemonGenerationTwoGold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

export interface PokemonGenerationTwoSilver {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

export interface PokemonGenerationTwo {
  crystal: PokemonGenerationTwoCrystal;
  gold: PokemonGenerationTwoGold;
  silver: PokemonGenerationTwoSilver;
}

export interface PokemonGenerationThreeEmerald {
  front_default: string;
  front_shiny: string;
}

export interface PokemonGenerationThreeFireredLeafgreen {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface PokemonGenerationThreeRuby {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface PokemonGenerationThree {
  emerald: PokemonGenerationThreeEmerald;
  firered_leafgreen: PokemonGenerationThreeFireredLeafgreen;
  ruby_sapphire: PokemonGenerationThreeRuby;
}

export interface PokemonGenerationFourdiamondpearl {
  back_default: string;
  back_shiny: string;
  front_default: string;
}
export interface PokemonGenerationFourheartgoldsoulsilver {
  back_default: string;
  back_shiny: string;
  front_default: string;
}

export interface PokemonGenerationFourplatinum {
  back_default: string;
  back_shiny: string;
  front_default: string;
}

export interface PokemonGenerationFour {
  diamond_pearl: PokemonGenerationFourdiamondpearl;
  heartgold_soulsilver: PokemonGenerationFourheartgoldsoulsilver;
  platinum: PokemonGenerationFourplatinum;
}

export interface PokemonGenerationFiveblackwhiteanimated {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export interface PokemonGenerationFiveblackwhite {
  animated: PokemonGenerationFiveblackwhiteanimated;
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export interface PokemonGenerationFive {
  black_white: PokemonGenerationFiveblackwhite;
}

export interface PokemonGenerationSixomegarubyaplhasapphire {}

export interface PokemonGenerationSix {
  omegaruby_alphasapphire: PokemonGenerationSixomegarubyaplhasapphire;
  x_y: PokemonGenerationSixomegarubyaplhasapphire;
}
export interface PokemonGenerationSeven {}

export interface PokemonGenerationEight {}

export interface PokemonSpritesVersions {
  generation_one: PokemonGenerationOne;
  generation_two: PokemonGenerationTwo;
  generation_three: PokemonGenerationThree;
  generation_four: PokemonGenerationFour;
  generation_five: PokemonGenerationFive;
  generation_six: PokemonGenerationSix;
  generation_seven: PokemonGenerationSeven;
  generation_eight: PokemonGenerationEight;
}

export interface PokemonSprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other: PokemonSpritesOther;
  versions: PokemonSpritesVersions;
}

/*Pokemon final object */

export interface PokemonFinalObject {
  id: number;
  name: string;
  mainImage: string;
}

export interface PokemonDetailsImages {
  One: string;
  Two: string;
  Three: string;
  Four: string;
  Five: string;
}

export interface PokemonTypesObject {
  name: string;
  url: string;
}

export interface PokemonTypes {
  slot: number;
  type: PokemonTypesObject;
}

export interface PokemonDetailsObject {
  id: number;
  name: string;
  height: number;
  weight: number;
  happiness: number;
  experience: number;
  capture_rate: number;
  color: string;
  growth: string;
  habitat: string;
  types: PokemonTypes[];
  description: string;
  images: PokemonDetailsImages;
}

export interface PokemonSpeciesLanguage {
  name: string;
  url: string;
}

export interface PokemonFlavorTextEntry {
  flavor_text: string;
  language: PokemonSpeciesLanguage;
  version: PokemonSpeciesLanguage;
}

export interface PokemonSpeciesColor {
  name: string;
  url: string;
}

export interface PokemonSpeciesGrowth {
  name: string;
  url: string;
}

export interface PokemonSpeciesHabitat {
  name: string;
  url: string;
}

export interface ChainObjectEvolvesTo {
  species: PokemonSpeciesLanguage;
  evolution_details: [];
  evolves_to: [];
  is_baby: boolean;
  length: number;
}

export interface ChainObject {
  evolution_details: [];
  evolves_to: ChainObjectEvolvesTo[];
  is_baby: boolean;
  species: PokemonSpeciesLanguage;
}

export interface PokemonSpeciesEvolutionResponse {
  baby_trigger_item: null;
  chain: ChainObject;
  id: number;
}

export interface PokemonSpeciesEvolutionChain {
  url: string;
}

export interface PokemonSpecies {
  flavor_text_entries: PokemonFlavorTextEntry[];
  base_happiness: number;
  capture_rate: number;
  color: PokemonSpeciesColor;
  growth_rate: PokemonSpeciesGrowth;
  habitat: PokemonSpeciesHabitat;
  evolution_chain: PokemonSpeciesEvolutionChain;
}

export interface FavoriteItem {
  id: number;
  name: string;
  image: string;
  favorite: boolean;
}

export interface PokemonFavoritesProps {
  favorites: FavoriteItem[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
}

export interface CartItem {
  id: number;
  name: string;
  image: string;
  color: string;
  isIntheCart: boolean;
  quantity?: number;
}
