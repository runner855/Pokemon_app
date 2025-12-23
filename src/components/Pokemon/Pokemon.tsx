import React, { useEffect, useState } from 'react';
import "./Pokemon.css";
import { getPokemon } from '../../hooks/getPokemon';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { FavoriteItem, PokemonDetailsObject, PokemonFinalObject } from '../../type/appTypes';


interface PokemonProps {
    pokemon: PokemonFinalObject[] | undefined;
   favorites: FavoriteItem[];
       setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
}
export const Pokemon = ({ pokemon, favorites, setFavorites }: PokemonProps) => {
  
           
    return (
        <>          
                    <div className='pokemon_title'>Pokemon</div>
            {pokemon &&
                <div className='pokemon_container'>
                {pokemon.map((pok: PokemonFinalObject, index: number) => {
                    return (
                        <PokemonCard
                        key={index}
                            pok={pok}
                            favorites={favorites}
                            setFavorites={setFavorites}
                            
                        />
                    )
                })}
                </div>
            }
        </>
      );
}
 
