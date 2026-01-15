import React from 'react';
import "./BasketSummary.css";
import { CartItem } from '../../type/appTypes';

interface BasketSummaryProps {
    cart: CartItem[];

}

export const BasketSummary = ({ cart }: BasketSummaryProps) => {
    console.log("cart", cart)
    return (
        <div className='summary_container'>
            <div className='summary_title'>Basket Summary</div>
            {cart.length > 0 && (

                <div className='total'>Items Total: {cart.reduce((total, item) => total + (item.quantity ? item.quantity : 0), 0)}</div>
            )}
            <div className='border_one'></div>
            <div className='shipping_fees'>Shipping Cost: Free</div>
            <div className='border_two'></div>
            <div className='proceed_purchase_btn'>
                <button >Complete Purchase</button>
            </div>
        </div>
    );
}

