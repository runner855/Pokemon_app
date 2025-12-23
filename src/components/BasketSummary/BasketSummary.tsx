import React from 'react';
import "./BasketSummary.css";

export const BasketSummary = () => {
    return ( 
        <div className='summary_container'>
            <div className='summary_title'>Basket Summary</div>
            <div className='total_partial'>Total Partial: €200</div>
            <div className='shipping_fees'>Shipping Cost: Free</div>
             <div className='proceed_purchase_btn'>
                <button >Complete Purchase</button>
            </div>
        </div>
     );
}
 
