import React, { useEffect, useState } from "react";
import pokemonApiCall from "../../api/pokemonApiCall";
import { PokemonFinalObject } from "../../type/appTypes";
import { useNavigate } from "react-router-dom";
import "./Search.css";

export const Search = () => {
  const [pokQuery, setPokQuery] = useState("");
  const [pokCard, setPokCard] = useState<PokemonFinalObject | undefined>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const IMAGE_NOTFOUND_PLACEHOLDER =
    "https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png";

  useEffect(() => {
    if (!pokQuery.trim()) {
      setPokCard(undefined);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await pokemonApiCall.get(
          `pokemon/${pokQuery.toLowerCase()}`
        );

        const normalizedPokemon: PokemonFinalObject = {
          id: res.data.id,
          name: res.data.name,
          mainImage:
            res.data.sprites.other["official-artwork"].front_default ||
            res.data.sprites.front_default ||
            "",
          price:res.data.price,
        };

        setPokCard(normalizedPokemon);
      } catch {
        setPokCard(undefined);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [pokQuery]);

  return (
    <>
      <form className="search" onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="TYPE TO SEARCH ..."
          type="search"
          value={pokQuery}
          onChange={(e) => setPokQuery(e.target.value)}
        />
      </form>

      {loading && <p className="loading">Searching...</p>}

      {pokCard && !loading && (
        <div
          className="results_card"
          onClick={() => navigate(`/pokemon/${pokCard.id}`)}
        >
          <div className="image_container">
            {/* <div className='image_container'>
                                       <div className='pokemon_card_fav_icon' onClick={handleFavIconClick}>{isFavorite ?<MdFavorite className='pokemon_card_fav_icon_clicked'/>:<MdFavoriteBorder/>}</div> */}
            <img
              className="results_pokemon_img"
              src={pokCard.mainImage || IMAGE_NOTFOUND_PLACEHOLDER}
              alt={pokCard.name}
              loading="lazy"
              onError={(e) =>
                (e.currentTarget.src = IMAGE_NOTFOUND_PLACEHOLDER)
              }
            />
          </div>
          <div className="title">
            {pokCard.name.toUpperCase()}
          </div>
        </div>
      )}
    </>
  );
};
