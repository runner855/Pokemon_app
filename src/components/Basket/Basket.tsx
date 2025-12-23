import React, { useState } from "react";
import { CartItem, FavoriteItem } from "../../type/appTypes";
import "./Basket.css";
import { BasketCard } from "../BasketCard/BasketCard";
import {  BasketSummary } from "../BasketSummary/BasketSummary";

interface ShoppingBasketProps {
  shoppingCartValue: number;
  setShoppingCartValue: (value: number) => void;
  favorites: FavoriteItem[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;


}
export const Basket: React.FC<ShoppingBasketProps> = ({
  shoppingCartValue,
  setShoppingCartValue,
  cart, setCart
}) => {
  const [exit, setExit] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

  const handleExitClick = () => {
    setExit(!exit);
  };

  const handleIncreaseQuantity = () => {
    setShoppingCartValue(shoppingCartValue + 1);
  };

  const handleDecreasedQuantity = () => {
    setShoppingCartValue(shoppingCartValue - 1);
  };

  const handleRemoveItem = () => {
    setDeleteItem(!deleteItem);
    setShoppingCartValue(0);
  };


  return (

    <>
      {cart?.length > 0 &&
        <div className='cart_main_container'>
            {cart.map((item: CartItem, index: number) => {
              return (
              <div className="basket_card" key={index}>
                  <BasketCard cart={item}  />
              </div>
            )
            })}
          <div className="basket_summary">
            <BasketSummary/>
          </div>
        </div>}
    </>

  );
};
