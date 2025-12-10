import React, { useEffect, useState } from 'react';
import "./Pokemon.css";
import { getPokemon } from '../../hooks/getPokemon';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { PokemonDetailsObject, PokemonFinalObject } from '../../type/appTypes';


export const Pokemon: React.FC<{ pokemon: PokemonFinalObject[] | undefined }> = ({ pokemon }) => {
  
           
    return (
        <>          
            {pokemon &&  <div className='main_container'>
                {pokemon.map((pok: PokemonFinalObject, index: number) => {
                    return (
                        <PokemonCard pok={pok} key={index} />
                    )
                })}
            </div>}
        </>
      );
}
 
