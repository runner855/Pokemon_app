import React from 'react';
import { CartItem } from '../../type/appTypes';
import { GoTrash } from "react-icons/go";
import "./BasketCard.css";

interface BasketProps {
    cart: CartItem
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>,
    setShoppingCartValue: (value: number) => void;
    shoppingCartValue: number;
}

export const BasketCard = ({ cart, setCart, setShoppingCartValue, shoppingCartValue }: BasketProps) => {
    
    if (!cart.quantity || cart.quantity < 1) return null;

    const handleCartIncrease = () => {
        setCart(prev => {
            const exists = prev.find(item => item.id === cart.id);

            if (exists) {
                return prev.map(item =>
                    item.id === cart.id
                        ? { ...item, quantity: item.quantity && item.quantity + 1 }
                        : item
                );
            }

            return [
                ...prev,
                {
                    id: cart.id,
                    name: cart.name,
                    image: cart.image,
                    color: cart.color,
                    isIntheCart: true,
                    quantity: 1,

                }
            ];
        });
    };

    const handleCartDecrease = () => {
        setCart(prev => {
            return prev
                .map(item =>
                    item.id === cart.id
                        ? { ...item, quantity: (item.quantity ?? 1) - 1 }
                        : item
                )
                .filter(item => item.quantity && item.quantity > 0);
        });
    };

    const handleCartdelete = () => {
        setCart(prev => prev.filter(item => item.id !== cart.id));
    };

    return (
        <div className="basket_item">
            <div className="cart_image_container">
                <img src={cart.image} alt={cart.name} />
            </div>

            <div className="cart_details">
                <div className="cart_name">{cart.name}</div>
                <br></br>
                <div className="color_info">
                    <strong>Color:</strong>
                    <span>{cart.color}</span>
                </div>
                <br></br>

                <div className="buttons_quantity">
                    <div className='trash_fav'>

                        <GoTrash onClick={handleCartdelete} />
                    </div>
                    <div className='buttons_container'>

                        <button className="plus" onClick={handleCartIncrease}>+</button>
                        <div className="cart_quantity">{cart.quantity}</div>
                        <button className="minus" onClick={handleCartDecrease}>-</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


