import React, { useState } from 'react'
import { PokemonDetailsObject } from '../../type/appTypes';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { PokemonEvolution } from '../PokemonEvolution/PokemonEvolution';
import "./SideBarRight.css"
import { ShoppingBasket } from '../ShoppingBasket/ShoppingBasket';
export const SideBarRight = ({ PokemonDetails }: { PokemonDetails: PokemonDetailsObject | null }) => {
    const [shoppingCartValue, setShoppingCartValue] = useState<number>(0);
    const [favoriteClick, setFavoriteClick] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = () => {
        setShoppingCartValue(shoppingCartValue +1)
    }

    const handleFavoriteClick = () => {
        setFavoriteClick(!favoriteClick)
        console.log(favoriteClick)
    }

    const handleDialogOnClick = () => {
        setOpen(!open)
    }

    if (!PokemonDetails) return null;

    return (
        <>
            {open ? <ShoppingBasket PokemonDetails={PokemonDetails}/> :<div>
                <div className='name'>
                    {PokemonDetails.name}
                    <div onClick={handleFavoriteClick}>
                        {favoriteClick ? <MdFavorite /> : <MdFavoriteBorder />}
                    </div>
                    <FaShoppingBag onClick={handleDialogOnClick } />{shoppingCartValue > 0 ? shoppingCartValue : ""}
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
            </div>}
            </>
    );
};
