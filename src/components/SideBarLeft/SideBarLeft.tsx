import React from 'react';
import { PokemonDetailsObject } from '../../type/appTypes';
import "./SideBarLeft.css"

export const SideBarLeft = ({ PokemonDetails }: { PokemonDetails : PokemonDetailsObject | null }) => {
    return (         
        <>
            {PokemonDetails &&
                <div className='images_container'>
                    <img className="img_one_top" src={PokemonDetails.images.One} alt="img_one_top" />
                    <img className="img_two" src={PokemonDetails.images.Two} alt="img_two" />
                    <img className="img_three" src={PokemonDetails.images.Three} alt="img_three" />
                    <img className="img_four" src={PokemonDetails.images.One} alt="img_four" />
                     <img className="img_five" src={PokemonDetails.images.One} alt="img_five" />
                </div>
            }
        </>
     );
}
 
