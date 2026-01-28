import React, { useEffect, useState } from 'react';
import "./PokemonProductPage.css";
import { PokemonDetailsObject } from '../../type/appTypes';
import { SideBarLeft } from '../SideBarLeft/SideBarLeft';
import { SideBarRight } from '../SideBarRight/SideBarRight';
import { useParams } from "react-router-dom";
import { getPokemonDetails } from '../../hooks/getPokemonDetails';
import { useAppContext } from '../../context/AppContext';

export const PokemonProductPage = () => {
  const {
    cart,
    setCart,
    favorites,
    setFavorites,
    mainImage,
    setMainImage,
    pokemon
  } = useAppContext();

  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] =
    useState<PokemonDetailsObject | undefined>();

  useEffect(() => {
    if (!id) return;

    const fetchPokemonDetails = async () => {
      const data = await getPokemonDetails(Number(id));
      if (!data) return;

      setPokemonDetails(data);
      setMainImage(data.images.One);
    };

    fetchPokemonDetails();
  }, [id, setMainImage]);

  if (!pokemonDetails) {
    return <div>Loading Pokémon…</div>;
  }

  return (
    <div className='principal_container'>
      <div className='container_left'>
        <SideBarLeft
          PokemonDetails={pokemonDetails}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />
      </div>

      <div className='sidebar_right'>
        <SideBarRight
          PokemonDetails={pokemonDetails}
          cart={cart}
          setCart={setCart}
          favorites={favorites}
          setFavorites={setFavorites}
          mainImage={mainImage}
          setMainImage={setMainImage}
          pokemon={pokemon}
        />
      </div>
    </div>
  );
};
