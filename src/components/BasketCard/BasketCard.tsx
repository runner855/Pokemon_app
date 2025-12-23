import React from 'react';
import { CartItem } from '../../type/appTypes';
import "./BasketCard.css";
import { PokemonDetails } from '../PokemonDetails/PokemonDetails';

interface BasketProps {
    cart:CartItem
}



export const BasketCard = ({ cart }: BasketProps) => {
    console.log(cart)
    return (
        <>
            {cart.quantity && cart.quantity >= 1 &&
                <div className='basket_card'>
                    <div className='cart_image_container'>
                    <img src={cart.image} alt="cart_img" />
                    </div>
                    <div className='cart_details'>
                    <div className='cart_name'>{cart.name}</div>
                        <div className='color_info'>{`Color: ${cart.color.toUpperCase()}`}</div>

                    <div className='quantity'>{`Quantity: ${cart.quantity}`}</div>
                    </div>
                </div>}
        </>
        
     );
}
 
