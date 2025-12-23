import React from 'react';
import { NavBarStructure } from '../../utilities/utility';
import { NavLink } from 'react-router-dom';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import "./NavBar.css";
import { CartItem } from '../../type/appTypes';

interface NavBarProps {
    cart: CartItem[];
    shoppingCartValue: number;
    
}

export const NavBar = ({ shoppingCartValue, cart }: NavBarProps) => {
    console.log(cart)
    return ( 
        <nav className='nav_container'>
            <ul className='nav'>
                {NavBarStructure.map((el, index) => {
                    return (
                        <li key={index}>
                            <NavLink to={el.to}>{el.link}</NavLink>
                            </li>                                
                    )
                })}
            </ul>
            <div className='nav_icons'>
                <FiSearch className='nav_icon' />
                
                <div className='cart_icon_wrapper'>
                    <FiShoppingBag className='nav_icon' />
                  {cart.length > 0 && (
    <span className='cart_badge'>{cart.reduce((total, item) => total + (item.quantity ? item.quantity : 0), 0)}</span>
)}
                </div>
            </div>
        </nav>
     );
}
 
