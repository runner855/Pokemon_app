import React, { useEffect, useState } from 'react';
import { getEvolutionChain } from '../../hooks/getEvolutionChain';
import { useParams } from "react-router-dom";
import "./PokemonEvolution.css";

export const PokemonEvolution = () => {
    const [pokemonEvolution, setPokemonEvolution] = useState<any>(null);
    const params = useParams();

    useEffect(() => {
        const fetchPokemonEvolution = async () => {
            try {
                const evolutionData = await getEvolutionChain(Number(params.id));
                setPokemonEvolution(evolutionData);
            } catch (error) {
                console.error("Error fetching Pokemon:", error);
            }
        };
    
        fetchPokemonEvolution();
    }, [params.id]);
   
    return (
        <>
            <div className='evolution_main_container'>

                <div className='evolution_count'>{`${pokemonEvolution && pokemonEvolution.EvolutionImages.length} Evolutions Available!`}</div>
            <div className='evolution_images_container'>

            {pokemonEvolution && pokemonEvolution.EvolutionImages.map((item: any, index:number) => {
                return (
                    <img className="evolution_img" src={item.image} alt="ev_img" key={index} />
                )

            })}
            </div>
        </div>
        </>
    )
}
 
