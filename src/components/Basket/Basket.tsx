import React from "react";
import "./Basket.css";
import { BasketCard } from "../BasketCard/BasketCard";
import { BasketSummary } from "../BasketSummary/BasketSummary";
import { useAppContext } from "../../context/AppContext";

export const Basket = () => {

  const {shoppingCartValue, setShoppingCartValue, cart, setCart, pokemon } = useAppContext();

  return (

    <>
   {cart.length > 0 && pokemon && (
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
)}
    </>

  );
};
