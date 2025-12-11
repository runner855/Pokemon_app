import React, { useState } from 'react';
import { MdClear } from "react-icons/md";
import { SideBarRight } from '../SideBarRight/SideBarRight';
import { RiDeleteBinFill } from "react-icons/ri";
import { FavoriteItem, PokemonDetailsObject } from '../../type/appTypes';
import "./ShoppingBasket.css"

interface ShoppingBasketProps {
    PokemonDetails: PokemonDetailsObject | null;
    shoppingCartValue: number;
    setShoppingCartValue: React.Dispatch<React.SetStateAction<number>>;
       favorites: FavoriteItem[];
   setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>,
      cart: string[];
        setCart: React.Dispatch<React.SetStateAction<never[]>>,
}
export const ShoppingBasket: React.FC<ShoppingBasketProps> = ({ PokemonDetails, shoppingCartValue, setShoppingCartValue, cart, setCart, favorites, setFavorites }) => {
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

    return (
        <>
            {exit ? <SideBarRight PokemonDetails={PokemonDetails} cart={cart} setCart={setCart} favorites={favorites} setFavorites={setFavorites} shoppingCartValue={0}
                setShoppingCartValue={setShoppingCartValue} /> :
                <div className='basket_container'>
                    {shoppingCartValue > 0 && PokemonDetails && deleteItem === false ?
                        <div className='basket_card'>
                            <div className='basket_header'>
                                <h4 className='basket_title'>Your Purchase Summary</h4>
                                <MdClear onClick={handleExitClick} />
                            </div>
                            <img src={PokemonDetails.images.One} alt="product_img" />
                            <div className='order_details'>
                                <div className='order_details_product_name'>{PokemonDetails.name}</div>
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

                            </div>
                            <div className='basket_quantity'>
                                <div className='quantity_title'>Quantity</div>
                                <button onClick={handleIncreaseQuantity}>+</button>
                                <div className='quantity_value'>{shoppingCartValue}</div>
                                <button onClick={handleDecreasedQuantity}>-</button>
                                <div className='trash'><RiDeleteBinFill onClick={handleRemoveItem} /></div>

                            </div>

                        </div> :
                        <div>
<MdClear onClick={handleExitClick} />
                            <h1 className='no_items'>No Items in the Basket!!</h1>
                        </div>
                    }
                </div>}
        </>
    );
}
