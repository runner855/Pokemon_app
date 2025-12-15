import React, { useState } from "react";
import { MdClear } from "react-icons/md";
import { SideBarRight } from "../SideBarRight/SideBarRight";
import { RiDeleteBinFill } from "react-icons/ri";
import { FavoriteItem, PokemonDetailsObject } from "../../type/appTypes";
import { useNavigate } from "react-router";
import "./Basket.css";

interface ShoppingBasketProps {
  shoppingCartValue: number;
  setShoppingCartValue: (value: number) => void;
  favorites: FavoriteItem[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
}
export const Basket: React.FC<ShoppingBasketProps> = ({
  shoppingCartValue,
  setShoppingCartValue,
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
      <div className="basket_title">Basket</div>
    </>
  );
};
