import React, { useState } from 'react';
import { MdClear } from "react-icons/md";
import { SideBarRight } from '../SideBarRight/SideBarRight';
import { RiDeleteBinFill } from "react-icons/ri";
import { PokemonDetailsObject } from '../../type/appTypes';
import { useNavigate } from "react-router";
import "./Basket.css"

interface ShoppingBasketProps {
    PokemonDetails: PokemonDetailsObject | null;
    shoppingCartValue: number;
    setShoppingCartValue: (value: number) => void;
}
export const Basket: React.FC<ShoppingBasketProps> = ({ PokemonDetails, shoppingCartValue, setShoppingCartValue }) => {
    const [exit, setExit] = useState(false);
    const [deleteItem, setDeleteItem] = useState(false);

    const handleExitClick = () => {
        setExit(!exit);
    }

    const handleIncreaseQuantity = () => {
        setShoppingCartValue(shoppingCartValue + 1)

    }

    const handleDecreasedQuantity = () => {
        setShoppingCartValue(shoppingCartValue - 1)


    }

    const handleRemoveItem = () => {
        setDeleteItem(!deleteItem);
        setShoppingCartValue(0);

    }

console.log(PokemonDetails)
    return (
        <>
            
            <div className='basket_title'>Basket</div>
            
        </>
    );
}
