import React, { useEffect, useState } from 'react';
import "./PokemonProductPage.css";
import { PokemonDetailsObject } from '../../type/appTypes';
import { useParams } from 'react-router-dom';
import { getPokemonDetails } from '../../hooks/getPokemonDetails';
import { SideBarLeft } from '../SideBarLeft/SideBarLeft';
import { SideBarRight } from '../SideBarRight/SideBarRight';

export const PokemonProductPage = () => {
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsObject | null>(null);
    const params = useParams();

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const pokemonData = await getPokemonDetails(Number(params.id));
                setPokemonDetails(pokemonData);
            } catch (error) {
                console.error("Error fetching Pokemon:", error);
            }
        };

        fetchPokemonDetails();
    }, [params.id]);
    return (
         <div className='principal_container'>
            <div className='container_left'>
                <SideBarLeft PokemonDetails={pokemonDetails} />
            </div>
            <div className='sidebar_right'>
                <SideBarRight PokemonDetails={pokemonDetails}/>
            </div>
        </div>
     );
}
 
