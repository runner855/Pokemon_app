import React, { useEffect, useState } from 'react';
import "./Pokemon.css";
import { getPokemon } from '../../hooks/getPokemon';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { PokemonFinalObject } from '../../type/appTypes';


export const Pokemon = () => {
    const [pokemon, setPokemon] = useState<PokemonFinalObject[]>();

   useEffect(() => {
    const fetchPokemon = async () => {
      try {
          const pokemonData = await getPokemon(); 
          setPokemon(pokemonData as PokemonFinalObject[] | undefined);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchPokemon();
   }, []); 
           
    return (
        <>          
            {pokemon && <div className='main_container'>
                {pokemon.map((pok: PokemonFinalObject, index: number) => {
                    return (
                        <PokemonCard pok={pok} key={index} />
                    )
                })}
            </div>}
        </>
      );
}
 
