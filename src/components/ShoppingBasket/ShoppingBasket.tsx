import React, { useState } from 'react';
import { MdClear } from "react-icons/md";
import "./ShoppingBasket.css"
import { SideBarRight } from '../SideBarRight/SideBarRight';
import { PokemonDetails } from '../PokemonDetails/PokemonDetails';
import { PokemonDetailsObject } from '../../type/appTypes';

export const ShoppingBasket = ({ PokemonDetails }: { PokemonDetails: PokemonDetailsObject | null }) => {
    const [exit, setExit] = useState(false);

    const handleExitClick = () => {
        setExit(!exit);
    }
    return ( 
        <>
            {exit ? <SideBarRight PokemonDetails={PokemonDetails} /> : <div className='basket_container'>
                Shopping basket <MdClear onClick={handleExitClick} />
            </div>}
        </>
     );
}
 
