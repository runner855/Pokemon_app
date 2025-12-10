import React, { useState } from 'react'
import { PokemonDetailsObject } from '../../type/appTypes';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { PokemonEvolution } from '../PokemonEvolution/PokemonEvolution';
import { useNavigate } from "react-router";
import "./SideBarRight.css"

import { Basket } from '../Basket/Basket';

interface SideBar {
    PokemonDetails: PokemonDetailsObject | null;
    cart: string[];
    setCart: React.Dispatch<React.SetStateAction<never[]>>,
    shoppingCartValue: number,
    setShoppingCartValue: React.Dispatch<React.SetStateAction<number>> 
}
export const SideBarRight = (
    {
        PokemonDetails,
        cart,
        setCart,
        shoppingCartValue,
        setShoppingCartValue
    }: SideBar) => {
    
    //  const [shoppingCartValue, setShoppingCartValue] = useState<number >(0);
    const [favoriteClick, setFavoriteClick] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleClick = () => {
        if (shoppingCartValue !== undefined) {
            setShoppingCartValue(shoppingCartValue + 1);
            setCart([])
        }
    }


    const handleFavoriteClick = () => {
        setFavoriteClick(!favoriteClick)
        console.log(favoriteClick)
    }

    const handleDialogOnClick = () => {
        setOpen(!open)
    }

    if (!PokemonDetails) return null;

    console.log(PokemonDetails, "here")

    return (
        <>

             <div className='name'>
                    {PokemonDetails.name}
                    <div onClick={handleFavoriteClick}>
                        {favoriteClick ? <MdFavorite /> : <MdFavoriteBorder />}
                    </div>
                    <FaShoppingBag onClick={() => navigate(`pokemon/${PokemonDetails.id}/basket`)} />{shoppingCartValue > 0 ? shoppingCartValue : ""}
                </div>
                <PokemonEvolution />
                <div className='height'>Height: {PokemonDetails.height}</div>
                <div className='weight'>Weight: {PokemonDetails.weight}</div>
                <div className='happiness'>Happiness: {PokemonDetails.happiness}</div>
                <div className='experience'>Experience: {PokemonDetails.experience}</div>
                <div className='capture_rate'>Capture Rate: {PokemonDetails.capture_rate}</div>
                <div className='color'>Color: {PokemonDetails.color?.toUpperCase()}</div>
                <div className='growth'>Growth Rate: {PokemonDetails.growth?.toUpperCase()}</div>
                <div className='habitat'>Habitat: {PokemonDetails.habitat?.toUpperCase()}</div>

                <div className='types'>
                    Types: {PokemonDetails.types.join(", ")}
                </div>

                <div className='description'>
                    Description: <p>{PokemonDetails.description}</p>
                </div>

                <div className='add_to_basket_btn'>
                    <button onClick={handleClick}>Add To Basket</button>
                </div>
            
            </>
    );
};
