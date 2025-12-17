import React from 'react';
import { PokemonDetailsObject } from '../../type/appTypes';
import "./SideBarLeft.css";
import { Pokemon } from '../Pokemon/Pokemon';
import { PokemonDetails } from '../PokemonDetails/PokemonDetails';

interface SideBarLeftProps {
    PokemonDetails: PokemonDetailsObject | null;
    mainImage: string;
    setMainImage: React.Dispatch<React.SetStateAction<string>>
    
    
}

export const SideBarLeft = ({ PokemonDetails, mainImage }: SideBarLeftProps) => {
    return (         
        <>
            {PokemonDetails &&
                <div className='images_container'>
                        <img className="img_one_top" src={mainImage || PokemonDetails.images.One} alt="img_one_top" />
                    <img className="img_two" src={PokemonDetails.images.Two} alt="img_two" />
                    <img className="img_three" src={PokemonDetails.images.Three} alt="img_three" />
                    <img className="img_four" src={PokemonDetails.images.Four} alt="img_four" />
                     <img className="img_five" src={PokemonDetails.images.Five} alt="img_five" />
                </div>
            }
        </>
     );
}
 
