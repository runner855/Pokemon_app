import React from 'react';
import { CartItem } from '../../type/appTypes';
import "./BasketCard.css";
import { PokemonDetails } from '../PokemonDetails/PokemonDetails';

interface BasketProps {
    cart:CartItem
}



export const BasketCard = ({ cart }: BasketProps) => {
  if (!cart.quantity || cart.quantity < 1) return null;

  return (
    <div className="basket_item">
      <div className="cart_image_container">
        <img src={cart.image} alt={cart.name} />
      </div>

      <div className="cart_details">
        <div className="cart_name">{cart.name}</div>
        <div className="color_info">Color: {cart.color.toUpperCase()}</div>
        <div className="quantity">Quantity: {cart.quantity}</div>

        <div className="buttons_quantity">
          <button className="plus">+</button>
          <div className="cart_quantity">{cart.quantity}</div>
          <button className="minus">-</button>
        </div>
      </div>
    </div>
  );
};

 
