import React, { useEffect, useState } from 'react';
import { getEvolutionChain } from '../../hooks/getEvolutionChain';
import { useParams } from "react-router-dom";
import "./PokemonEvolution.css";
import { PokemonDetailsObject } from '../../type/appTypes';

interface PokemonEvolutionProps {
    mainImage: string;
    setMainImage: React.Dispatch<React.SetStateAction<string>>
    PokemonDetails: PokemonDetailsObject | null;   
}

export const PokemonEvolution = ({mainImage, setMainImage, PokemonDetails}:PokemonEvolutionProps) => {
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

                <div className='evolution_count'>{`${pokemonEvolution && pokemonEvolution.EvolutionImages.length} Evolutions Available`}</div>
            <div className='evolution_images_container'>

            {pokemonEvolution && pokemonEvolution.EvolutionImages.map((item: any, index:number) => {
                return (
                    <div key={index}>
                        <img className="evolution_img" src={item.image} alt="ev_img" key={index} onClick={() => setMainImage(`${item.image}`) } />
                    </div>
                )

            })}
            </div>
        </div>
        </>
    )
}
 
