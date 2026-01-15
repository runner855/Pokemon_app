import React, { useState } from "react";
import { CartItem, FavoriteItem } from "../../type/appTypes";
import "./Basket.css";
import { BasketCard } from "../BasketCard/BasketCard";
import { BasketSummary } from "../BasketSummary/BasketSummary";

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
        <div className="cart_main_container">
          <div className="cart_items">
            {cart.map((item, index) => (
              <BasketCard
                key={index}
                cart={item}
                setCart={setCart}
                setShoppingCartValue={setShoppingCartValue}
                shoppingCartValue={shoppingCartValue}
              />
            ))}
          </div>

          <div className="basket_summary">
            <BasketSummary cart={cart} />
          </div>
        </div>
      }
    </>

  );
};
