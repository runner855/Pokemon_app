import React, { useEffect, useState } from "react";
import pokemonApiCall from "../../api/pokemonApiCall";
import { useNavigate } from "react-router-dom";
import "./Search.css";

type PokemonListItem = {
  name: string;
  url: string;
};

export const Search = () => {
  const [pokQuery, setPokQuery] = useState("");
  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);
  const [results, setResults] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const IMAGE_NOTFOUND_PLACEHOLDER =
    "https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png";

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        const res = await pokemonApiCall.get("pokemon?limit=1350");
        setAllPokemon(res.data.results);
      } catch (error) {
        console.error("Failed to fetch Pokémon list");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    if (!pokQuery.trim()) {
      setResults([]);
      return;
    }

    const filtered = allPokemon.filter((pokemon) =>
      pokemon.name.startsWith(pokQuery.toLowerCase())
    );

    setResults(filtered.slice(0, 6));
  }, [pokQuery, allPokemon]);

  const getPokemonId = (url: string) => {
    return url.split("/").filter(Boolean).pop();
  };

  return (
    <>
      <form className="search" onSubmit={(e) => e.preventDefault()}>
        <input
          autoFocus
          type="search"
          placeholder="TYPE TO SEARCH ..."
          value={pokQuery}
          onChange={(e) => setPokQuery(e.target.value)}
        />
      </form>

      {loading && <p className="loading">Loading Pokémon...</p>}

      <div className="results_grid">
        {results.map((pokemon) => {
          const id = getPokemonId(pokemon.url);
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

          return (
            <div
              key={pokemon.name}
              className="results_card"
              onClick={() => navigate(`/pokemon/${id}`)}
            >
              <div className="image_container">
                <img
                  className="results_pokemon_img"
                  src={imageUrl}
                  alt={pokemon.name}
                  loading="lazy"
                  onError={(e) =>
                    (e.currentTarget.src = IMAGE_NOTFOUND_PLACEHOLDER)
                  }
                />
              </div>

              <div className="title">
                {pokemon.name.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
